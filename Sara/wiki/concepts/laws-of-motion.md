---
type: concept
tags: [physics, mechanics, newton, friction, momentum]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Laws of Motion

## Definition
Newton's three laws of motion describe how forces affect the motion of objects: inertia (no force → no acceleration), F = ma (net force causes acceleration proportional to mass), and action-reaction pairs (all forces come in equal-opposite pairs on different bodies).

## Why It Matters
Every mechanics problem in JEE begins here. FBD + Newton's Laws is the universal problem-solving template for dynamics. Friction, circular motion, and connected-body systems are all applications of these three laws.

## Core Laws and Formulas

### Newton's First Law
- If ΣF = 0 → a = 0 (rest or constant velocity)
- Inertia: tendency to resist change in state

### Newton's Second Law
- **F = dp/dt = ma** (net external force on a system)
- Only external forces count; internal forces cancel in pairs
- 1 N = 1 kg⋅m/s²

### Newton's Third Law
- F_AB = −F_BA (simultaneous, different bodies)
- Action-reaction pairs NEVER cancel in F = ma (they act on different bodies)

### Impulse-Momentum
- **J = F⋅Δt = Δp** (useful for short-time large-force events)

### Conservation of Momentum
- Isolated system: **Σp = constant**
- Follows from Newton's 2nd + 3rd laws
- True regardless of collision type (elastic/inelastic)

### Friction Laws
| Type | Formula | Notes |
|------|---------|-------|
| Static | fs ≤ μsN | Self-adjusting; opposes impending motion |
| Static max | (fs)_max = μsN | Only when block is about to slide |
| Kinetic | fk = μkN | Constant; μk < μs always |
| Rolling | << fk | Much smaller; why wheels matter |

- Independent of area of contact
- On incline at limiting angle: **μs = tan θmax**

### Circular Motion
- Centripetal force: **fc = mv²/R** (always toward centre; provided by real forces)
- Level road: **v_max = √(μsRg)**
- Banked road (no friction): **v₀ = √(Rg tanθ)** (optimum speed)
- Banked road (with friction): **v_max = √[Rg(tanθ + μs)/(1 − μs tanθ)]**

## FBD Problem-Solving Template
1. Identify system boundary
2. List all external forces (weight, normal, friction, tension, applied)
3. Write F = ma for each direction
4. Use Newton's 3rd Law to link forces between subsystems
5. Solve simultaneously

## Related Concepts
[[concepts/work-energy-power]] — work done by forces → energy perspective on same problems
[[concepts/kinematics]] — motion described; here motion *caused* by forces
[[concepts/rotational-dynamics]] — angular analogue: τ = Iα parallels F = ma

## Evidence & Examples
- Atwood machine: heavier side accelerates; a = (m₁−m₂)g/(m₁+m₂)
- Lift problems: apparent weight = m(g+a) going up, m(g−a) going down, 0 in free fall
- Banked road: v₀ = √(Rg tanθ) ≈ 28 m/s for R=300m, θ=15° (worked in ch4)
- Friction on incline: block just slides when θ = tan⁻¹(μs)

## Open Questions
- How does friction extend to rotational motion (rolling without slipping)?
- What determines μs and μk microscopically? (beyond JEE scope but conceptually useful)

## Sources
[[sources/ch4-laws-of-motion]]
