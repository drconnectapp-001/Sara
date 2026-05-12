---
type: concept
tags: [physics, gravitation, orbital-mechanics, kepler, satellites]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Gravitation

## Definition
Gravitation is the universal attractive force between masses, described by Newton's law F = GMm/r². It governs planetary orbits, satellite motion, tides, and the weight of objects on Earth.

## Why It Matters
Gravitation integrates energy conservation, angular momentum conservation, and circular motion into a single topic. Kepler's laws, escape velocity, and satellite energy are direct JEE targets. Conceptually bridges to Chemistry (atomic model uses similar inverse-square orbit concept).

## Core Formulas

### Newton's Law
- **F = GMm/r²**; G = 6.672 × 10⁻¹¹ N⋅m²⋅kg⁻²

### Kepler's Laws
| Law | Statement | Formula |
|-----|-----------|---------|
| 1st (Ellipse) | Planets move in ellipses, Sun at focus | — |
| 2nd (Area) | Equal areas in equal times | dA/dt = L/2m = constant |
| 3rd (Period) | T² ∝ R³ | T² = (4π²/GM_S)R³ |

### Acceleration Due to Gravity

| Location | Formula |
|---------|---------|
| Surface | g = GM_E/R_E² |
| Height h (h << R_E) | g(h) ≈ g(1 − 2h/R_E) |
| Depth d | g(d) = g(1 − d/R_E) |
| Centre of Earth | g = 0 |

### Gravitational PE
- **V = −GMm/r** (zero at infinity; always negative for bound system)
- Near surface: V = mgh (approximation)

### Escape Speed
- **v_e = √(2GM_E/R_E) = √(2gR_E) ≈ 11.2 km/s**

### Satellite Orbital Mechanics

| Quantity | Formula |
|---------|---------|
| Orbital speed | V = √[GM_E/(R_E+h)] |
| Orbital period | T = 2π(R_E+h)^(3/2) / √(GM_E) |
| KE | +GM_Em/[2(R_E+h)] |
| PE | −GM_Em/(R_E+h) |
| Total E | −GM_Em/[2(R_E+h)] |

**Key identity:** v_e = √2 × v_orbital (at Earth's surface)

**Counterintuitive:** Higher orbit = less KE (satellite slows down when boosted to higher orbit)

## Related Concepts
[[concepts/work-energy-power]] — gravitational PE is conservative; orbital energy = K + V
[[concepts/rotational-dynamics]] — Kepler's 2nd law is angular momentum conservation
[[concepts/thermodynamics]] — total orbital energy analogy (negative bound-state energy)

## Evidence & Examples
- Moon's escape speed ≈ 2.3 km/s → no atmosphere (gas molecules exceed this speed)
- Geostationary orbit: T = 24 h → altitude ≈ 36,000 km
- "Cavendish weighed the earth": measuring G → finding M_E from g = GM_E/R_E²
- g at depth: linear decrease → zero at center (unlike above surface where it's quadratic decrease)

## Open Questions
- How does general relativity modify Newtonian gravitation? (beyond JEE but conceptually relevant for black holes)
- Why does g at depth go to zero at center while intuition says it should be huge?

## Sources
[[sources/ch7-gravitation]]
