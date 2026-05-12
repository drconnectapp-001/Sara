---
type: source
tags: [physics, fluids, pressure, bernoulli, viscosity, surface-tension]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Mechanical Properties of Fluids

**Source:** [[raw/Physics/Part-02/keph202]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 9 covers the mechanics of fluids (liquids and gases) — pressure, buoyancy, streamline flow, Bernoulli's principle, viscosity, and surface tension. The unifying idea is that fluids cannot sustain shear stress; they deform continuously under any tangential force. Key results include Pascal's law, Archimedes' principle, Bernoulli's equation (energy conservation for flowing fluids), and Stokes' law.

## Key Points

**Pressure:**
- P = F/A; SI unit: Pa = N/m²; 1 atm = 101325 Pa ≈ 10⁵ Pa
- Pressure increases with depth: P = P₀ + ρgh
- Pascal's Law: pressure applied to enclosed fluid transmits equally in all directions (hydraulic press)
- Gauge pressure = P – P_atm
- Archimedes' Principle: buoyant force = weight of displaced fluid; FB = ρ_fluid × V_submerged × g
- Condition for floating: ρ_object < ρ_fluid; fully submerged if ρ_object > ρ_fluid

**Streamline Flow and Continuity:**
- Streamline: path of fluid element; no two streamlines cross
- Laminar flow: orderly layers; turbulent: chaotic mixing
- Reynolds number Re = ρvd/η: Re < ~1000 laminar; Re > ~2000 turbulent
- Equation of continuity: A₁v₁ = A₂v₂ (mass conservation for incompressible fluid)

**Bernoulli's Principle (energy conservation along streamline):**
- P + ½ρv² + ρgh = constant
- Derived from work-energy theorem for ideal fluid
- Applications: Venturi meter, atomizer/spray gun, airplane lift, Magnus effect
- Venturi meter: flow rate Q = A₁A₂√[2(P₁–P₂)/(ρ(A₁²–A₂²))]

**Viscosity:**
- Internal friction between fluid layers; coefficient η (Pa·s or Poise)
- Viscosity decreases with temperature for liquids; increases for gases
- Stokes' Law: drag force on sphere F = 6πηrv
- Terminal velocity: v_t = 2r²(ρ–ρ_f)g/(9η)

**Surface Tension:**
- Cohesive forces create a "skin" on free surface
- Surface tension T = F/l (force per unit length); unit N/m
- Excess pressure inside bubble: ΔP = 4T/r (soap bubble, 2 surfaces); ΔP = 2T/r (liquid drop, spherical meniscus)
- Capillary rise: h = 2T cosθ/(ρgr)
- Angle of contact: wetting (< 90°) vs non-wetting (> 90°)

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/mechanical-properties]] — fluid extension of mechanical properties
[[concepts/work-energy-power]] — Bernoulli derived from work-energy theorem

## Notable Quotes

> "The key property of fluids is that they offer very little resistance to shear stress; their shape changes by application of very small shear stress."

## My Take

**JEE Frequency: High.** Fluids contributes 2–3 questions per paper, making it one of the higher-yield chapters. Bernoulli and continuity equation appear almost every year.

**Most-asked topics:**
1. Continuity equation + Bernoulli combination problems (Venturi, tank drain, Torricelli's theorem)
2. Torricelli's theorem: efflux velocity v = √(2gh) (special case of Bernoulli)
3. Buoyancy: object floating with fraction submerged = ρ_object/ρ_liquid
4. Terminal velocity using Stokes' law
5. Surface tension: excess pressure; capillary rise formula

**Most-asked derivations:**
- Derivation of Bernoulli's equation from work-energy theorem
- Terminal velocity derivation using Stokes' law

**Common traps:**
- Soap bubble has TWO surfaces → ΔP = 4T/r; liquid drop has ONE surface → ΔP = 2T/r
- Bernoulli applies ONLY for ideal (non-viscous, incompressible) flow along a streamline
- At terminal velocity, net force = 0 (gravity = buoyancy + drag)
- Continuity: smaller cross-section → higher speed → LOWER pressure (Bernoulli)

**Cross-connections:** Stokes' law connects to viscosity; Bernoulli connects to [[concepts/work-energy-power]] derivation; capillary rise connects to [[concepts/thermodynamics]] (surface energy).
