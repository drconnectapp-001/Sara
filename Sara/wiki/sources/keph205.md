---
type: source
tags: [physics, kinetic-theory, ideal-gas, equipartition, mean-free-path]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Kinetic Theory

**Source:** [[raw/Physics/Part-02/keph205]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 12 provides the molecular-level explanation for macroscopic gas behaviour. Starting from the atomic hypothesis, it derives the ideal gas pressure from first principles using Newton's laws applied to molecular collisions, shows that temperature is proportional to average kinetic energy, applies the law of equipartition of energy to predict specific heats, and derives mean free path. This chapter bridges classical mechanics and thermodynamics at the molecular scale.

## Key Points

**Ideal Gas and Molecular Picture:**
- Ideal gas: molecules are point masses; only elastic collisions; no intermolecular forces
- Ideal gas law: PV = nRT (n = number of moles, R = 8.314 J/mol·K)
- Also: PV = NkT (N = number of molecules, k = Boltzmann constant = 1.38×10⁻²³ J/K); k = R/Nₐ

**Kinetic Theory Derivation of Pressure:**
- P = (1/3)(ρv²_rms) = (1/3)(Nm/V)v²_rms
- KE of a molecule: ½mv² = (3/2)kT
- v_rms = √(3kT/m) = √(3RT/M) [M = molar mass]
- v_avg = √(8kT/πm) = √(8RT/πM)
- v_mp (most probable) = √(2kT/m) = √(2RT/M)
- Order: v_mp < v_avg < v_rms

**Temperature and Kinetic Energy:**
- Average KE per molecule = (3/2)kT (translational only)
- Average KE per mole = (3/2)RT
- Temperature is a measure of average translational KE

**Law of Equipartition of Energy:**
- Each degree of freedom contributes (1/2)kT to average energy
- Monatomic gas: 3 translational DOF → U = (3/2)nRT; Cv = (3/2)R; Cp = (5/2)R; γ = 5/3
- Diatomic gas (rigid): 3 trans + 2 rot = 5 DOF → U = (5/2)nRT; Cv = (5/2)R; Cp = (7/2)R; γ = 7/5
- Triatomic/polyatomic (rigid): 6 DOF → Cv = 3R; γ = 4/3
- Vibrational modes contribute at high temperatures only

**Mean Free Path:**
- λ = 1/(√2 π d² n) where d = diameter, n = number density (N/V)
- At normal conditions λ ≈ few tens of nm for air molecules
- As pressure decreases, λ increases; vacuum when λ >> container dimensions

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/kinetic-theory]] — full treatment
[[concepts/thermodynamics]] — molecular basis of Cv, Cp, γ

## Notable Quotes

> "The kinetic theory was developed in the nineteenth century by Maxwell, Boltzmann and others."

> "Temperature is related to the energy of the internal (disordered) motion of the bullet, not to the motion of the bullet as a whole."

## My Take

**JEE Frequency: High.** Kinetic theory appears 1–2 times per paper, often as conceptual or numerical questions about specific heats, RMS speed, or pressure.

**Most-asked topics:**
1. RMS, average, and most probable speed formulas — and their ratios (v_rms : v_avg : v_mp = √3 : √(8/π) : √2 ≈ 1.73 : 1.60 : 1.41)
2. Cv and Cp for monatomic/diatomic gases using equipartition; γ = Cp/Cv
3. Pressure derivation: P = (1/3)ρv²_rms
4. Using PV = nRT to find work done in various processes
5. Degree of freedom concept — why γ changes with atomicity

**Common traps:**
- v_rms ≠ average speed; use the right formula for what's asked
- Degrees of freedom: RIGID diatomic = 5 (no vibration at room temp); vibrating diatomic = 7
- Mean free path is NOT the average intermolecular distance — it's the distance between collisions
- Boltzmann constant k vs gas constant R: k is per molecule, R is per mole; R = Nₐ × k

**Cross-connections:** γ = Cp/Cv from this chapter → directly used in adiabatic process (PVᵞ = constant) in [[sources/keph204]]; specific heat derivation from equipartition connects to [[concepts/thermodynamics]] (Cp – Cv = R verification).
