---
type: source
tags: [physics, mechanics, newton, friction, momentum]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# NCERT Physics Ch 4 — Laws of Motion

**Source:** [[raw/Physics/Part-01/keph104]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary
Newton's three laws of motion form the foundation of classical mechanics. The chapter builds from Galileo's law of inertia to momentum conservation, covering friction laws, equilibrium, and circular motion — all essential for solving problems using free-body diagrams (FBDs).

## Key Points

### Newton's First Law (Law of Inertia)
- Every body stays at rest or in uniform linear motion unless compelled by an external force
- Equivalent form: **If net external force = 0, then acceleration = 0**
- Inertia = resistance to change in state of motion

### Newton's Second Law
- Momentum: **p = mv** (vector)
- F = dp/dt = ma (for constant mass)
- 1 Newton = 1 kg⋅m⋅s⁻² (SI unit of force)
- Vector law — 3 component equations (x, y, z)
- F at an instant determines a at that instant (local law — no memory of past motion)

### Impulse
- Impulse = F⋅Δt = Δp (change in momentum)
- Useful when large force acts for short time (ball hitting bat, bullet entering block)

### Newton's Third Law
- Forces always occur in pairs: **F_AB = −F_BA**
- Action and reaction are simultaneous (no cause-effect), act on **different** bodies
- Cannot cancel each other (they act on different objects)
- Internal forces in a system cancel in pairs → why second law applies to systems

### Conservation of Momentum
- Isolated system: total momentum conserved
- Follows directly from Second + Third Law
- True for elastic AND inelastic collisions
- Gun recoil: p_bullet + p_gun = 0

### Equilibrium of a Particle
- Net force = 0: ΣFx = ΣFy = ΣFz = 0
- Two forces: must be equal and opposite
- Three concurrent forces: represented as closed triangle

### Friction
- **Static friction (fs)**: opposes *impending* relative motion; self-adjusting up to maximum
  - (fs)_max = μs⋅N; general law: **fs ≤ μs⋅N**
  - Angle of friction: tan θmax = μs (angle at which block just starts to slide on incline)
- **Kinetic friction (fk)**: opposes actual relative motion; nearly independent of velocity
  - **fk = μk⋅N**
  - μk < μs always (less force to keep sliding than to start it)
- Rolling friction << sliding friction (reason wheels revolutionized history)
- Friction is independent of area of contact — empirical laws, not fundamental

### Circular Motion
- Centripetal force: **fc = mv²/R** (directed toward centre; not a new type of force — provided by tension, gravity, friction etc.)
- Level road turning: **v_max = √(μs⋅R⋅g)** (static friction provides centripetal force)
- Banked road (angle θ, no friction): **v₀ = √(Rg tanθ)** — optimum speed, no tyre wear
- Banked road (with friction): **v_max = √[Rg(tanθ + μs)/(1 − μs tanθ)]**

### Free-Body Diagram Method
1. Draw all bodies and connections
2. Choose system (one or more bodies)
3. Draw FBD — show only external forces on chosen system
4. Apply F = ma in component form
5. Use Third Law for forces between subsystems

## Entities Mentioned
None specific (scientists Galileo, Newton, Aristotle are historical context)

## Concepts Mentioned
[[concepts/laws-of-motion]], [[concepts/chemical-equilibrium]] (analogy only)

## Notable Quotes
> "Forces always occur in pairs. Force on a body A by B is equal and opposite to the force on the body B by A."

> "A force is necessary in practice to counter the opposing force of friction." (correcting Aristotle's error)

## My Take
**Highest JEE-frequency chapter in mechanics.** Almost every dynamics problem in JEE uses Newton's Laws + FBD.

**Must-master derivations:**
- Atwood machine and pulley systems using FBD + Newton's 2nd law
- Banked road v_max formula (derivation asked directly)
- Friction on incline: equilibrium gives μs = tan θ
- Lift problems: apparent weight = m(g ± a)

**Common JEE traps:**
1. Confusing action-reaction pairs — they act on *different* bodies; don't cancel in F=ma
2. Writing fs = μsN when friction hasn't reached its limit (it's fs ≤ μsN)
3. Centripetal force is not a separate force — always identify *what* provides it
4. For banked road, the optimum speed v₀ = √(Rg tanθ) is commonly asked as a formula-derive question

**Connections to other topics:** Momentum conservation (covered here) is revisited in collisions (Ch 5), rotational analogue is angular momentum (Ch 6). Friction bridges to circular motion (turning on roads). This chapter is the prerequisite for every subsequent mechanics chapter.
