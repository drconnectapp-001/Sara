"""
Core RAG pipeline. Runs on every message Sara sends.

Flow:
  extract_concepts → neo4j_traverse → wiki_vector_search
  → memory_retrieve → build_context → ollama_respond → memory_update

Uses local Ollama (llama3.2) for chat — no Anthropic API credits needed.
"""
import json
import httpx
import asyncio
from app.core.config import settings
from app.rag.graph_query import traverse_concept_neighborhood
from app.rag.vector_search import find_similar_chunks
from app.rag.context_builder import build_context
from app.memory.engine import retrieve_sara_memory, update_sara_memory
from app.companion.prompts import build_system_prompt

OLLAMA_URL   = "http://localhost:11434"
OLLAMA_MODEL = "llama3.2:3b-instruct-q4_K_M"

# Simple keyword → concept mapping for fast concept extraction (no LLM needed)
CONCEPT_KEYWORDS = {
    "kinematics":           ["velocity", "acceleration", "displacement", "projectile", "kinematics", "motion"],
    "laws-of-motion":       ["newton", "force", "friction", "momentum", "impulse", "inertia"],
    "work-energy-power":    ["work", "energy", "power", "kinetic", "potential", "conservative"],
    "rotational-dynamics":  ["torque", "angular", "moment of inertia", "rotation", "rolling"],
    "gravitation":          ["gravity", "gravitational", "orbit", "satellite", "escape velocity"],
    "simple-harmonic-motion": ["shm", "oscillation", "pendulum", "spring", "harmonic"],
    "waves":                ["wave", "frequency", "wavelength", "sound", "doppler"],
    "thermodynamics":       ["heat", "temperature", "entropy", "carnot", "thermodynamics"],
    "kinetic-theory":       ["kinetic theory", "gas", "pressure", "rms", "boltzmann"],
    "mechanical-properties": ["stress", "strain", "elastic", "young's modulus", "viscosity"],
    "atomic-structure":     ["atom", "electron", "orbital", "bohr", "quantum", "shell"],
    "chemical-bonding":     ["bond", "covalent", "ionic", "hybridization", "vsepr"],
    "mole-concept":         ["mole", "avogadro", "stoichiometry", "molarity", "molality"],
    "periodic-trends":      ["periodic", "electronegativity", "ionization energy", "atomic radius"],
    "chemical-equilibrium": ["equilibrium", "le chatelier", "kp", "kc"],
    "thermodynamics":       ["enthalpy", "entropy", "gibbs", "hess", "spontaneous"],
    "redox-reactions":      ["oxidation", "reduction", "redox", "oxidation state"],
    "organic-chemistry-basics": ["organic", "functional group", "alkane", "alkene", "isomer"],
    "hydrocarbons":         ["hydrocarbon", "alkane", "alkene", "alkyne", "benzene", "aromatic"],
    "acid-base-chemistry":  ["acid", "base", "ph", "buffer", "neutralization"],
    "trigonometric-functions": ["sin", "cos", "tan", "trigonometry", "identities"],
    "sequences-and-series": ["arithmetic", "geometric", "series", "progression", "sum"],
    "limits-and-derivatives": ["limit", "derivative", "differentiation", "calculus"],
}


def extract_concepts_from_message(message: str) -> list[str]:
    """Fast keyword-based concept extraction — no LLM needed."""
    msg_lower = message.lower()
    matched = []
    for concept_id, keywords in CONCEPT_KEYWORDS.items():
        if any(kw in msg_lower for kw in keywords):
            matched.append(concept_id)
    return matched[:5]  # cap at 5 concepts


async def stream_ollama(prompt: str, system: str):
    """Stream response from local Ollama."""
    async with httpx.AsyncClient(timeout=120) as client:
        async with client.stream("POST", f"{OLLAMA_URL}/api/generate", json={
            "model":  OLLAMA_MODEL,
            "prompt": prompt,
            "system": system,
            "stream": True,
            "options": {
                "temperature": 0.7,
                "num_predict": 1500,
            }
        }) as response:
            async for line in response.aiter_lines():
                if line.strip():
                    try:
                        data = json.loads(line)
                        token = data.get("response", "")
                        if token:
                            yield token
                        if data.get("done"):
                            break
                    except json.JSONDecodeError:
                        continue


async def run_pipeline(message: str, session_id: str):
    """
    Main RAG pipeline. Returns an async generator for streaming.
    """
    # Step 1 — extract JEE concepts via keyword matching (free, instant)
    concepts = extract_concepts_from_message(message)

    # Step 2 — walk the knowledge graph for this concept cluster
    graph_context = await traverse_concept_neighborhood(concepts)

    # Step 3 — vector search in wiki_chunks
    similar = await find_similar_chunks(message)

    # Step 4 — retrieve Sara's memory context
    sara_memory = await retrieve_sara_memory(concepts)

    # Step 5 — assemble context
    context = build_context(graph_context, similar, sara_memory)

    # Step 6 — stream Ollama response
    system = build_system_prompt(sara_memory, context)

    full_response = ""
    async for token in stream_ollama(message, system):
        full_response += token
        yield token

    # Step 7 — update Sara's memory
    await update_sara_memory(message, full_response, concepts)
