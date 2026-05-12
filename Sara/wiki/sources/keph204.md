---
type: source
tags: [physics, thermodynamics, carnot, first-law, second-law, entropy]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Thermodynamics (Physics)

**Source:** [[raw/Physics/Part-02/keph204]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 11 (Physics) develops thermodynamics as the science of heat and work interconversion. It distinguishes thermodynamics from mechanics, establishes the Zeroth, First, and Second Laws, derives equations for all four thermodynamic processes (isothermal, adiabatic, isochoric, isobaric), and culminates in the Carnot engine — the most efficient possible heat engine. This chapter overlaps conceptually with Class 11 Chemistry Chapter 6 (Thermodynamics) but focuses on engines, processes, and entropy rather than chemistry applications.

## Key Points

**Laws:**
- **Zeroth Law:** if A is in thermal equilibrium with C, and B with C → A is in thermal equilibrium with B; defines temperature
- **First Law:** ΔQ = ΔU + ΔW (heat supplied = change in internal energy + work done BY system)
  - ΔW = PΔV (work done by gas during expansion)
  - Internal energy U depends only on temperature for ideal gas
- **Second Law:**
  - Kelvin-Planck: no process can convert heat entirely into work
  - Clausius: no process spontaneously transfers heat from cold to hot body

**State Variables:** P, V, T, U (state-dependent); Q and W are NOT state variables (path-dependent)
- Extensive: U, V, mass (scale with size)
- Intensive: P, T, density (size-independent)

**Thermodynamic Processes:**

| Process | Constant | ΔQ | ΔU | ΔW |
|---------|----------|-----|-----|-----|
| Isothermal | T | = W | = 0 | = Q = µRT ln(V₂/V₁) |
| Adiabatic | Q = 0 | 0 | = –W | = µR(T₁–T₂)/(γ–1) |
| Isochoric | V | = ΔU | = nCvΔT | = 0 |
| Isobaric | P | = nCpΔT | = nCvΔT | = PΔV = nRΔT |

- Adiabatic equation: PVᵞ = constant; γ = Cp/Cv
- Cp – Cv = R (Mayer's relation, for ideal gas)

**Carnot Cycle (4 steps):**
1. Isothermal expansion at T₁ (absorbs Q₁)
2. Adiabatic expansion (T₁ → T₂)
3. Isothermal compression at T₂ (releases Q₂)
4. Adiabatic compression (T₂ → T₁)

- Carnot efficiency: η = 1 – Q₂/Q₁ = 1 – T₂/T₁ (temperatures in Kelvin!)
- Carnot engine is most efficient; all real engines are less efficient
- Refrigerator COP = Q₂/(Q₁–Q₂) = T₂/(T₁–T₂)

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/thermodynamics]] — cross-link to Chemistry thermodynamics (ΔH, ΔS, ΔG)
[[concepts/kinetic-theory]] — molecular basis of thermodynamic quantities

## Notable Quotes

> "A statement like 'a gas in a given state has a certain amount of heat' is as meaningless as the statement that 'a gas in a given state has a certain amount of work'."

> "The Zeroth Law clearly suggests that when two systems A and B, are in thermal equilibrium, there must be a physical quantity that has the same value for both. This thermodynamic variable is called temperature."

## My Take

**JEE Frequency: Very High.** Thermodynamics is one of the highest-weightage physics chapters — 2–3 questions per paper, always including a Carnot efficiency calculation and a thermodynamic process problem.

**Most-asked derivations:**
1. Carnot efficiency η = 1 – T₂/T₁ (asked directly in JEE Advanced)
2. Work done in isothermal process: W = µRT ln(V₂/V₁)
3. Work done in adiabatic process: W = µR(T₁–T₂)/(γ–1)
4. Cp – Cv = R (Mayer's relation derivation)

**Most-asked numerical types:**
- Given P-V diagram (cyclic process): find net work done = area enclosed
- Carnot engine: given T₁, T₂, find η; given η and Q₁, find W and Q₂
- Which process: identify from P-V graph (isothermal = hyperbola; adiabatic = steeper than isothermal)

**Common traps:**
- Carnot efficiency formula uses KELVIN not Celsius — the most common error
- Adiabatic process is STEEPER than isothermal on P-V graph
- For ideal gas in isothermal process: ΔU = 0 (NOT "heat = 0")
- Refrigerator COP can be > 1 — it's not an efficiency, it's a ratio of desired output to input
- Second Law direction: spontaneous processes go to higher entropy

**Critical cross-connection:** This chapter's thermodynamic processes bridge to Chemistry [[concepts/thermodynamics]] (ΔH° = ΔU° + ΔnRT; spontaneity via ΔG) and [[concepts/chemical-equilibrium]] (ΔG° = –RT ln K). Sara should link First Law from Physics to Hess's Law from Chemistry — same principle, different language.
