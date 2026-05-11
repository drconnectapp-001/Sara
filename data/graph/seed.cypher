// Sara JEE Companion — Neo4j Knowledge Graph Seed
// Covers 11th grade Physics (full), Chemistry + Math (structure ready for expansion)
// Run via: docker compose exec api python -m app.db.seed_graph

// ── Constraints & Indexes ─────────────────────────────────────────────────────

CREATE CONSTRAINT concept_id IF NOT EXISTS FOR (c:Concept) REQUIRE c.id IS UNIQUE;
CREATE CONSTRAINT problem_id IF NOT EXISTS FOR (p:Problem) REQUIRE p.id IS UNIQUE;
CREATE CONSTRAINT chapter_id IF NOT EXISTS FOR (ch:Chapter) REQUIRE ch.id IS UNIQUE;
CREATE INDEX concept_name IF NOT EXISTS FOR (c:Concept) ON (c.name);

// ── Subjects ─────────────────────────────────────────────────────────────────

MERGE (physics:Subject {id: 'physics', name: 'Physics'});
MERGE (chemistry:Subject {id: 'chemistry', name: 'Chemistry'});
MERGE (mathematics:Subject {id: 'mathematics', name: 'Mathematics'});

// ── Sara Node (personal graph anchor) ────────────────────────────────────────

MERGE (sara:Sara {id: 'sara', name: 'Sara'});

// ═══════════════════════════════════════════════════════════════════════════════
// PHYSICS — 11th Grade
// ═══════════════════════════════════════════════════════════════════════════════

// ── Chapter: Kinematics ───────────────────────────────────────────────────────

MERGE (kinematics:Chapter {id: 'phy11-02', name: 'Kinematics', class_level: 11, jee_weightage_pct: 7.0})
MERGE (kinematics)-[:IN_SUBJECT]->(:Subject {id: 'physics'});

MERGE (displacement:Topic {id: 'kin-t1', name: 'Displacement, Velocity & Acceleration'})
MERGE (displacement)-[:IN_CHAPTER]->(kinematics);

MERGE (c1:Concept {id: 'kin-c1', name: 'Uniform Acceleration', subject: 'Physics',
  description: 'Motion with constant acceleration. Equations of motion: v=u+at, s=ut+½at², v²=u²+2as',
  difficulty: 'easy'})
MERGE (c1)-[:IN_TOPIC]->(displacement);

MERGE (c2:Concept {id: 'kin-c2', name: 'Projectile Motion', subject: 'Physics',
  description: 'Two-dimensional motion under gravity. Horizontal: uniform, Vertical: uniformly accelerated.',
  difficulty: 'medium'})
MERGE (c2)-[:IN_TOPIC]->(displacement);

MERGE (c3:Concept {id: 'kin-c3', name: 'Relative Motion', subject: 'Physics',
  description: 'Motion described relative to a reference frame. V_AB = V_A - V_B',
  difficulty: 'medium'})
MERGE (c3)-[:IN_TOPIC]->(displacement);

MERGE (c2)-[:REQUIRES]->(c1);
MERGE (c2)-[:REQUIRES]->(:Concept {id: 'trig-c1', name: 'Trigonometry'});

// Formulas
MERGE (f1:Formula {id: 'kin-f1', plain_text: 'v = u + at', latex: 'v = u + at'})
MERGE (f1)-[:DEFINES]->(c1);
MERGE (f2:Formula {id: 'kin-f2', plain_text: 's = ut + (1/2)at²', latex: 's = ut + \\frac{1}{2}at^2'})
MERGE (f2)-[:DEFINES]->(c1);
MERGE (f3:Formula {id: 'kin-f3', plain_text: 'Range R = u²sin(2θ)/g', latex: 'R = \\frac{u^2 \\sin 2\\theta}{g}'})
MERGE (f3)-[:DEFINES]->(c2);

// ── Chapter: Laws of Motion ───────────────────────────────────────────────────

MERGE (laws:Chapter {id: 'phy11-03', name: 'Laws of Motion', class_level: 11, jee_weightage_pct: 8.0})
MERGE (laws)-[:IN_SUBJECT]->(:Subject {id: 'physics'});

MERGE (t_newton:Topic {id: 'laws-t1', name: 'Newton\'s Laws'})
MERGE (t_newton)-[:IN_CHAPTER]->(laws);

MERGE (c4:Concept {id: 'laws-c1', name: 'Newton\'s First Law', subject: 'Physics',
  description: 'An object remains in its state of rest or uniform motion unless acted on by a net external force.',
  difficulty: 'easy'})
MERGE (c4)-[:IN_TOPIC]->(t_newton);

MERGE (c5:Concept {id: 'laws-c2', name: 'Newton\'s Second Law', subject: 'Physics',
  description: 'F = ma. The net force on an object equals mass times acceleration. Foundation of all mechanics problems.',
  difficulty: 'easy'})
MERGE (c5)-[:IN_TOPIC]->(t_newton);

MERGE (c6:Concept {id: 'laws-c3', name: 'Newton\'s Third Law', subject: 'Physics',
  description: 'Every action has an equal and opposite reaction. Forces always act in pairs on different objects.',
  difficulty: 'easy'})
MERGE (c6)-[:IN_TOPIC]->(t_newton);

MERGE (c7:Concept {id: 'laws-c4', name: 'Free Body Diagram', subject: 'Physics',
  description: 'Isolate the object, identify all forces acting ON it. Critical technique for all mechanics problems.',
  difficulty: 'medium'})
MERGE (c7)-[:IN_TOPIC]->(t_newton);

MERGE (c8:Concept {id: 'laws-c5', name: 'Friction', subject: 'Physics',
  description: 'Static friction: f_s ≤ μ_s N. Kinetic friction: f_k = μ_k N. Static > Kinetic always.',
  difficulty: 'medium'})
MERGE (c8)-[:IN_TOPIC]->(t_newton);

MERGE (c5)-[:REQUIRES]->(c4);
MERGE (c7)-[:REQUIRES]->(c5);
MERGE (c8)-[:APPEARS_WITH]->(c7);

MERGE (f4:Formula {id: 'laws-f1', plain_text: 'F = ma', latex: 'F = ma'})
MERGE (f4)-[:DEFINES]->(c5);
MERGE (f5:Formula {id: 'laws-f2', plain_text: 'f_k = μ_k × N', latex: 'f_k = \\mu_k N'})
MERGE (f5)-[:DEFINES]->(c8);

// ── Chapter: Rotational Motion ────────────────────────────────────────────────

MERGE (rotation:Chapter {id: 'phy11-05', name: 'Rotational Motion', class_level: 11, jee_weightage_pct: 7.0})
MERGE (rotation)-[:IN_SUBJECT]->(:Subject {id: 'physics'});

MERGE (t_rot:Topic {id: 'rot-t1', name: 'Angular Kinematics & Dynamics'})
MERGE (t_rot)-[:IN_CHAPTER]->(rotation);

MERGE (c9:Concept {id: 'rot-c1', name: 'Moment of Inertia', subject: 'Physics',
  description: 'Rotational analogue of mass. I = Σmr². Depends on mass distribution relative to axis.',
  difficulty: 'medium'})
MERGE (c9)-[:IN_TOPIC]->(t_rot);

MERGE (c10:Concept {id: 'rot-c2', name: 'Torque', subject: 'Physics',
  description: 'τ = r × F = rF sinθ. Rotational equivalent of force. Axis of rotation matters.',
  difficulty: 'medium'})
MERGE (c10)-[:IN_TOPIC]->(t_rot);

MERGE (c11:Concept {id: 'rot-c3', name: 'Angular Momentum', subject: 'Physics',
  description: 'L = Iω = mvr (for point mass). Conserved when net external torque = 0.',
  difficulty: 'hard'})
MERGE (c11)-[:IN_TOPIC]->(t_rot);

MERGE (c12:Concept {id: 'rot-c4', name: 'Rolling Motion', subject: 'Physics',
  description: 'Combination of translation and rotation. v_cm = Rω for pure rolling.',
  difficulty: 'hard'})
MERGE (c12)-[:IN_TOPIC]->(t_rot);

// Rotational motion requires Newton's Laws (foundational)
MERGE (c9)-[:REQUIRES]->(c5);
MERGE (c10)-[:REQUIRES]->(c5);
MERGE (c11)-[:REQUIRES]->(c10);
MERGE (c11)-[:REQUIRES]->(c9);
MERGE (c12)-[:REQUIRES]->(c9);
MERGE (c12)-[:REQUIRES]->(c11);

// Common confusion pairs
MERGE (c10)-[:CONFUSED_WITH]->(c5);  // Torque vs Force
MERGE (c9)-[:CONFUSED_WITH]->(:Concept {id: 'laws-mass', name: 'Mass'});

// Cross-subject: Rotational motion uses integration for MOI
MERGE (c9)-[:BRIDGES_TO]->(:Concept {id: 'calc-c1', name: 'Integration', subject: 'Mathematics'});

MERGE (f6:Formula {id: 'rot-f1', plain_text: 'I = Σmr²', latex: 'I = \\sum m_i r_i^2'})
MERGE (f6)-[:DEFINES]->(c9);
MERGE (f7:Formula {id: 'rot-f2', plain_text: 'τ = Iα', latex: '\\tau = I\\alpha'})
MERGE (f7)-[:DEFINES]->(c10);
MERGE (f8:Formula {id: 'rot-f3', plain_text: 'L = Iω', latex: 'L = I\\omega'})
MERGE (f8)-[:DEFINES]->(c11);

// ── Chapter: Gravitation ──────────────────────────────────────────────────────

MERGE (grav:Chapter {id: 'phy11-06', name: 'Gravitation', class_level: 11, jee_weightage_pct: 5.0})
MERGE (grav)-[:IN_SUBJECT]->(:Subject {id: 'physics'});

MERGE (t_grav:Topic {id: 'grav-t1', name: 'Universal Gravitation & Orbital Mechanics'})
MERGE (t_grav)-[:IN_CHAPTER]->(grav);

MERGE (c13:Concept {id: 'grav-c1', name: 'Newton\'s Law of Gravitation', subject: 'Physics',
  description: 'F = Gm₁m₂/r². Every mass attracts every other mass. G = 6.674×10⁻¹¹ Nm²/kg².',
  difficulty: 'easy'})
MERGE (c13)-[:IN_TOPIC]->(t_grav);

MERGE (c14:Concept {id: 'grav-c2', name: 'Orbital Velocity & Escape Velocity', subject: 'Physics',
  description: 'Orbital: v = √(GM/r). Escape: v_e = √(2GM/r) = √2 × orbital velocity.',
  difficulty: 'medium'})
MERGE (c14)-[:IN_TOPIC]->(t_grav);

MERGE (c15:Concept {id: 'grav-c3', name: 'Kepler\'s Laws', subject: 'Physics',
  description: '1. Elliptical orbits. 2. Equal areas in equal times (L conserved). 3. T² ∝ r³.',
  difficulty: 'medium'})
MERGE (c15)-[:IN_TOPIC]->(t_grav);

MERGE (c13)-[:REQUIRES]->(c5);
MERGE (c15)-[:APPEARS_WITH]->(c11);  // Kepler's 2nd law ↔ Angular Momentum conservation

MERGE (f9:Formula {id: 'grav-f1', plain_text: 'F = Gm₁m₂/r²', latex: 'F = \\frac{Gm_1m_2}{r^2}'})
MERGE (f9)-[:DEFINES]->(c13);
MERGE (f10:Formula {id: 'grav-f2', plain_text: 'v_escape = √(2GM/R)', latex: 'v_e = \\sqrt{\\frac{2GM}{R}}'})
MERGE (f10)-[:DEFINES]->(c14);

// ── Chapter: Thermodynamics ───────────────────────────────────────────────────

MERGE (thermo:Chapter {id: 'phy11-08', name: 'Thermodynamics', class_level: 11, jee_weightage_pct: 7.0})
MERGE (thermo)-[:IN_SUBJECT]->(:Subject {id: 'physics'});

MERGE (t_thermo:Topic {id: 'thermo-t1', name: 'Laws of Thermodynamics'})
MERGE (t_thermo)-[:IN_CHAPTER]->(thermo);

MERGE (c16:Concept {id: 'thermo-c1', name: 'First Law of Thermodynamics', subject: 'Physics',
  description: 'ΔU = Q - W. Energy conservation for thermodynamic systems. Q positive = heat added, W positive = work done by system.',
  difficulty: 'medium'})
MERGE (c16)-[:IN_TOPIC]->(t_thermo);

MERGE (c17:Concept {id: 'thermo-c2', name: 'Isothermal & Adiabatic Processes', subject: 'Physics',
  description: 'Isothermal: T constant, PV = const. Adiabatic: no heat exchange, PVᵞ = const.',
  difficulty: 'hard'})
MERGE (c17)-[:IN_TOPIC]->(t_thermo);

MERGE (c18:Concept {id: 'thermo-c3', name: 'Second Law & Entropy', subject: 'Physics',
  description: 'Heat flows from hot to cold. Entropy of universe always increases. Defines direction of processes.',
  difficulty: 'hard'})
MERGE (c18)-[:IN_TOPIC]->(t_thermo);

// Thermodynamics bridges to Chemistry Thermodynamics
MERGE (c16)-[:BRIDGES_TO]->(:Concept {id: 'chem-thermo-c1', name: 'Enthalpy', subject: 'Chemistry'});

// ═══════════════════════════════════════════════════════════════════════════════
// CHEMISTRY — 11th Grade (Structure — expand with full content)
// ═══════════════════════════════════════════════════════════════════════════════

MERGE (at:Chapter {id: 'che11-02', name: 'Atomic Structure', class_level: 11, jee_weightage_pct: 5.0})
MERGE (at)-[:IN_SUBJECT]->(:Subject {id: 'chemistry'});

MERGE (c19:Concept {id: 'chem-at-c1', name: 'Bohr Model', subject: 'Chemistry',
  description: 'Energy of electron: Eₙ = -13.6/n² eV. Radius: rₙ = 0.529n² Å. Quantized orbits.',
  difficulty: 'medium'})
MERGE (c19)-[:IN_TOPIC]->(:Topic {id: 'at-t1', name: 'Atomic Models'})-[:IN_CHAPTER]->(at);

MERGE (c20:Concept {id: 'chem-at-c2', name: 'Quantum Numbers', subject: 'Chemistry',
  description: 'n (shell), l (subshell), m_l (orbital), m_s (spin). Pauli exclusion: no two electrons same 4 QNs.',
  difficulty: 'medium'})
MERGE (c20)-[:IN_TOPIC]->(:Topic {id: 'at-t1', name: 'Atomic Models'});

MERGE (cb:Chapter {id: 'che11-03', name: 'Chemical Bonding', class_level: 11, jee_weightage_pct: 6.0})
MERGE (cb)-[:IN_SUBJECT]->(:Subject {id: 'chemistry'});

MERGE (c21:Concept {id: 'chem-cb-c1', name: 'VSEPR Theory', subject: 'Chemistry',
  description: 'Electron pairs repel, determine molecular geometry. Lone pairs repel more than bond pairs.',
  difficulty: 'medium'})
MERGE (c21)-[:IN_TOPIC]->(:Topic {id: 'cb-t1', name: 'Bonding Theories'})-[:IN_CHAPTER]->(cb);

// ═══════════════════════════════════════════════════════════════════════════════
// MATHEMATICS — 11th Grade (Structure — expand with full content)
// ═══════════════════════════════════════════════════════════════════════════════

MERGE (trig:Chapter {id: 'mat11-02', name: 'Trigonometric Functions', class_level: 11, jee_weightage_pct: 7.0})
MERGE (trig)-[:IN_SUBJECT]->(:Subject {id: 'mathematics'});

MERGE (c22:Concept {id: 'trig-c1', name: 'Trigonometry', subject: 'Mathematics',
  description: 'sin, cos, tan and their identities. Fundamental to Physics problems involving angles.',
  difficulty: 'easy'})
MERGE (c22)-[:IN_TOPIC]->(:Topic {id: 'trig-t1', name: 'Trig Identities & Equations'})-[:IN_CHAPTER]->(trig);

MERGE (calculus:Chapter {id: 'mat11-09', name: 'Limits & Derivatives', class_level: 11, jee_weightage_pct: 7.0})
MERGE (calculus)-[:IN_SUBJECT]->(:Subject {id: 'mathematics'});

MERGE (c23:Concept {id: 'calc-c1', name: 'Integration', subject: 'Mathematics',
  description: 'Reverse of differentiation. Used extensively in Physics for deriving equations of motion, MOI.',
  difficulty: 'hard'})
MERGE (c23)-[:IN_TOPIC]->(:Topic {id: 'calc-t1', name: 'Calculus Fundamentals'})-[:IN_CHAPTER]->(calculus);

MERGE (c24:Concept {id: 'calc-c2', name: 'Differentiation', subject: 'Mathematics',
  description: 'Rate of change. d/dt of position = velocity, d/dt of velocity = acceleration.',
  difficulty: 'medium'})
MERGE (c24)-[:IN_TOPIC]->(:Topic {id: 'calc-t1', name: 'Calculus Fundamentals'});

// Math → Physics bridges
MERGE (c24)-[:BRIDGES_TO]->(c1);   // Differentiation → Kinematics
MERGE (c23)-[:BRIDGES_TO]->(c9);   // Integration → MOI calculation

// ═══════════════════════════════════════════════════════════════════════════════
// SAMPLE PROBLEMS (PYQ + Practice)
// ═══════════════════════════════════════════════════════════════════════════════

MERGE (p1:Problem {
  id: 'pyq-2023-c-rot-01',
  content: 'A solid sphere of mass M and radius R rolls without slipping on a horizontal surface. The ratio of rotational KE to total KE is:',
  difficulty: 'medium',
  type: 'MCQ',
  is_pyq: true,
  year: 2023,
  answer_key: '2/7'
})
MERGE (p1)-[:TESTS]->(c12)
MERGE (p1)-[:TESTS]->(c9);

MERGE (p2:Problem {
  id: 'pyq-2022-s1-grav-01',
  content: 'A satellite is orbiting Earth at height h. If the radius of Earth is R and g is surface gravity, find orbital velocity.',
  difficulty: 'medium',
  type: 'MCQ',
  is_pyq: true,
  year: 2022,
  answer_key: 'sqrt(gR²/(R+h))'
})
MERGE (p2)-[:TESTS]->(c14)
MERGE (p2)-[:TESTS]->(c13);

MERGE (p3:Problem {
  id: 'prac-rot-01',
  content: 'A figure skater pulls her arms inward. Her angular velocity increases. Which law explains this and what quantity is conserved?',
  difficulty: 'easy',
  type: 'MCQ',
  is_pyq: false
})
MERGE (p3)-[:TESTS]->(c11);

MERGE (p4:Problem {
  id: 'prac-proj-01',
  content: 'A ball is projected at 30° to horizontal with speed 20 m/s. Find the time of flight and maximum height. (g = 10 m/s²)',
  difficulty: 'medium',
  type: 'numerical',
  is_pyq: false
})
MERGE (p4)-[:TESTS]->(c2)
MERGE (p4)-[:TESTS]->(c1);

// ═══════════════════════════════════════════════════════════════════════════════
// COMMON MISTAKES (seed)
// ═══════════════════════════════════════════════════════════════════════════════

MERGE (m1:CommonMistake {id: 'cm-01', description: 'Using wrong axis for Moment of Inertia calculation', pattern_tag: 'axis_error'})
MERGE (m1)-[:ABOUT]->(c9);

MERGE (m2:CommonMistake {id: 'cm-02', description: 'Forgetting to check if net torque = 0 before applying angular momentum conservation', pattern_tag: 'conservation_condition'})
MERGE (m2)-[:ABOUT]->(c11);

MERGE (m3:CommonMistake {id: 'cm-03', description: 'Sign error in work-energy theorem (work done by friction is negative)', pattern_tag: 'sign_error'})
MERGE (m3)-[:ABOUT]->(:Concept {id: 'wep-c1', name: 'Work-Energy Theorem'});

MERGE (m4:CommonMistake {id: 'cm-04', description: 'Using v=u+at for non-uniform acceleration (valid only for constant a)', pattern_tag: 'applicability_error'})
MERGE (m4)-[:ABOUT]->(c1);
