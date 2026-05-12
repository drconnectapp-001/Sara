---
type: concept
tags: [chemistry, equilibrium, le-chatelier, class-11]
created: 2026-05-12
updated: 2026-05-12
sources: 2
---

# Chemical Equilibrium

## Definition
The state in a reversible reaction where the rate of the forward reaction equals the rate of the reverse reaction, resulting in constant (but not necessarily equal) concentrations of reactants and products. It is **dynamic** — both reactions continue at the molecular level.

## Why It Matters
Equilibrium governs the yield of industrial reactions (Haber process, contact process), all acid-base chemistry, solubility, and buffer systems. Understanding Kc and Le Chatelier's principle allows prediction and control of reaction outcomes.

## Key Equations

| Expression | Formula |
|-----------|---------|
| Kc | [C]c[D]d / [A]a[B]b for aA + bB ⇌ cC + dD |
| Kp | pc^c × pd^d / pa^a × pb^b |
| Kp–Kc relation | Kp = Kc(RT)^Δng |
| Reaction quotient | Qc = same form as Kc, at any time |
| ΔG⊖ and K | ΔG⊖ = –RT ln K |

## Reading Kc

| Kc value | Meaning |
|---------|---------|
| >> 1 (>10³) | Products strongly favoured; reaction nearly complete |
| << 1 (<10⁻³) | Reactants strongly favoured; reaction barely proceeds |
| ~1 (10⁻³–10³) | Significant amounts of both |

## Le Chatelier's Principle
When a system at equilibrium is stressed, it shifts to minimize the stress.

| Stress | Direction of shift |
|-------|-------------------|
| Add reactant | Forward → |
| Remove reactant | Backward ← |
| Add product | Backward ← |
| Remove product | Forward → |
| Increase pressure (decrease V) | Toward fewer moles of gas |
| Decrease pressure (increase V) | Toward more moles of gas |
| Increase T (exothermic rxn) | Backward ← (Kc decreases) |
| Increase T (endothermic rxn) | Forward → (Kc increases) |
| Add catalyst | No shift; equilibrium reached faster |
| Add inert gas (constant V) | No effect |

## Qc vs Kc — Predicting Direction
- Qc < Kc → forward reaction (more products needed)
- Qc > Kc → reverse reaction (too many products)
- Qc = Kc → already at equilibrium

## Kc Algebra Rules
- Reverse reaction: K' = 1/Kc
- Multiply equation by n: K' = Kc^n
- Add two equations: Knet = K₁ × K₂

## Heterogeneous Equilibria
Pure solids and pure liquids have constant "concentration" → excluded from Kc expression
- CaCO₃(s) ⇌ CaO(s) + CO₂(g): Kp = pCO₂

## Industrial Application
**Haber Process:** N₂ + 3H₂ ⇌ 2NH₃; ΔH = –92 kJ/mol (exothermic)
- Low T → favours products but slow rate
- High T → fast rate but low Kc
- Compromise: ~500°C, 200 atm, Fe catalyst
- High pressure → more NH₃ (fewer moles on right, wait — actually 4 mol → 2 mol, so high pressure favours NH₃)

## Related Concepts
- [[concepts/thermodynamics]] — ΔG⊖ = –RT ln K
- [[concepts/acid-base-chemistry]] — Ka, Kb, Kw are equilibrium constants
- [[concepts/mole-concept]] — concentrations always in mol/L

## Sources
[[sources/ch6-equilibrium]], [[sources/ch5-thermodynamics]]
