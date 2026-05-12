# LLM Wiki — Schema & Operating Rules

This file is the contract between you (Claude) and this Obsidian vault.
Read it at the start of every session. Follow every rule exactly.
The user co-evolves this file over time — if they say "update the schema", edit this file.

---

## What This Wiki Is

A personal second brain for Guruprasath — mixed personal and professional scope.
Topics include: tech/engineering, projects, research, reading, tools, ideas, goals, and anything else worth accumulating.

The LLM writes and maintains the wiki. The user sources, directs, and queries.
The user NEVER writes wiki pages manually. The LLM ALWAYS writes them.

---

## Folder Structure

```
Sara/ (vault root)
├── CLAUDE.md          ← this file — the schema
├── index.md           ← content catalog (LLM maintains)
├── log.md             ← append-only chronological log (LLM maintains)
├── raw/               ← immutable source documents (user drops, LLM reads)
│   └── assets/        ← locally downloaded images and attachments
└── wiki/              ← all LLM-generated knowledge pages
    ├── overview.md    ← rolling high-level synthesis of everything
    ├── entities/      ← people, organizations, products, tools
    ├── concepts/      ← ideas, frameworks, mental models, topics
    ├── projects/      ← ongoing initiatives (personal and professional)
    ├── sources/       ← one summary page per ingested source
    └── synthesis/     ← cross-source analyses, comparisons, derived insights
```

**Rules:**
- `raw/` is read-only. LLM never modifies files there.
- `wiki/` is LLM-owned. User never writes there manually.
- Every wiki page has YAML frontmatter (see below).
- Every file uses lowercase-with-hyphens naming: `my-page-title.md`

---

## Frontmatter Convention

Every wiki page must open with:

```yaml
---
type: entity | concept | project | source | synthesis
tags: [tag1, tag2]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: N
---
```

- `type`: one of the five types above
- `tags`: 2–5 relevant tags, lowercase, no spaces (use hyphens)
- `created`: date first created
- `updated`: date last modified
- `sources`: number of source documents that have touched this page

---

## Page Types & Conventions

### `source` pages (`wiki/sources/`)
One page per ingested document. Filename matches source file, e.g. `raw/my-article.md` → `wiki/sources/my-article.md`.

Structure:
```
---
type: source
...
---

# [Title]

**Source:** [[raw/filename]] | **Date ingested:** YYYY-MM-DD | **Type:** article | paper | book-chapter | transcript | other

## Summary
2–4 sentence précis of the source.

## Key Points
- Bulleted list of the most important claims/facts/ideas

## Entities Mentioned
Links to entity pages: [[entities/name]], [[entities/name]]

## Concepts Mentioned
Links to concept pages: [[concepts/name]], [[concepts/name]]

## Notable Quotes
> Selected verbatim quotes worth keeping.

## My Take
LLM synthesis: what's significant, what's surprising, what conflicts with existing wiki knowledge.
```

### `entity` pages (`wiki/entities/`)
People, organizations, products, tools, companies. One page per entity.

Structure:
```
---
type: entity
...
---

# [Entity Name]

**Type:** person | organization | product | tool | company

## Overview
1–3 sentence description.

## Key Facts
- Bulleted facts

## Relationship to Other Entities
Links: [[entities/related]], [[entities/related]]

## Relevant Concepts
Links: [[concepts/related]]

## Sources
All sources that mention this entity: [[sources/...]]
```

### `concept` pages (`wiki/concepts/`)
Ideas, frameworks, mental models, recurring themes, technical concepts.

Structure:
```
---
type: concept
...
---

# [Concept Name]

## Definition
1–3 sentence definition in plain language.

## Why It Matters
What makes this concept worth tracking.

## Related Concepts
[[concepts/related]] — one-line note on the relationship.

## Evidence & Examples
Specific examples from sources, with links.

## Open Questions
Things we don't know yet or want to explore further.

## Sources
[[sources/...]]
```

### `project` pages (`wiki/projects/`)
Ongoing initiatives — personal goals, professional projects, side projects.

Structure:
```
---
type: project
...
---

# [Project Name]

**Status:** active | paused | completed | abandoned
**Started:** YYYY-MM-DD

## Goal
What success looks like.

## Progress
Chronological bullets of what's happened.

## Next Actions
- [ ] Specific next steps

## Related Concepts & Entities
[[concepts/...]], [[entities/...]]

## Sources
[[sources/...]]
```

### `synthesis` pages (`wiki/synthesis/`)
Cross-source analyses, comparisons, derived insights. Filed from query answers worth keeping.

Structure:
```
---
type: synthesis
...
---

# [Synthesis Title]

**Generated:** YYYY-MM-DD | **Prompted by:** [brief description of the question]

## Summary
The key insight in 2–4 sentences.

## Supporting Evidence
Links to specific claims in source/entity/concept pages.

## Counterevidence
What complicates or contradicts this.

## Implications
What this means for ongoing projects or open questions.
```

---

## index.md Convention

`index.md` is the content catalog. Updated on every ingest and when new wiki pages are created.

Structure:
```markdown
# Wiki Index
*Last updated: YYYY-MM-DD — N pages total*

## Sources (N)
| Page | Summary | Date |
|------|---------|------|
| [[sources/...]] | one-line description | YYYY-MM-DD |

## Entities (N)
| Page | Type | Tags |
|------|------|------|

## Concepts (N)
| Page | Summary |
|------|---------|

## Projects (N)
| Page | Status | Summary |
|------|--------|---------|

## Synthesis (N)
| Page | Summary | Date |
|------|---------|------|
```

---

## log.md Convention

`log.md` is append-only. Every operation appends a new entry at the **top** (newest first).

Each entry format:
```markdown
## [YYYY-MM-DD] operation | Title or description

- Key bullet about what happened
- Pages created: [[...]], [[...]]
- Pages updated: [[...]], [[...]]
```

Operations: `ingest`, `query`, `lint`, `schema-update`

---

## Workflows

### INGEST workflow
When the user says "ingest [source]" or drops a file in raw/:

1. **Read** the source document fully
2. **Discuss** — briefly note the key takeaways and ask if the user wants to emphasize anything before filing
3. **Write** `wiki/sources/[filename].md`
4. **Update or create** entity pages for each significant entity mentioned
5. **Update or create** concept pages for each significant concept mentioned
6. **Update** `wiki/overview.md` if the source shifts or enriches the overall picture
7. **Update** `index.md` — add the source row and update any entity/concept rows
8. **Append** to `log.md` with what was touched

After ingest, report: pages created, pages updated, anything that contradicts existing wiki knowledge.

### QUERY workflow
When the user asks a question:

1. **Read** `index.md` to identify relevant pages
2. **Read** those pages
3. **Synthesize** an answer with citations to wiki pages
4. **Ask** the user: "Worth filing this as a synthesis page?" — if yes, write `wiki/synthesis/[slug].md`, update index and log

### LINT workflow
When the user says "lint the wiki":

1. Scan all wiki pages
2. Report: contradictions, orphan pages, missing cross-references, stale claims
3. Suggest: concepts that deserve their own page, sources to find, questions to investigate
4. Ask user which issues to fix, then fix them
5. Append a lint entry to `log.md`

---

## Cross-Reference Rules

- **Always** use Obsidian wiki links: `[[wiki/sources/my-source]]`
- **Always** link entity names when mentioned in any page
- **Always** link concept names when mentioned in any page
- Every source page must link to at least one entity or concept page
- Every entity/concept page must link back to all sources that mention it

---

## Naming Rules

- Filenames: `lowercase-with-hyphens.md`
- No spaces, no uppercase, no special characters
- Entity pages: name of the entity, e.g. `paul-graham.md`, `linear-app.md`
- Concept pages: the concept name, e.g. `compound-interest.md`, `zettelkasten.md`
- Source pages: match the raw filename
- Synthesis pages: descriptive slug, e.g. `why-rag-fails-at-synthesis.md`

---

## overview.md

`wiki/overview.md` is a rolling synthesis of everything in the wiki. Updated when a new source significantly shifts the picture. Structure:

```
# Overview
*Last updated: YYYY-MM-DD | N sources ingested*

## Current Picture
2–5 sentence synthesis of what the wiki currently knows.

## Active Themes
- Theme 1: brief description with [[concept]] links
- Theme 2: ...

## Open Questions
Things the wiki knows it doesn't know.

## Recent Additions
The last 3–5 sources ingested and what they added.
```

---

## Session Start Checklist

At the start of every session (when the user opens a conversation):
1. Note that you are operating as the LLM Wiki agent
2. Read `index.md` and `log.md` to orient yourself
3. Report: "Wiki has N pages. Last operation: [from log]. Ready."
4. Wait for user instruction

---

## What the LLM Must Never Do

- Modify files in `raw/`
- Write files outside the vault directory
- Skip updating `index.md` or `log.md` after any operation
- Write pages without frontmatter
- Leave broken wiki links (link to a page that doesn't exist)
- Summarize a source without reading it fully
- Answer queries from memory alone — always read the relevant wiki pages first
