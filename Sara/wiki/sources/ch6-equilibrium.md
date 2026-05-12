---
type: source
tags: [chemistry, cbse, class-11, equilibrium, acid-base, ionic-equilibrium, le-chatelier]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Chapter 6: Equilibrium

**Source:** [[raw/Chemistry/Part-01/kech106.md]] | **Date ingested:** 2026-05-12 | **Type:** textbook-chapter (NCERT Class 11 Chemistry Part 1)

## Summary
The largest chapter — covers chemical equilibrium (Kc, Kp, Le Chatelier's principle), followed by ionic equilibrium (acids/bases, pH, Ka, Kb, buffers, solubility product). The two halves are unified by the concept of dynamic equilibrium and equilibrium constants.

## Key Points

### Chemical Equilibrium
- **Dynamic equilibrium:** forward and reverse reactions occur simultaneously at equal rates; concentrations remain constant (not zero)
- **Physical equilibria:** liquid⇌vapour, solid⇌liquid, solid⇌solution, gas⇌liquid — all follow same principle
- **Henry's Law:** at constant T, solubility of gas ∝ partial pressure of gas above solution
- **Law of Mass Action / Law of Chemical Equilibrium:**
  - For aA + bB ⇌ cC + dD: **Kc = [C]c[D]d / [A]a[B]b**
  - Kc depends only on temperature (not on initial concentrations)
- **Kp:** equilibrium constant in terms of partial pressures; **Kp = Kc(RT)^Δng** where Δng = moles gaseous products – moles gaseous reactants
- **Relationship between Kc values:**
  - If equation reversed: K' = 1/Kc
  - If equation multiplied by n: K'' = Kc^n
  - If two equations added: Knet = K₁ × K₂
- **Heterogeneous equilibrium:** pure solids and pure liquids excluded from Kc expression (constant concentration)
  - CaCO₃(s) ⇌ CaO(s) + CO₂(g): Kc = [CO₂]; Kp = pCO₂
- **Significance of Kc magnitude:**
  - Kc >> 1 (>10³): reaction nearly complete, products favoured
  - Kc << 1 (<10⁻³): reaction barely occurs, reactants favoured
  - 10⁻³ < Kc < 10³: significant concentrations of both
- **Reaction Quotient (Qc):** same expression as Kc but using non-equilibrium concentrations
  - Qc < Kc: reaction moves forward (→)
  - Qc > Kc: reaction moves backward (←)
  - Qc = Kc: at equilibrium
- **ΔG⊖ = –RT ln K** (bridges thermodynamics and equilibrium)

### Le Chatelier's Principle
> "When a system at equilibrium is disturbed, it shifts to oppose the disturbance and establish a new equilibrium."

- **Concentration change:** adding reactant → shifts forward; removing product → shifts forward; adding product → shifts backward
- **Pressure/volume change:** decrease volume (increase pressure) → shifts toward fewer moles of gas; increase volume → shifts toward more moles of gas; no effect if Δng = 0
- **Temperature change:**
  - Exothermic reaction: increasing T shifts backward (decreases Kc); decreasing T shifts forward (increases Kc)
  - Endothermic reaction: increasing T shifts forward (increases Kc)
- **Catalyst:** increases rate of both forward and reverse equally; equilibrium reached faster; does NOT shift equilibrium or change Kc
- **Inert gas addition at constant volume:** no effect (concentrations unchanged)
- **Industrial applications:**
  - Haber process (N₂+3H₂⇌2NH₃): optimum ~500°C, 200 atm, Fe catalyst — compromise between rate (high T) and yield (low T, exothermic)
  - Contact process (2SO₂+O₂⇌2SO₃): Pt or V₂O₅ catalyst

### Ionic Equilibrium

**Electrolytes and Ionization:**
- Strong electrolytes: complete ionization (NaCl, HCl, H₂SO₄, NaOH)
- Weak electrolytes: partial ionization; equilibrium between ions and molecules

**Acid-Base Theories:**
- **Arrhenius:** acid gives H⁺ in water; base gives OH⁻ (limited to aqueous)
- **Brønsted-Lowry:** acid = proton donor; base = proton acceptor; conjugate acid-base pairs (NH₃ + H₂O ⇌ NH₄⁺ + OH⁻)
- **Lewis:** acid = electron pair acceptor; base = electron pair donor (broadest definition; includes BF₃, metal ions)

**Water Ionization:**
- H₂O ⇌ H⁺ + OH⁻; Kw = [H⁺][OH⁻] = 10⁻¹⁴ at 25°C (pKw = 14)
- Neutral: [H⁺] = [OH⁻] = 10⁻⁷ M; Acidic: [H⁺] > 10⁻⁷; Basic: [H⁺] < 10⁻⁷

**pH:** pH = –log[H⁺]; pOH = –log[OH⁻]; pH + pOH = 14

**Weak Acid Ionization:**
- HA ⇌ H⁺ + A⁻; Ka = [H⁺][A⁻]/[HA]
- Degree of ionization: α = √(Ka/c) (for dilute solutions, α << 1)
- [H⁺] = √(Ka × c); pH = ½(pKa – log c)
- pKa = –log Ka; stronger acid has larger Ka, smaller pKa

**Weak Base Ionization:**
- BOH ⇌ B⁺ + OH⁻; Kb = [B⁺][OH⁻]/[BOH]
- pKw = pKa + pKb (for conjugate acid-base pair at 25°C)
- Strong acid has very weak conjugate base (and vice versa)

**Polyprotic Acids:** H₂X has Ka1 >> Ka2 >> Ka3 (successive ionizations much weaker)

**Common Ion Effect:** addition of common ion suppresses ionization; shifts equilibrium back

**Buffer Solutions:**
- **Resist change in pH** on dilution or addition of small amounts of acid/alkali
- Acidic buffer: weak acid + its salt (e.g., CH₃COOH + CH₃COONa, effective around pH 4.75)
- Basic buffer: weak base + its salt (e.g., NH₄OH + NH₄Cl, effective around pH 9.25)
- **Henderson-Hasselbalch equation:**
  - pH = pKa + log([A⁻]/[HA]) (acid buffer)
  - pOH = pKb + log([BH⁺]/[B]) (base buffer)

**Salt Hydrolysis:**
- Salt of strong acid + weak base: acidic solution (NH₄Cl: pH < 7)
- Salt of weak acid + strong base: basic solution (CH₃COONa: pH > 7)
- Salt of weak acid + weak base: depends on Ka vs Kb (CH₃COONH₄: nearly neutral if Ka ≈ Kb)
- Salt of strong acid + strong base: neutral (NaCl: pH = 7)

**Solubility Product (Ksp):**
- For sparingly soluble salt MₓNᵧ ⇌ xM^n+ + yN^m–: Ksp = [M^n+]^x [N^m–]^y
- Precipitation occurs when ionic product > Ksp
- Common ion effect reduces solubility (e.g., AgCl less soluble in NaCl solution)
- Solubility categories: soluble (>0.1M), slightly soluble (0.01–0.1M), sparingly soluble (<0.01M)

## Entities Mentioned
Le Chatelier, Arrhenius, Brønsted, Lowry, G.N. Lewis, Haber, Henderson, Hasselbalch

## Concepts Mentioned
[[concepts/chemical-equilibrium]], [[concepts/acid-base-chemistry]], [[concepts/le-chatelier-principle]], [[concepts/gibbs-energy-and-equilibrium]], [[concepts/mole-concept]]

## Notable Quotes
> "When the concentration of any of the reactants or products in a reaction at equilibrium is changed, the composition of the equilibrium mixture changes so as to minimize the effect of concentration changes." — Le Chatelier's Principle

> "The stronger acid donates a proton to the stronger base."

## My Take
This is the longest chapter and arguably the most numerically demanding. Equilibrium constant expressions (Kc, Kp, their relationship) are direct calculation questions. Le Chatelier reasoning applies to Haber process — a classic application question. In ionic equilibrium: pH calculations for weak acid/base (using α = √Ka/c), buffer pH via Henderson-Hasselbalch, and Ksp-based precipitation questions are all JEE staples. Common ion effect links directly to Ksp and buffer theory — it's the same principle applied differently.
