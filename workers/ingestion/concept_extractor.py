"""
Concept Extractor — uses Claude Haiku to extract structured knowledge
from each NCERT section.

Why Haiku: cheap, fast, good enough for structured extraction.
Sonnet is reserved for Sara's actual conversations.

Input:  Section text (~500-900 tokens)
Output: Structured JSON with concepts, formulas, relationships
"""

import json
import asyncio
from anthropic import AsyncAnthropic
from tenacity import retry, stop_after_attempt, wait_exponential

client = AsyncAnthropic()

EXTRACTION_PROMPT = """\
You are a JEE expert extracting structured knowledge from an NCERT textbook section.

CHAPTER: {chapter_name}
SUBJECT: {subject}
SECTION: {section_heading}

SECTION TEXT:
{section_text}

Extract ALL concepts, formulas, and relationships from this section.
Return ONLY valid JSON matching this exact schema — no explanation, no markdown:

{{
  "concepts": [
    {{
      "name": "exact concept name (3-6 words max)",
      "definition": "precise 1-2 sentence definition suitable for JEE",
      "key_facts": ["fact 1", "fact 2"],
      "difficulty": "easy|medium|hard",
      "jee_importance": "high|medium|low",
      "prerequisites": ["concept name that must be known first"],
      "confused_with": ["concept name students often confuse this with"]
    }}
  ],
  "formulas": [
    {{
      "name": "formula name",
      "plain_text": "formula in plain text e.g. F = ma",
      "latex": "LaTeX e.g. F = ma",
      "used_for": "what this formula calculates",
      "concept": "which concept this formula defines"
    }}
  ],
  "cross_subject_links": [
    {{
      "from_concept": "concept in this section",
      "to_concept": "concept in another subject/chapter",
      "to_subject": "Physics|Chemistry|Mathematics",
      "relationship": "REQUIRES|APPLIES_TO|BRIDGES_TO"
    }}
  ],
  "common_mistakes": [
    {{
      "concept": "concept name",
      "mistake": "description of the common mistake JEE students make",
      "pattern_tag": "short_snake_case_tag"
    }}
  ]
}}

Rules:
- Extract only what is explicitly in the text. Do not add extra knowledge.
- Concept names must be specific: "Projectile Motion" not "Motion"
- Formulas must have correct LaTeX. Use \\frac, \\sqrt, \\vec etc.
- If no formulas exist in this section, return empty array.
- prerequisites must be concept names that actually exist in JEE syllabus.
- If section is introductory with no extractable concepts, return all empty arrays.
"""


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
async def extract_section(
    section_text: str,
    section_heading: str,
    chapter_name: str,
    subject: str
) -> dict:
    """
    Extract structured knowledge from one NCERT section using Claude Haiku.
    Returns parsed dict. Retries up to 3 times on failure.
    """
    prompt = EXTRACTION_PROMPT.format(
        chapter_name=chapter_name,
        subject=subject,
        section_heading=section_heading,
        section_text=section_text[:3500]  # reduced to ensure output tokens available
    )

    response = await client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = response.content[0].text.strip()

    # Strip markdown code blocks if Haiku wraps response
    if raw.startswith("```"):
        raw = re.sub(r'^```[a-z]*\n?', '', raw)
        raw = re.sub(r'\n?```$', '', raw)

    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        # Try to extract and repair malformed JSON
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if match:
            extracted = match.group(0)
            # Remove incomplete trailing strings (handle unterminated quotes)
            # Find the last valid closing brace and keep only that
            brace_count = 0
            last_valid_pos = -1
            for i, char in enumerate(extracted):
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        last_valid_pos = i

            if last_valid_pos > 0:
                extracted = extracted[:last_valid_pos + 1]
                try:
                    return json.loads(extracted)
                except json.JSONDecodeError:
                    pass

        # Fallback: return empty structure
        return {"concepts": [], "formulas": [], "cross_subject_links": [], "common_mistakes": []}


EXAMPLE_EXTRACTION_PROMPT = """\
You are a JEE expert. Extract a practice problem from this NCERT example.

SUBJECT: {subject}
CHAPTER: {chapter_name}

EXAMPLE TEXT:
{example_text}

Return ONLY valid JSON:
{{
  "problem_statement": "clean problem statement only (no 'Example N' prefix)",
  "solution_approach": "key steps to solve (2-4 sentences)",
  "concepts_tested": ["concept1", "concept2"],
  "difficulty": "easy|medium|hard",
  "problem_type": "MCQ|numerical|theory"
}}
"""


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
async def extract_example(example_text: str, chapter_name: str, subject: str) -> dict | None:
    """Extract a structured problem from an NCERT example block."""
    if len(example_text) < 80:
        return None

    prompt = EXAMPLE_EXTRACTION_PROMPT.format(
        subject=subject,
        chapter_name=chapter_name,
        example_text=example_text[:2000]
    )

    response = await client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = response.content[0].text.strip()
    if raw.startswith("```"):
        raw = re.sub(r'^```[a-z]*\n?', '', raw)
        raw = re.sub(r'\n?```$', '', raw)

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None


async def extract_chapter(
    sections: list,
    examples: list[str],
    chapter_name: str,
    subject: str,
    concurrency: int = 2
) -> tuple[list[dict], list[dict]]:
    """
    Process all sections and examples for a chapter concurrently.
    concurrency=2 to respect Anthropic rate limits (reduced from 5).
    Returns (section_results, problem_results).
    """
    sem = asyncio.Semaphore(concurrency)

    async def safe_extract_section(section):
        async with sem:
            result = await extract_section(
                section.text, section.heading, chapter_name, subject
            )
            result["_section_heading"] = section.heading
            result["_section_text"] = section.text   # kept for pgvector
            return result

    async def safe_extract_example(ex):
        async with sem:
            return await extract_example(ex, chapter_name, subject)

    section_tasks = [safe_extract_section(s) for s in sections]
    example_tasks = [safe_extract_example(e) for e in examples]

    section_results = await asyncio.gather(*section_tasks)
    example_results = await asyncio.gather(*example_tasks)

    return (
        section_results,
        [r for r in example_results if r is not None]
    )


# fix missing import
import re
