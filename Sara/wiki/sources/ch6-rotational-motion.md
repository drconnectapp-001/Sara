---
type: source
tags: [physics, mechanics, rotation, angular-momentum, moment-of-inertia]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# NCERT Physics Ch 6 — Systems of Particles and Rotational Motion

**Source:** [[raw/Physics/Part-01/keph106]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary
Extends Newtonian mechanics to systems of particles and rigid bodies. Introduces centre of mass, torque, angular momentum, moment of inertia, and conservation of angular momentum — the rotational analogues of the linear mechanics concepts from chapters 4–5.

## Key Points

### Centre of Mass
- **R_cm = Σ(mᵢrᵢ)/M** (weighted average position)
- V_cm = P_total/M (total momentum = M × v_cm)
- Centre of mass moves as if all external forces act on total mass M at R_cm
- Internal forces cancel in pairs; don't affect R_cm motion

### Cross (Vector) Product
- |a × b| = ab sinθ (direction: right-hand rule / right-hand screw rule)
- **a × b = −b × a** (anti-commutative; not commutative unlike dot product)
- î × î = ĵ × ĵ = k̂ × k̂ = 0; î × ĵ = k̂; ĵ × k̂ = î; k̂ × î = ĵ
- Component form: determinant of 3×3 matrix [î ĵ k̂ / ax ay az / bx by bz]

### Torque and Angular Momentum
- **Torque:** τ = r × F (moment of force; vector)
- **Angular momentum (single particle):** l = r × p = r × mv
- |l| = mvr sinθ = mv⊥r (mv times perpendicular distance)
- **System of particles:** L = Σ(rᵢ × pᵢ)
- **Rotational Newton's 2nd Law:** dL/dt = τ_ext
- **Conservation of angular momentum:** If τ_ext = 0 → L = constant → Iω = constant

### Angular Velocity and Linear Velocity Relation
- **v = ω × r** (linear velocity of particle at r from axis)
- |v| = ωr (for rotation about fixed axis)
- ω = dθ/dt (scalar for fixed axis; vector along axis)

### Moment of Inertia (I = Σmᵢrᵢ²)
- Unit: kg⋅m²; I = Mk² where k = radius of gyration
- Depends on mass, shape, and position of axis

| Body | Axis | I |
|------|------|---|
| Ring, radius R | Perpendicular through centre | MR² |
| Ring, radius R | Diameter | MR²/2 |
| Rod, length L | Perpendicular at midpoint | ML²/12 |
| Circular disc, radius R | Perpendicular through centre | MR²/2 |
| Circular disc, radius R | Diameter | MR²/4 |
| Hollow cylinder, radius R | Axis | MR² |
| Solid cylinder, radius R | Axis | MR²/2 |
| Solid sphere, radius R | Diameter | 2MR²/5 |

### Rotational Kinematics (analogue of linear)
- ω = ω₀ + αt
- θ = θ₀ + ω₀t + ½αt²
- ω² = ω₀² + 2α(θ − θ₀)

### Rotational Dynamics
- **τ = Iα** (rotational analogue of F = ma)
- Rotational KE: **K_rot = ½Iω²**
- Total KE of rolling body: **K = ½mv²(1 + k²/R²)**
  - Pure sliding: K = ½mv²
  - Ring rolling: K = mv² (k² = R², so factor = 2)
  - Disc/cylinder rolling: K = ¾mv² (k² = R²/2, factor = 3/2)
  - Sphere rolling: K = (7/10)mv² (k² = 2R²/5, factor = 7/5)

### Mechanical Equilibrium of Rigid Body
- Translational: ΣF = 0
- Rotational: Στ = 0 (about any point, if translational equilibrium holds)

### Conservation of Angular Momentum — Applications
- Spinning skater pulls arms in → I decreases → ω increases (Iω = constant)
- Diver tucks into ball → I decreases → faster rotation
- Kepler's 2nd law: equal areas in equal time ↔ angular momentum conserved (central force → zero torque)

## Entities Mentioned
None specific

## Concepts Mentioned
[[concepts/rotational-dynamics]], [[concepts/laws-of-motion]]

## Notable Quotes
> "As the mass of a body resists a change in its state of linear motion, the moment of inertia resists a change in its rotational motion."

## My Take
**High JEE frequency.** Second-most demanded mechanics chapter after Laws of Motion.

**Must-master items:**
1. Moment of inertia table — memorise the 8 standard results; they appear directly in problems
2. Parallel axis theorem: I = I_cm + Md² (not directly in this chapter but critical)
3. Rolling without slipping condition: v = Rω; derives acceleration on incline
4. Conservation of angular momentum: Iω = I'ω' (skater/diver problems always appear)
5. τ = Iα problems (like F = ma problems but for rotation)

**Common JEE traps:**
1. Using I = MR² for solid disc (it's MR²/2)
2. Forgetting rotational KE when body rolls (must add ½Iω² to ½mv²)
3. Torque can be zero about one point but non-zero about another (unless ΣF = 0 too)
4. Cross product direction: always use right-hand rule carefully; sign errors are common

**Cross-chapter connection:** This is the rotational analogue of every concept in Ch 4–5. Angular momentum conservation explains Kepler's 2nd law (Ch 7 Gravitation). The moment of inertia integrals connect to Math Ch 13 integration.
