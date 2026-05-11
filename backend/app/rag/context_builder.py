"""
Assembles the final context string fed into Claude's system prompt.
Keep this structured but concise — token budget matters.
"""


def build_context(graph_context: dict, similar_problems: list, sara_memory: dict) -> dict:
    return {
        "concept_block": _format_concepts(graph_context),
        "formula_block": _format_formulas(graph_context.get("formulas", [])),
        "problems_block": _format_problems(similar_problems),
        "sara_academic_block": _format_academic(sara_memory),
    }


def _format_concepts(graph_context: dict) -> str:
    concepts = graph_context.get("concepts", [])
    if not concepts:
        return ""

    lines = ["RELEVANT JEE CONCEPTS:"]
    for c in concepts[:4]:  # cap at 4 concepts
        lines.append(f"\n• {c['name']}")
        if c.get("description"):
            lines.append(f"  {c['description']}")
        if c.get("prerequisites"):
            lines.append(f"  Prerequisites: {', '.join(c['prerequisites'][:3])}")
        if c.get("confused_with"):
            lines.append(f"  Commonly confused with: {', '.join(c['confused_with'][:2])}")
        if c.get("sara_is_weak"):
            lines.append(f"  ⚠ Sara is currently weak on this concept.")
        if c.get("sara_is_strong"):
            lines.append(f"  ✓ Sara is strong on this concept.")
    return "\n".join(lines)


def _format_formulas(formulas: list) -> str:
    if not formulas:
        return ""
    lines = ["\nRELEVANT FORMULAS:"]
    for f in formulas[:5]:
        if f.get("plain"):
            lines.append(f"  • {f['plain']}")
    return "\n".join(lines)


def _format_problems(problems: list) -> str:
    if not problems:
        return ""
    lines = ["\nSIMILAR JEE PROBLEMS (for reference):"]
    for i, p in enumerate(problems[:2], 1):
        tag = "[PYQ] " if p.get("is_pyq") else ""
        lines.append(f"  {i}. {tag}{p['content'][:200]}...")
    return "\n".join(lines)


def _format_academic(memory: dict) -> str:
    academic = memory.get("academic", {})
    if not academic:
        return ""
    lines = ["\nSARA'S ACADEMIC CONTEXT ON THIS TOPIC:"]
    if academic.get("accuracy_on_cluster") is not None:
        acc = int(academic["accuracy_on_cluster"] * 100)
        lines.append(f"  • Current accuracy: {acc}%")
    if academic.get("times_asked_similar"):
        lines.append(f"  • She has asked similar doubts {academic['times_asked_similar']} times before")
    if academic.get("last_studied"):
        lines.append(f"  • Last studied this: {academic['last_studied']}")
    patterns = memory.get("mistake_patterns", [])
    if patterns:
        lines.append("  • Her recurring mistake patterns here:")
        for p in patterns[:2]:
            lines.append(f"    - {p['pattern']} (seen {p['frequency']} times)")
    return "\n".join(lines)
