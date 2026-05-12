---
type: source
tags: [physics, mechanical-properties, elasticity, stress-strain, young-modulus]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Mechanical Properties of Solids

**Source:** [[raw/Physics/Part-02/keph201]] | **Date ingested:** 2026-05-12 | **Type:** book-chapter

## Summary

Chapter 8 studies how solid bodies deform under applied forces — the science of elasticity and plasticity. It introduces stress, strain, Hooke's Law, and three elastic moduli (Young's, Bulk, and Shear modulus). The chapter connects macroscopic deformation to the intermolecular forces that restore a body to its original shape, and discusses practical applications in engineering design.

## Key Points

- **Elasticity:** tendency to regain original shape/size when deforming force is removed (steel > rubber in true elasticity!)
- **Plasticity:** permanent deformation (putty, mud)
- **Stress = F/A** (restoring force per unit area); SI unit: N/m² = Pascal (Pa); dimensions [ML⁻¹T⁻²]
- **Types of stress:** longitudinal (tensile/compressive), shearing (tangential), hydraulic (equal from all directions)
- **Strain (dimensionless):** Longitudinal = ΔL/L; Shearing = Δx/L (= tan φ ≈ φ for small angles); Volumetric = ΔV/V
- **Hooke's Law:** stress ∝ strain (within elastic limit); stress/strain = elastic modulus (constant for a material)
- **Young's Modulus (Y):** Y = (F/A)/(ΔL/L) = FL/AΔL; applies to longitudinal stress; measured in Pa; Steel ≈ 2×10¹¹ Pa
- **Bulk Modulus (B):** B = –p/(ΔV/V); negative sign because volume decreases under pressure; compressibility K = 1/B
- **Shear Modulus / Modulus of Rigidity (G):** G = (F/A)/(Δx/L); solids only (fluids have G = 0)
- **Stress-strain curve:** elastic limit → yield point → ultimate tensile strength → fracture point
- **Elastic potential energy stored in a stretched wire:** U = ½ × stress × strain × volume = F²L/(2AY)
- **Poisson's ratio (σ):** σ = lateral strain/longitudinal strain; –1 < σ ≤ 0.5 for real materials
- **Ductile vs Brittle:** ductile materials show large plastic deformation before fracture (steel); brittle fracture without much plastic deformation (cast iron, glass)
- **I-shaped girders:** efficient use of material — web carries shear, flanges carry bending stress

## Entities Mentioned

No specific entities.

## Concepts Mentioned

[[concepts/mechanical-properties]] — full treatment of elastic properties

## Notable Quotes

> "The restoring force per unit area is known as stress."

> "Note that the property of a body, by virtue of which it tends to regain its original size and shape when the applied force is removed, is known as elasticity."

## My Take

**JEE Frequency: Medium.** Mechanical Properties of Solids contributes 1 question per JEE paper, usually numerical involving Young's modulus or energy stored.

**Most-asked topics:**
1. Young's modulus calculation: Y = FL/AΔL — plug-and-play numericals
2. Energy stored in stretched wire: U = ½ × stress × strain × volume = Y(strain)²V/2
3. Comparison questions: which wire stretches more? (same force, different L/A/Y)
4. Compressibility = 1/Bulk modulus
5. Stress-strain curve reading: identifying elastic limit, yield point, ductile vs brittle behaviour

**Common traps:**
- Steel is MORE elastic than rubber (returns to original shape better) — counterintuitive but examined
- Y for rubber << Y for steel; rubber stretches more for same stress but is NOT more elastic
- Shear modulus ONLY exists for solids, not liquids/gases
- When two wires of different materials are stretched by the same force: compare Y not just material

**Cross-connections:** Elastic PE formula connects to [[concepts/work-energy-power]]; bulk modulus connects to [[concepts/kinetic-theory]] (bulk modulus of ideal gas = P for isothermal, γP for adiabatic).
