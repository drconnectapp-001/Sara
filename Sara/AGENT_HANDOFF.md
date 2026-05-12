# Agent Handoff — Physics & Mathematics Wiki Ingestion

**For:** The next Claude agent picking up this work  
**From:** The agent that built the wiki and ingested all of Class 11 Chemistry  
**Working directory:** `/Users/guruprasath/Documents/Sara/Sara/`  
**Date written:** 2026-05-12

---

## What This Project Is

A personal JEE study wiki for Sara (Class 11, JEE Mains 2027 target). You are acting as the **LLM Wiki agent** — you write and maintain all wiki pages. The user never writes wiki pages manually.

**Read `CLAUDE.md` in this directory first. It is the contract you must follow exactly.** Every rule in it is mandatory: frontmatter on every page, specific folder structure, always update `index.md` and `log.md` after every operation, never modify files in `raw/`.

---

## What Has Already Been Done

All of **Class 11 Chemistry** (NCERT) is ingested. Wiki currently has **21 pages**:

**Sources (9 pages in `wiki/sources/`):**
- `ch1-some-basic-concepts-of-chemistry.md` — mole concept, stoichiometry
- `ch2-structure-of-atom.md` — Bohr model, quantum numbers, electronic config
- `ch3-classification-of-elements.md` — periodic table, periodic trends
- `ch4-chemical-bonding.md` — ionic/covalent bonds, VSEPR, hybridization, MO theory
- `ch5-thermodynamics.md` — ΔH, ΔS, ΔG, Hess's Law, spontaneity
- `ch6-equilibrium.md` — Kc/Kp, Le Chatelier, acid-base, buffers, Ksp
- `ch7-redox-reactions.md` — oxidation numbers, balancing, E° table, Daniell cell
- `ch8-organic-chemistry-basics.md` — electronic effects, bond fission, IUPAC naming
- `ch9-hydrocarbons.md` — alkanes/alkenes/alkynes/benzene, Markovnikov, EAS

**Concepts (12 pages in `wiki/concepts/`):** mole-concept, atomic-structure, electronic-configuration, periodic-trends, chemical-bonding, hybridization, thermodynamics, chemical-equilibrium, acid-base-chemistry, redox-reactions, organic-chemistry-basics, hydrocarbons

---

## Your Task

Ingest **Physics** and **Mathematics** NCERT Class 11 textbooks using the exact same workflow used for Chemistry.

---

## Step 1 — Convert PDFs to Markdown

Use the conversion script at `/Users/guruprasath/Documents/Sara/Sara/pdf2md.py`.

**Command syntax:**
```bash
python3 /Users/guruprasath/Documents/Sara/Sara/pdf2md.py \
  /Users/guruprasath/Documents/Sara/Class-11/<folder>/<file>.pdf \
  -o /Users/guruprasath/Documents/Sara/Sara/raw/<Subject>/<Part-0X>/<file>.md
```

**IMPORTANT — NCERT font encoding bug:**  
Some NCERT PDFs (tested: kech202 — Organic Chemistry) use a Bookman-Light font whose ToUnicode table is incomplete, causing garbled text. The script **auto-detects** this (uppercase ratio > 35% of alphabetic characters) and applies a +29 shift decode. You do not need to do anything special — just run the script normally. If the output looks garbled, add `--ncert-fix` to force it on. If it looks wrong in the other direction (letters shifted incorrectly), add `--no-ncert-fix`.

**After conversion, always spot-check the output** — open the `.md` file and read ~50 lines from the middle of the chapter. It should be coherent readable English. If it's all `???` or all uppercase gibberish, the auto-detection failed — try `--ncert-fix`.

**Prerequisite:** PyMuPDF must be installed. If not: `pip3 install pymupdf --break-system-packages`

---

## Physics PDFs to Convert and Ingest

**Physics Part 1** — PDFs in `/Users/guruprasath/Documents/Sara/Class-11/keph1dd/`  
Output to: `/Users/guruprasath/Documents/Sara/Sara/raw/Physics/Part-01/`

| File | NCERT Chapter | Topic |
|------|--------------|-------|
| keph101.pdf | Ch 1 | Physical World |
| keph102.pdf | Ch 2 | Units and Measurement |
| keph103.pdf | Ch 3 | Motion in a Straight Line |
| keph104.pdf | Ch 4 | Motion in a Plane |
| keph105.pdf | Ch 5 | Laws of Motion |
| keph106.pdf | Ch 6 | Work, Energy and Power |
| keph107.pdf | Ch 7 | System of Particles and Rotational Motion |

**Physics Part 2** — PDFs in `/Users/guruprasath/Documents/Sara/Class-11/keph2dd/`  
Output to: `/Users/guruprasath/Documents/Sara/Sara/raw/Physics/Part-02/`

| File | NCERT Chapter | Topic |
|------|--------------|-------|
| keph201.pdf | Ch 8 | Gravitation |
| keph202.pdf | Ch 9 | Mechanical Properties of Solids |
| keph203.pdf | Ch 10 | Mechanical Properties of Fluids |
| keph204.pdf | Ch 11 | Thermal Properties of Matter |
| keph205.pdf | Ch 12 | Thermodynamics |
| keph206.pdf | Ch 13 | Kinetic Theory |
| keph207.pdf | Ch 14 | Oscillations and Waves |

**Skip:** keph1a1.pdf, keph1an.pdf, keph1ps.pdf, keph2an.pdf, keph2ps.pdf — these are appendix/answer/problem-supplement files. Convert only if you have leftover context budget.

---

## Mathematics PDFs to Convert and Ingest

**Mathematics** — PDFs in `/Users/guruprasath/Documents/Sara/Class-11/kemh1dd/`  
Output to: `/Users/guruprasath/Documents/Sara/Sara/raw/Mathematics/`

| File | NCERT Chapter | Topic |
|------|--------------|-------|
| kemh101.pdf | Ch 1 | Sets |
| kemh102.pdf | Ch 2 | Relations and Functions |
| kemh103.pdf | Ch 3 | Trigonometric Functions |
| kemh104.pdf | Ch 4 | Principle of Mathematical Induction |
| kemh105.pdf | Ch 5 | Complex Numbers and Quadratic Equations |
| kemh106.pdf | Ch 6 | Linear Inequalities |
| kemh107.pdf | Ch 7 | Permutations and Combinations |
| kemh108.pdf | Ch 8 | Binomial Theorem |
| kemh109.pdf | Ch 9 | Sequences and Series |
| kemh110.pdf | Ch 10 | Straight Lines |
| kemh111.pdf | Ch 11 | Conic Sections |
| kemh112.pdf | Ch 12 | Introduction to Three-Dimensional Geometry |
| kemh113.pdf | Ch 13 | Limits and Derivatives |
| kemh114.pdf | Ch 14 | Statistics and Probability |

**Skip:** kemh1a1.pdf, kemh1a2.pdf, kemh1an.pdf, kemh1ps.pdf, kemh1sm.pdf

**Note:** Mathematics PDFs may or may not have the NCERT encoding issue — auto-detection will handle it. Math-heavy pages with lots of symbols may have imperfect extraction due to LaTeX/equation rendering in PDFs. Do your best — a source page with 80% readable content is still worth having.

---

## Step 2 — The Ingest Workflow (per CLAUDE.md)

For each chapter, after converting the PDF:

### 2a. Read the raw markdown fully
The converted `.md` file is the source of truth. Read it completely before writing any wiki page.

### 2b. Write the source page
File: `wiki/sources/<filename>.md`  
Follow the exact structure from CLAUDE.md (type: source, frontmatter, Summary, Key Points, Entities Mentioned, Concepts Mentioned, Notable Quotes, My Take).

**For "My Take"**: write JEE-specific analysis — which topics have highest exam weightage, what mechanism/derivation questions appear frequently, what connects to other chapters. This is the most valuable part of the source page for Sara.

### 2c. Write or update concept pages
File: `wiki/concepts/<concept-slug>.md`  
One page per significant concept introduced in the chapter. Check if the concept already exists (see list above) — if so, update it rather than creating a duplicate.

**Key: don't create a concept page for every small topic.** Create one when the concept is a standalone idea worth referencing across multiple sources (e.g., `simple-harmonic-motion`, `rotational-dynamics`, `gravitation`, `kinematics`, `trigonometric-functions`, `limits-and-derivatives`).

**Do link existing concepts** — Physics thermodynamics (Ch 12) should link to `[[concepts/thermodynamics]]` already in the wiki from Chemistry.

### 2d. Update index.md (at vault root, NOT wiki/index.md)
File: `/Users/guruprasath/Documents/Sara/Sara/index.md`  
Add a row to Sources table; add/update rows in Concepts table; increment "N pages total" count.

### 2e. Append to log.md (at vault root)
File: `/Users/guruprasath/Documents/Sara/Sara/log.md`  
Prepend a new entry (newest first). Group by session — one log entry per batch of chapters ingested, not one per chapter.

### 2f. Update overview.md
File: `/Users/guruprasath/Documents/Sara/Sara/wiki/overview.md`  
Add Physics and Mathematics to the current picture; note cross-subject connections (e.g., Physics thermodynamics ↔ Chemistry thermodynamics; Math trigonometry ↔ Physics oscillations/waves).

---

## Prioritisation — Do Physics First

If context runs short, Physics > Mathematics for JEE relevance. Within Physics, priority order:
1. Ch 5 Laws of Motion — Newton's laws, friction, FBD (highest JEE frequency)
2. Ch 6 Work, Energy, Power — conservation laws
3. Ch 7 Rotational Motion — moment of inertia, torque, angular momentum
4. Ch 8 Gravitation — Kepler's laws, orbital mechanics
5. Ch 3/4 Kinematics — equations of motion, projectile
6. Ch 12 Thermodynamics — connects directly to Chemistry Ch 5 already in wiki
7. Ch 14 Oscillations and Waves — SHM, standing waves (high JEE frequency)
8. Remaining Physics chapters
9. Mathematics chapters (still very important — do not skip)

---

## Key Quality Standards (from prior work)

1. **Source pages are dense summaries, not outlines.** Every key formula, every named law, every preparation method, every mechanism should be captured in the Key Points section. Look at `wiki/sources/ch9-hydrocarbons.md` as a gold standard example.

2. **Concept pages have structure:** Definition → Why It Matters → detailed content with tables/formulas → Related Concepts → Open Questions → Sources. See `wiki/concepts/redox-reactions.md` or `wiki/concepts/hydrocarbons.md` as examples.

3. **JEE lens on everything.** Sara is preparing for JEE Mains 2027. Every "My Take" section should call out: which derivations are asked, which formula combinations appear in numericals, what conceptual traps exist. Generic summaries are not enough.

4. **Cross-link aggressively.** When Physics thermodynamics mentions entropy, link `[[concepts/thermodynamics]]`. When waves chapter mentions SHM, link the SHM concept page you just created. The graph of wiki links is what makes this useful.

5. **Mathematics needs formula tables.** For trig, write out the key identities in a table. For sequences/series, include the standard formulas. For calculus (limits/derivatives), include the standard results. Math concept pages should be reference cards Sara can look up quickly.

---

## File Naming Convention

- Raw files: match the PDF name exactly, e.g. `keph101.md`
- Source pages: descriptive, e.g. `ch1-physical-world.md`, `ch3-motion-straight-line.md`
- Concept pages: lowercase-hyphenated concept name, e.g. `simple-harmonic-motion.md`, `rotational-dynamics.md`

**Never use uppercase, spaces, or special characters in filenames.**

---

## Cross-Subject Connections to Flag

These bridges between subjects are especially valuable for Sara — flag them in source pages and concept pages:

| Physics | ↔ | Chemistry/Math |
|---------|---|----------------|
| Ph Ch 12 Thermodynamics | ↔ | Chem Ch 5 Thermodynamics (same laws, different variables) |
| Ph Ch 14 Oscillations/Waves | ↔ | Math Ch 3 Trig Functions (SHM is y = A sin(ωt + φ)) |
| Ph Ch 6 Work-Energy | ↔ | Math integration concepts |
| Ph Ch 4 Motion in a Plane | ↔ | Math Ch 10 Vectors in coordinate geometry |
| Ph Ch 7 Rotational Motion | ↔ | Math integration (moment of inertia calculations) |

---

## Current Wiki State for Reference

```
wiki/
├── overview.md           (9 sources, needs updating with Physics+Math)
├── concepts/             (12 concept pages — all Chemistry)
│   ├── mole-concept.md
│   ├── atomic-structure.md
│   ├── electronic-configuration.md
│   ├── periodic-trends.md
│   ├── chemical-bonding.md
│   ├── hybridization.md
│   ├── thermodynamics.md       ← Physics thermodynamics should LINK HERE
│   ├── chemical-equilibrium.md
│   ├── acid-base-chemistry.md
│   ├── redox-reactions.md
│   ├── organic-chemistry-basics.md
│   └── hydrocarbons.md
├── sources/              (9 source pages — all Chemistry)
│   ├── ch1–ch6 (Part 1)
│   └── ch7–ch9 (Part 2)
├── entities/             (empty — no entity pages yet)
├── projects/             (empty)
└── synthesis/            (empty)
```

`index.md` (at vault root) shows: 21 pages total (9 sources + 12 concepts).

---

## How to Start

1. Read `CLAUDE.md` at `/Users/guruprasath/Documents/Sara/Sara/CLAUDE.md` — mandatory
2. Read `index.md` and `log.md` to orient yourself (as the schema requires at session start)
3. Create output directories:
   ```bash
   mkdir -p /Users/guruprasath/Documents/Sara/Sara/raw/Physics/Part-01
   mkdir -p /Users/guruprasath/Documents/Sara/Sara/raw/Physics/Part-02
   mkdir -p /Users/guruprasath/Documents/Sara/Sara/raw/Mathematics
   ```
4. Convert and ingest Physics Part 1 first (Ch 2–7 are the JEE core; Ch 1 Physical World is intro-only, can be brief)
5. Then Physics Part 2, then Mathematics
6. Update index, log, overview after each batch

Good luck.
