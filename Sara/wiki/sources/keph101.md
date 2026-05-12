---
type: source
tags: [physics, units-measurement, dimensions, significant-figures]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Units and Measurement

**Source:** [[raw/Physics/Part-01/keph101]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 1 of NCERT Physics Part 1 establishes the foundation of measurement in physics — the SI system, significant figures, and dimensional analysis. The SI system defines 7 base units (metre, kilogram, second, ampere, kelvin, mole, candela) from which all derived units are built. Dimensional analysis is the systematic tool for checking equations, converting units, and deriving relationships between physical quantities.

## Key Points

- **SI Base Units (7):** length (m), mass (kg), time (s), current (A), temperature (K), amount (mol), luminous intensity (cd)
- **Supplementary units:** radian (rad) for plane angle; steradian (sr) for solid angle — both dimensionless
- **Significant figures rules:** all non-zero digits significant; zeros between non-zeros significant; trailing zeros after decimal significant; trailing zeros without decimal NOT significant
- **Arithmetic with sig figs:** multiplication/division → retain fewest sig figs; addition/subtraction → retain fewest decimal places
- **Rounding:** if digit dropped > 5, raise preceding digit; if < 5, leave unchanged; if = 5, round to even (banker's rounding)
- **Dimensions of quantities:** 7 fundamental dimensions [M], [L], [T], [A], [K], [mol], [cd]
- **Dimensional formula examples:** Force = [MLT⁻²]; Energy = [ML²T⁻²]; Pressure = [ML⁻¹T⁻²]
- **Principle of homogeneity:** both sides of any valid physical equation must have identical dimensions
- **Applications of dimensional analysis:** (1) checking correctness of equations; (2) deriving equations from known dependencies; (3) converting between unit systems
- **Limitations of dimensional analysis:** cannot determine dimensionless constants; fails when multiple quantities have same dimensions; cannot handle exponential/trigonometric functions
- **Order of magnitude:** express as a × 10^b, where 1 ≤ a ≤ 10; the exponent b is the order of magnitude
- **Error analysis:** absolute error, relative error, percentage error; errors add in addition/subtraction; relative errors add in multiplication/division

## Entities Mentioned

No specific entities — foundational chapter on measurement systems.

## Concepts Mentioned

[[concepts/kinematics]] — dimensional analysis underpins all kinematic equations

## Notable Quotes

> "A choice of change of different units does not change the number of significant digits or figures in a measurement."

> "In any involved or complex multi-step calculation, you should retain, in intermediate steps, one digit more than the significant digits and round off to proper significant figures at the end."

## My Take

**JEE Frequency: Medium.** Units and Measurement is a guaranteed 1–2 question chapter in every JEE attempt, often testing:

1. **Dimensional analysis** — deriving or checking formulas; finding dimensions of unfamiliar quantities (viscosity, surface tension, Planck's constant)
2. **Significant figures** — a common MCQ type where you compute and express in correct sig figs
3. **Error propagation** — "percentage error in Z = aX^m × Y^n" type questions

**Most-asked derivations/concepts:**
- Dimensions of physical constants: [h] = [ML²T⁻¹]; [G] = [M⁻¹L³T⁻²]; [ε₀] = [M⁻¹L⁻³T⁴A²]
- Using dimensional analysis to find n-th power dependences (e.g. time period of pendulum depends on l, g, m)
- Percentage error in compound quantities

**Common traps:**
- Forgetting that dimensionless constants (like 2, π) cannot be found by dimensional analysis
- Confusing significant figures in mixed operations (switch rules between + and ×)
- Trailing zeros: 1500 has 2 sig figs; 1500. has 4 sig figs; 1.500 × 10³ has 4 sig figs

**Cross-connections:** Dimensional analysis applies everywhere — verify formulas in [[concepts/kinematics]], [[concepts/work-energy-power]], [[concepts/gravitation]], [[concepts/laws-of-motion]] without memorising each formula.
