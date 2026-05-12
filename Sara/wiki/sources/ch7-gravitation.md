---
type: source
tags: [physics, gravitation, kepler, orbital-mechanics, satellites]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# NCERT Physics Ch 7 — Gravitation

**Source:** [[raw/Physics/Part-01/keph107]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary
Newton's universal law of gravitation, Kepler's laws of planetary motion, variation of g with height/depth, gravitational potential energy, escape velocity, and orbital mechanics of satellites. Strong cross-connection to conservation of energy (Ch 5) and angular momentum (Ch 6).

## Key Points

### Newton's Universal Law of Gravitation
- **F = GMm/r²** (attractive, along line joining masses)
- G = 6.672 × 10⁻¹¹ N⋅m²⋅kg⁻²
- Superposition: gravitational force from multiple masses add vectorially
- Outside a uniform sphere: acts as if all mass concentrated at centre

### Kepler's Laws
1. **Ellipse Law:** All planets move in ellipses with Sun at one focus
2. **Area Law:** Radius vector sweeps equal areas in equal time intervals (consequence of angular momentum conservation — gravity is a central force, so τ = 0, L = constant)
3. **Period Law:** T² ∝ R³ (R = semi-major axis); **T² = (4π²/GM_S)R³**
   - For circular orbit: T² = (4π²/GM_E)(R_E + h)³

### Acceleration Due to Gravity
- **At surface:** g = GM_E/R_E²  (g ≈ 9.8 m/s²)
- **At height h above surface:**  
  g(h) = GM_E/(R_E + h)² ≈ g(1 − 2h/R_E) for h << R_E
- **At depth d below surface:**  
  g(d) = g(1 − d/R_E) (linear decrease with depth)
- g is **maximum at the surface** and decreases both above (quadratic) and below (linear)

### Gravitational Potential Energy
- **V = −GMm/r** (negative; zero at infinity — bound systems have negative total energy)
- Near surface approximation: V = mgh (setting zero at ground)
- For a system of masses: total PE = sum of −Gm₁m₂/r for all pairs (superposition)

### Escape Speed
- Minimum launch speed for object to escape gravity (reach r → ∞ with Vf ≥ 0):
- **v_e = √(2GM_E/R_E) = √(2gR_E) ≈ 11.2 km/s**
- Moon's escape speed ≈ 2.3 km/s (reason moon has no atmosphere)

### Earth Satellites (circular orbit)
- Orbital speed: **V = √(GM_E/(R_E + h))**
  - At surface (h=0): V₀ = √(gR_E) ≈ 7.9 km/s
  - Speed decreases as height increases
- Orbital period: **T = 2π(R_E + h)^(3/2) / √(GM_E)**
- Geostationary orbit: T = 24 h → orbit at ≈36,000 km altitude

### Energy of Orbiting Satellite
- KE = GM_E⋅m / [2(R_E + h)]
- PE = −GM_E⋅m / (R_E + h)
- **Total E = −GM_E⋅m / [2(R_E + h)]** (negative — bound state)
- Key result: **E = −KE** (total energy equals negative of kinetic energy)
- Counterintuitive: when satellite moves to higher orbit, E increases (less negative), but KE decreases and speed decreases
- ΔKE = −ΔE: if energy input moves satellite to higher orbit, its KE decreases

## Entities Mentioned
None specific (Kepler, Newton, Galileo, Cavendish, Aryabhatta mentioned historically)

## Concepts Mentioned
[[concepts/gravitation]], [[concepts/work-energy-power]], [[concepts/thermodynamics]]

## Notable Quotes
> "The remarkable thing about acceleration due to earth's gravity is that it is maximum on its surface, decreasing whether you go up or down."

> "Cavendish weighed the earth" — by measuring G experimentally, enabling calculation of M_E.

## My Take
**High JEE frequency.** Escape velocity, orbital speed, and satellite energy are direct formula questions; Kepler's laws (especially Law 3) are conceptual and numerical.

**Most-asked derivations:**
1. Escape speed: energy conservation (KE = |PE|)
2. Orbital speed: centripetal force = gravitational force
3. g at height/depth: derive the approximation formulas
4. Variation of g: minimum at center? No — g(d) = g(1 − d/R_E), so g=0 at center

**Common JEE traps:**
1. Escape velocity is NOT orbital velocity × √2 (it's exactly that! v_e = √2 × v_orbital_at_surface)  
   → v_e = √(2gR_E), v_orbital = √(gR_E) → v_e = √2 × v_orbital
2. At higher orbit, satellite slows down (speed decreases) even though you give it energy
3. Total energy of satellite is always negative; if it becomes positive, satellite escapes
4. Kepler's 3rd law T² ∝ R³ requires R = semi-major axis (not just radius for circular)
5. g at depth is LINEAR (not quadratic like above surface)

**Cross-chapter connections:**
- Angular momentum conservation explains Kepler's 2nd law ([[concepts/rotational-dynamics]])
- Gravitational PE = −GMm/r bridges to general potential energy concept from Ch 5 ([[concepts/work-energy-power]])
- For JEE: note v_e = √2 × v_orbital at surface — connects orbital and escape scenarios
