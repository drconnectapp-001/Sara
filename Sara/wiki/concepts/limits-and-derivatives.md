---
type: concept
tags: [mathematics, calculus, limits, derivatives, differentiation]
created: 2026-05-12
updated: 2026-05-12
sources: 1
---

# Limits and Derivatives

## Definition

A limit describes the value a function approaches as its input approaches a point. The derivative f'(x) is the limit of the difference quotient [f(x+h)–f(x)]/h as h→0 — the instantaneous rate of change and the slope of the tangent line to the curve at that point.

## Why It Matters

Calculus (limits + derivatives + integration) is the most heavily tested Math area in JEE — 5–8 questions per paper across all papers. Class 11 introduces limits and differentiation; Class 12 adds chain rule, implicit differentiation, applications (maxima/minima), and integration. This concept page covers the Class 11 foundation.

## Related Concepts

[[concepts/kinematics]] — velocity = dx/dt; acceleration = dv/dt — derivatives are physics
[[concepts/sequences-and-series]] — lim(n→∞) Σ f(k/n)·(1/n) = ∫f(x)dx (Riemann sum)
[[concepts/trigonometric-functions]] — d/dx(sinx) = cosx; lim(x→0) sinx/x = 1

## Evidence & Examples

**Standard Limits (MUST KNOW):**
- lim(x→a) (xⁿ–aⁿ)/(x–a) = naⁿ⁻¹
- lim(x→0) sinx/x = 1 (x in radians)
- lim(x→0) tanx/x = 1
- lim(x→0) (1–cosx)/x² = 1/2
- lim(x→∞) (1+1/n)ⁿ = e

**Standard Derivatives:**
| f(x) | f'(x) |
|------|-------|
| xⁿ | nxⁿ⁻¹ |
| sin x | cos x |
| cos x | –sin x |
| tan x | sec²x |
| cot x | –cosec²x |
| sec x | sec x tan x |
| cosec x | –cosec x cot x |
| constant | 0 |

**Rules:**
- Sum: (f±g)' = f'±g'
- Product: (fg)' = f'g + fg'
- Quotient: (f/g)' = (f'g–fg')/g²
- Chain rule [Class 12]: d/dx[f(g(x))] = f'(g(x))·g'(x)

**From First Principles (definition):**
- f'(x) = lim(h→0) [f(x+h)–f(x)]/h
- Derive d/dx(xⁿ) = nxⁿ⁻¹ using this definition and binomial theorem

## Open Questions

- How does integration (anti-derivative) relate to limits via the Fundamental Theorem of Calculus? [Class 12]
- When does a limit exist but the derivative not (discontinuity vs non-differentiability)?

## Sources

[[sources/kemh113]] — Limits and Derivatives (NCERT Class 11 Math)
