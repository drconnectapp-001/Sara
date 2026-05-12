# Wiki Log
*Append-only. Newest entry first. Format: `## [YYYY-MM-DD] operation | description`*

---

## [2026-05-12] ingest | NCERT Class 11 Mathematics — all 14 chapters

- Converted kemh101.pdf–kemh114.pdf to markdown via pdf2md.py
- Pages created (sources): kemh101 (Sets), kemh102 (Relations & Functions), kemh103 (Trigonometric Functions), kemh104 (Mathematical Induction), kemh105 (Complex Numbers), kemh106 (Linear Inequalities), kemh107 (Permutations & Combinations), kemh108 (Binomial Theorem), kemh109 (Sequences & Series), kemh110 (Straight Lines), kemh111 (Conic Sections), kemh112 (3D Geometry), kemh113 (Limits & Derivatives), kemh114 (Statistics & Probability)
- Pages created (concepts): trigonometric-functions, sequences-and-series, limits-and-derivatives
- Note: Math concept pages for remaining chapters (sets, complex-numbers, straight-lines, conic-sections, permutations-combinations, binomial-theorem, statistics-probability) deferred to next session
- Pages updated: index.md (61 pages total), log.md, wiki/overview.md
- Key JEE links: kemh103 (trig identities) → direct use in keph206 (SHM) and keph207 (waves); kemh111 (conics) → satellite orbits (keph107); kemh109 (sequences) → Riemann sums as bridge to Class 12 integration

## [2026-05-12] ingest | NCERT Class 11 Physics Part 2 — chapters 8–14 (keph201–keph207)

- Converted keph201.pdf–keph207.pdf to markdown via pdf2md.py
- Pages created (sources): keph201 (Mechanical Properties of Solids), keph202 (Mechanical Properties of Fluids), keph203 (Thermal Properties of Matter), keph204 (Thermodynamics), keph205 (Kinetic Theory), keph206 (Oscillations), keph207 (Waves)
- Pages created (concepts): mechanical-properties, kinetic-theory, simple-harmonic-motion, waves
- Pages updated: index.md, log.md, wiki/overview.md
- Key cross-subject links: Physics thermodynamics (keph204) overlaps with Chemistry Ch 5 — same laws, different applications (engines vs reactions); keph205 kinetic theory provides molecular basis for Cv, Cp, γ used in adiabatic processes; SHM (keph206) is the foundation for wave motion (keph207)
- Notable: keph207 (Waves) closes the mechanics sequence — every medium element executes SHM

## [2026-05-12] ingest | NCERT Class 11 Physics Part 1 — chapters 1–7 (keph101–keph107)

- Converted keph101.pdf–keph107.pdf to markdown via pdf2md.py
- Pages created (sources): keph101 (Units & Measurement), keph102 (Motion in a Straight Line), keph103 (Motion in a Plane), ch4-laws-of-motion (keph104), ch5-work-energy-power (keph105), ch6-rotational-motion (keph106), ch7-gravitation (keph107)
- Pages created (concepts): kinematics, laws-of-motion, work-energy-power, rotational-dynamics, gravitation
- Pages updated: index.md, log.md, wiki/overview.md
- Key concept chain: keph101 (units) → keph102 (1D kinematics) → keph103 (2D/vectors) → keph104 (Newton's laws) → keph105 (work-energy) → keph106 (rotational analogues) → keph107 (gravitation applies all of the above)
- Notable: Chapter mapping in AGENT_HANDOFF.md was incorrect — actual keph104=Laws of Motion, keph105=Work Energy Power, keph106=Rotational, keph107=Gravitation; verified by reading chapter headings

## [2026-05-12] ingest | NCERT Class 11 Chemistry Part 2 — chapters 7–9

- Converted kech201.pdf, kech202.pdf, kech203.pdf to markdown via pdf2md.py (kech202 required NCERT font decode fix — Bookman-Light +29 shift correction auto-detected by uppercase ratio > 35%)
- Pages created (sources): ch7-redox-reactions, ch8-organic-chemistry-basics, ch9-hydrocarbons
- Pages created (concepts): redox-reactions, organic-chemistry-basics, hydrocarbons
- Pages updated: index.md (21 pages total), wiki/overview.md
- Key cross-chapter links added: carbocation stability (Ch 8) → Markovnikov's rule (Ch 9); inductive+resonance effects (Ch 8) → EAS directive effects (Ch 9); E° bridges to ΔG° = −nFE° (electrochemistry, Class 12)
- Notable: Ch 9 (Hydrocarbons) is highest JEE-weightage organic chapter; Ch 8 mechanisms are prerequisites for all of Class 12 organic chemistry

## [2026-05-12] ingest | NCERT Class 11 Chemistry Part 1 — all 6 chapters

- Read all 8,757 lines across kech101–kech106 + appendix files in full
- Pages created (sources): ch1-some-basic-concepts-of-chemistry, ch2-structure-of-atom, ch3-classification-of-elements, ch4-chemical-bonding, ch5-thermodynamics, ch6-equilibrium
- Pages created (concepts): mole-concept, atomic-structure, electronic-configuration, periodic-trends, chemical-bonding, hybridization, thermodynamics, chemical-equilibrium, acid-base-chemistry
- Pages updated: index.md (15 pages total), wiki/overview.md
- Key cross-chapter link: ΔG⊖ = –RT ln K bridges Ch 5 (thermodynamics) and Ch 6 (equilibrium)
- Notable: Chapter 6 (Equilibrium) is the longest and most JEE-numerically demanding

## [2026-05-12] schema-update | Wiki initialized

- Schema written to `CLAUDE.md`
- `index.md` created (empty catalog)
- `log.md` created (this file)
- `wiki/overview.md` stub created
- Folder structure created: `raw/`, `raw/assets/`, `wiki/entities/`, `wiki/concepts/`, `wiki/projects/`, `wiki/sources/`, `wiki/synthesis/`
- Domain: personal + work mixed
- Owner: Guruprasath
