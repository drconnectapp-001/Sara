---
type: concept
tags: [physics, kinetic-theory, ideal-gas, specific-heat, equipartition]
created: 2026-05-12
updated: 2026-05-12
sources: 2
---

# Kinetic Theory

## Definition

Kinetic theory provides a molecular-level explanation for macroscopic gas behaviour — pressure, temperature, and specific heats — by applying classical mechanics (Newton's laws) to a large ensemble of gas molecules. It shows that temperature is a measure of average translational kinetic energy per molecule.

## Why It Matters

Kinetic theory bridges atomic-scale physics to thermodynamics. It gives molecular interpretations for Cv, Cp, and γ — which appear in every thermodynamic process calculation (adiabatic: PVᵞ = constant). JEE tests kinetic theory 1–2 times per paper, typically on specific heats and RMS speed.

## Related Concepts

[[concepts/thermodynamics]] — kinetic theory provides molecular basis for Cp, Cv, γ used in thermodynamic processes
[[concepts/mechanical-properties]] — bulk modulus interpretation from kinetic theory (B = γP for adiabatic)
[[concepts/mole-concept]] — from Chemistry; Avogadro's number Nₐ, molar mass M used in speed formulas

## Evidence & Examples

**Key Formulas:**
- PV = nRT = NkT; k = R/Nₐ = 1.38×10⁻²³ J/K
- RMS speed: v_rms = √(3RT/M) = √(3kT/m)
- Average speed: v_avg = √(8RT/πM)
- Most probable speed: v_mp = √(2RT/M)
- Ratio: v_rms : v_avg : v_mp = √3 : √(8/π) : √2 ≈ 1.73 : 1.60 : 1.41

**Equipartition and Specific Heats:**
| Gas type | DOF | Cv | Cp | γ |
|----------|-----|-----|-----|---|
| Monatomic (He, Ar) | 3 | 3R/2 | 5R/2 | 5/3 |
| Diatomic (N₂, O₂) rigid | 5 | 5R/2 | 7R/2 | 7/5 |
| Triatomic/polyatomic | 6 | 3R | 4R | 4/3 |

- Mayer's relation: Cp – Cv = R (for ideal gas)
- Average KE per molecule = (3/2)kT [translational]; per DOF = (1/2)kT

**Mean Free Path:**
- λ = 1/(√2 πd²n) [d = molecular diameter, n = number density]

## Open Questions

- What happens at very high temperatures when vibrational modes activate?
- How does kinetic theory break down for real gases (Van der Waals)?

## Sources

[[sources/keph205]] — Kinetic Theory (full treatment)
[[sources/keph204]] — Thermodynamics (uses γ = Cp/Cv from kinetic theory)
