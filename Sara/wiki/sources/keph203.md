---
type: source
tags: [physics, thermal-properties, specific-heat, calorimetry, heat-transfer]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Thermal Properties of Matter

**Source:** [[raw/Physics/Part-02/keph203]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 10 covers thermal properties of matter — temperature measurement, thermal expansion, specific heat, calorimetry, change of state (latent heat), and heat transfer (conduction, convection, radiation). It builds physical intuition about heat as energy in transit and thermal equilibrium, setting the stage for thermodynamics in Chapter 11. Newton's law of cooling and Stefan's law are key quantitative results.

## Key Points

**Temperature Scales:**
- Celsius: 0°C (ice point), 100°C (steam point)
- Kelvin: T(K) = T(°C) + 273.15; absolute zero = 0 K (–273.15°C)
- Ideal gas thermometer: P ∝ T at constant volume → defines absolute scale

**Thermal Expansion:**
- Linear: ΔL = αLΔT (α = linear expansion coefficient)
- Area: ΔA = 2αAΔT (= βAΔT, β = 2α)
- Volume: ΔV = γVΔT (γ = 3α for isotropic materials)
- Water anomaly: water contracts from 0–4°C; maximum density at 4°C → lakes freeze from top

**Specific Heat Capacity:**
- Q = msΔT (m = mass, s = specific heat)
- Molar heat capacity: C = Q/(nΔT)
- Water: s = 4186 J/(kg·K) — highest among common liquids
- Specific heat of gases: Cp > Cv always; Cp – Cv = R for ideal gas

**Calorimetry (Method of Mixtures):**
- Heat lost by hot body = Heat gained by cold body
- m₁s₁(T₁–Tf) = m₂s₂(Tf–T₂) [adiabatic mixing]

**Change of State:**
- Latent heat of fusion (L_f): heat required to melt unit mass at melting point; water = 334 kJ/kg
- Latent heat of vaporisation (L_v): heat to vaporise; water = 2256 kJ/kg
- Q = mL (no temperature change during phase transition)
- Triple point of water: 273.16 K, 0.006 atm

**Heat Transfer:**
- **Conduction:** Q/t = KA(T₁–T₂)/d; K = thermal conductivity (W/m·K)
  - Series: R_total = R₁ + R₂; Parallel: 1/R_total = 1/R₁ + 1/R₂
- **Convection:** heat transfer via fluid motion (natural and forced)
- **Radiation:** all bodies emit electromagnetic radiation; rate depends on temperature and surface
  - Stefan-Boltzmann Law: P = σAεT⁴; σ = 5.67×10⁻⁸ W/(m²·K⁴)
  - Wien's Displacement Law: λ_max·T = constant = 2.898×10⁻³ m·K
  - Black body: ε = 1; perfect emitter and absorber

**Newton's Law of Cooling:**
- dT/dt = –b(T – T_s); exponential cooling
- Approximate linear form: (T₁–T₂)/t = b[(T₁+T₂)/2 – Ts] for small temperature differences

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/thermodynamics]] — this chapter provides prerequisite background
[[concepts/kinetic-theory]] — molecular interpretation of specific heat

## Notable Quotes

> "Heat is the form of energy transferred between two (or more) systems or a system and its surroundings by virtue of temperature difference."

## My Take

**JEE Frequency: High.** This chapter contributes 1–2 questions in JEE — particularly calorimetry (numerical) and radiation laws (conceptual).

**Most-asked topics:**
1. Calorimetry: finding final temperature, latent heat problems (ice+water mixing)
2. Thermal expansion: railway tracks, bimetallic strips, change in period of pendulum (ΔT/T = ½αΔθ)
3. Stefan's law applications: which body radiates more power?
4. Newton's law of cooling: numerical (temperature after time t)
5. Heat conduction through composite walls (series/parallel resistance)

**Common traps:**
- During phase change: temperature STAYS CONSTANT while heat is added
- For expansion of liquids in a container, measure APPARENT expansion not real expansion
- Water anomaly: density maximum at 4°C — why ponds freeze from TOP
- Emissivity ε is DIFFERENT from absorptivity (equal only for true blackbodies — Kirchhoff's law)

**Cross-connections:** Cp – Cv = R bridges to [[concepts/thermodynamics]] (First Law) and [[concepts/kinetic-theory]] (equipartition); thermal expansion of gases bridges to ideal gas law.
