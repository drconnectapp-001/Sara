---
type: source
tags: [chemistry, cbse, class-11, thermodynamics, enthalpy, entropy, gibbs-energy]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Chapter 5: Thermodynamics

**Source:** [[raw/Chemistry/Part-01/kech105.md]] | **Date ingested:** 2026-05-12 | **Type:** textbook-chapter (NCERT Class 11 Chemistry Part 1)

## Summary
Studies energy changes in chemical reactions. Establishes First Law (energy conservation), enthalpy (heat at constant pressure), Hess's Law, then Second Law (entropy, spontaneity), and finally Gibbs energy as the unified spontaneity criterion connecting enthalpy and entropy.

## Key Points

### Basic Concepts
- **System:** part of universe under study; **Surroundings:** everything else; separated by **boundary**
- **Open system:** exchanges matter and energy (e.g., open beaker)
- **Closed system:** exchanges only energy (e.g., sealed balloon)
- **Isolated system:** exchanges neither (e.g., thermos flask)
- **State functions:** properties independent of path; value depends only on state (T, P, V, U, H, S, G)
- **Internal energy (U):** total energy of system; absolute value unknown; only ΔU measurable

### First Law of Thermodynamics
- **ΔU = q + w** (IUPAC convention: w done ON system is positive)
- Work: w = –pextΔV (at constant external pressure); w = –nRT ln(Vf/Vi) for reversible isothermal
- At constant volume: ΔU = qV (measured in bomb calorimeter)
- **Enthalpy (H):** H = U + pV; ΔH = qp (heat at constant pressure)
- **ΔH = ΔU + ΔngRT** (Δng = moles of gaseous products – moles of gaseous reactants)
- **Exothermic:** ΔH < 0 (heat released to surroundings)
- **Endothermic:** ΔH > 0 (heat absorbed from surroundings)
- **Heat capacity:** Cp = heat required to raise T by 1 K at constant pressure; Cv at constant V; q = mcΔT = nCΔT

### Enthalpy Calculations
- **Standard state:** pure form at 1 bar; standard conditions denoted by ⊖ symbol
- **ΔfH⊖ (standard enthalpy of formation):** ΔH for forming 1 mole compound from elements in most stable standard states; ΔfH⊖ of elements in standard state = 0
- **ΔrH⊖ = Σai ΔfH⊖(products) – Σbi ΔfH⊖(reactants)**
- **Hess's Law:** enthalpy change is path-independent (state function); ΔH for multi-step reaction = sum of ΔH for individual steps
- **Bond enthalpy (ΔbondH⊖):** energy to break 1 mole of bonds in gaseous molecules; ΔrH = Σ(bond enthalpies of reactants) – Σ(bond enthalpies of products)
- **Lattice enthalpy:** energy to dissociate 1 mole ionic compound into gaseous ions; calculated via Born-Haber cycle; NaCl = +788 kJ/mol
- **Enthalpy of solution (ΔsolH) = ΔlatticeH + ΔhydH** (lattice vs hydration determine solubility)
- **Combustion enthalpy (ΔcH⊖):** ΔH when 1 mole substance completely burns in O₂ (all products = CO₂, H₂O)

### Spontaneity and Second Law
- **Spontaneous process:** occurs without external assistance (may be slow); H₂ + O₂ → H₂O is spontaneous but slow
- **ΔH alone doesn't determine spontaneity** (some endothermic reactions are spontaneous)
- **Entropy (S):** measure of disorder/randomness; state function
  - ΔS = qrev/T; units J K⁻¹ mol⁻¹
  - Gases > Liquids > Solids in entropy
  - Mixing increases entropy; dissolution increases entropy (usually)
  - Reactions producing more moles of gas increase entropy
- **Second Law:** ΔStotal = ΔSsystem + ΔSsurroundings > 0 for any spontaneous process; = 0 for reversible (equilibrium)
- **Third Law:** entropy of pure perfectly crystalline substance = 0 at 0 K (absolute entropy reference)

### Gibbs Energy (G)
- **G = H – TS** (defined at constant T, P)
- **ΔG = ΔH – TΔS** (constant T)
- **Criterion for spontaneity:** ΔG < 0 (spontaneous); ΔG = 0 (equilibrium); ΔG > 0 (non-spontaneous)
- **Temperature effects on spontaneity:**

| ΔH | ΔS | Spontaneous when |
|----|----|-----------------|
| – | + | Always (all T) |
| – | – | Low T only |
| + | + | High T only |
| + | – | Never |

- **ΔG⊖ = –RT ln K** (connects thermodynamics to equilibrium constant)
- Large positive K → large negative ΔG⊖ → very spontaneous under standard conditions

## Entities Mentioned
Lavoisier, Hess, Born, Haber, Clausius, Gibbs, Carnot

## Concepts Mentioned
[[concepts/thermodynamics]], [[concepts/gibbs-energy-and-equilibrium]], [[concepts/chemical-equilibrium]], [[concepts/enthalpy]]

## Notable Quotes
> "ΔG = ΔH – TΔS — the ultimate criterion for spontaneity at constant T and P."

> "Enthalpy is a state function — the change in enthalpy is independent of path."

## My Take
Thermodynamics is high-weightage and deeply interconnected: First Law feeds into Hess's Law problems (numerical), entropy into spontaneity reasoning, and ΔG⊖ = –RT ln K directly links this chapter to Chapter 6 (Equilibrium). JEE numericals typically involve: (1) ΔrH from ΔfH values using Hess's law, (2) ΔH from bond enthalpies, (3) Born-Haber cycle for lattice enthalpy, (4) predicting spontaneity from ΔH and ΔS signs, (5) calculating K from ΔG⊖. The sign convention for w (IUPAC: work done ON system is +ve) differs from older physics convention — a classic source of errors.
