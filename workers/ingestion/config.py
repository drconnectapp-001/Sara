"""
Maps every PDF filename to its chapter metadata.
Based on NCERT rationalized syllabus (Reprint 2026-27).
"""

CHAPTER_MAP = {

    # ── PHYSICS PART 1 (keph1dd) ──────────────────────────────────────────────
    "keph101": {
        "subject": "Physics", "part": 1, "chapter_no": 1,
        "name": "Units and Measurement",
        "neo4j_id": "phy11-01",
        "jee_weightage": 3.0,
        "type": "content"
    },
    "keph102": {
        "subject": "Physics", "part": 1, "chapter_no": 2,
        "name": "Motion in a Straight Line",
        "neo4j_id": "phy11-02",
        "jee_weightage": 5.0,
        "type": "content"
    },
    "keph103": {
        "subject": "Physics", "part": 1, "chapter_no": 3,
        "name": "Motion in a Plane",
        "neo4j_id": "phy11-03",
        "jee_weightage": 6.0,
        "type": "content"
    },
    "keph104": {
        "subject": "Physics", "part": 1, "chapter_no": 4,
        "name": "Laws of Motion",
        "neo4j_id": "phy11-04",
        "jee_weightage": 8.0,
        "type": "content"
    },
    "keph105": {
        "subject": "Physics", "part": 1, "chapter_no": 5,
        "name": "Work, Energy and Power",
        "neo4j_id": "phy11-05",
        "jee_weightage": 6.0,
        "type": "content"
    },
    "keph106": {
        "subject": "Physics", "part": 1, "chapter_no": 6,
        "name": "System of Particles and Rotational Motion",
        "neo4j_id": "phy11-06",
        "jee_weightage": 7.0,
        "type": "content"
    },
    "keph107": {
        "subject": "Physics", "part": 1, "chapter_no": 7,
        "name": "Gravitation",
        "neo4j_id": "phy11-07",
        "jee_weightage": 5.0,
        "type": "content"
    },

    # ── PHYSICS PART 2 (keph2dd) ──────────────────────────────────────────────
    "keph201": {
        "subject": "Physics", "part": 2, "chapter_no": 8,
        "name": "Mechanical Properties of Solids",
        "neo4j_id": "phy11-08",
        "jee_weightage": 3.0,
        "type": "content"
    },
    "keph202": {
        "subject": "Physics", "part": 2, "chapter_no": 9,
        "name": "Mechanical Properties of Fluids",
        "neo4j_id": "phy11-09",
        "jee_weightage": 3.0,
        "type": "content"
    },
    "keph203": {
        "subject": "Physics", "part": 2, "chapter_no": 10,
        "name": "Thermal Properties of Matter",
        "neo4j_id": "phy11-10",
        "jee_weightage": 4.0,
        "type": "content"
    },
    "keph204": {
        "subject": "Physics", "part": 2, "chapter_no": 11,
        "name": "Thermodynamics",
        "neo4j_id": "phy11-11",
        "jee_weightage": 7.0,
        "type": "content"
    },
    "keph205": {
        "subject": "Physics", "part": 2, "chapter_no": 12,
        "name": "Kinetic Theory",
        "neo4j_id": "phy11-12",
        "jee_weightage": 4.0,
        "type": "content"
    },
    "keph206": {
        "subject": "Physics", "part": 2, "chapter_no": 13,
        "name": "Oscillations",
        "neo4j_id": "phy11-13",
        "jee_weightage": 5.0,
        "type": "content"
    },
    "keph207": {
        "subject": "Physics", "part": 2, "chapter_no": 14,
        "name": "Waves",
        "neo4j_id": "phy11-14",
        "jee_weightage": 5.0,
        "type": "content"
    },

    # ── PHYSICS PROBLEM SETS (extract as problems) ────────────────────────────
    "keph1ps": {"subject": "Physics", "type": "problems", "part": 1},
    "keph2ps": {"subject": "Physics", "type": "problems", "part": 2},

    # ── CHEMISTRY PART 1 (kech1dd) ────────────────────────────────────────────
    "kech101": {
        "subject": "Chemistry", "part": 1, "chapter_no": 1,
        "name": "Some Basic Concepts of Chemistry",
        "neo4j_id": "che11-01",
        "jee_weightage": 3.0,
        "type": "content"
    },
    "kech102": {
        "subject": "Chemistry", "part": 1, "chapter_no": 2,
        "name": "Structure of Atom",
        "neo4j_id": "che11-02",
        "jee_weightage": 5.0,
        "type": "content"
    },
    "kech103": {
        "subject": "Chemistry", "part": 1, "chapter_no": 3,
        "name": "Classification of Elements and Periodicity",
        "neo4j_id": "che11-03",
        "jee_weightage": 4.0,
        "type": "content"
    },
    "kech104": {
        "subject": "Chemistry", "part": 1, "chapter_no": 4,
        "name": "Chemical Bonding and Molecular Structure",
        "neo4j_id": "che11-04",
        "jee_weightage": 6.0,
        "type": "content"
    },
    "kech105": {
        "subject": "Chemistry", "part": 1, "chapter_no": 5,
        "name": "States of Matter",
        "neo4j_id": "che11-05",
        "jee_weightage": 4.0,
        "type": "content"
    },
    "kech106": {
        "subject": "Chemistry", "part": 1, "chapter_no": 6,
        "name": "Thermodynamics",
        "neo4j_id": "che11-06",
        "jee_weightage": 5.0,
        "type": "content"
    },

    # ── CHEMISTRY PART 2 (kech2dd) ────────────────────────────────────────────
    "kech201": {
        "subject": "Chemistry", "part": 2, "chapter_no": 7,
        "name": "Equilibrium",
        "neo4j_id": "che11-07",
        "jee_weightage": 6.0,
        "type": "content"
    },
    "kech202": {
        "subject": "Chemistry", "part": 2, "chapter_no": 8,
        "name": "Redox Reactions",
        "neo4j_id": "che11-08",
        "jee_weightage": 3.0,
        "type": "content"
    },
    "kech203": {
        "subject": "Chemistry", "part": 2, "chapter_no": 9,
        "name": "Hydrocarbons",
        "neo4j_id": "che11-09",
        "jee_weightage": 5.0,
        "type": "content"
    },

    "kech1ps": {"subject": "Chemistry", "type": "problems", "part": 1},
    "kech2ps": {"subject": "Chemistry", "type": "problems", "part": 2},

    # ── MATHEMATICS (kemh1dd) ─────────────────────────────────────────────────
    "kemh101": {
        "subject": "Mathematics", "part": 1, "chapter_no": 1,
        "name": "Sets",
        "neo4j_id": "mat11-01",
        "jee_weightage": 3.0,
        "type": "content"
    },
    "kemh102": {
        "subject": "Mathematics", "part": 1, "chapter_no": 2,
        "name": "Relations and Functions",
        "neo4j_id": "mat11-02",
        "jee_weightage": 4.0,
        "type": "content"
    },
    "kemh103": {
        "subject": "Mathematics", "part": 1, "chapter_no": 3,
        "name": "Trigonometric Functions",
        "neo4j_id": "mat11-03",
        "jee_weightage": 7.0,
        "type": "content"
    },
    "kemh104": {
        "subject": "Mathematics", "part": 1, "chapter_no": 4,
        "name": "Complex Numbers and Quadratic Equations",
        "neo4j_id": "mat11-04",
        "jee_weightage": 7.0,
        "type": "content"
    },
    "kemh105": {
        "subject": "Mathematics", "part": 1, "chapter_no": 5,
        "name": "Linear Inequalities",
        "neo4j_id": "mat11-05",
        "jee_weightage": 2.0,
        "type": "content"
    },
    "kemh106": {
        "subject": "Mathematics", "part": 1, "chapter_no": 6,
        "name": "Permutations and Combinations",
        "neo4j_id": "mat11-06",
        "jee_weightage": 5.0,
        "type": "content"
    },
    "kemh107": {
        "subject": "Mathematics", "part": 1, "chapter_no": 7,
        "name": "Binomial Theorem",
        "neo4j_id": "mat11-07",
        "jee_weightage": 4.0,
        "type": "content"
    },
    "kemh108": {
        "subject": "Mathematics", "part": 1, "chapter_no": 8,
        "name": "Sequences and Series",
        "neo4j_id": "mat11-08",
        "jee_weightage": 6.0,
        "type": "content"
    },
    "kemh109": {
        "subject": "Mathematics", "part": 1, "chapter_no": 9,
        "name": "Straight Lines",
        "neo4j_id": "mat11-09",
        "jee_weightage": 5.0,
        "type": "content"
    },
    "kemh110": {
        "subject": "Mathematics", "part": 1, "chapter_no": 10,
        "name": "Conic Sections",
        "neo4j_id": "mat11-10",
        "jee_weightage": 7.0,
        "type": "content"
    },
    "kemh111": {
        "subject": "Mathematics", "part": 1, "chapter_no": 11,
        "name": "Introduction to Three Dimensional Geometry",
        "neo4j_id": "mat11-11",
        "jee_weightage": 3.0,
        "type": "content"
    },
    "kemh112": {
        "subject": "Mathematics", "part": 1, "chapter_no": 12,
        "name": "Limits and Derivatives",
        "neo4j_id": "mat11-12",
        "jee_weightage": 7.0,
        "type": "content"
    },
    "kemh113": {
        "subject": "Mathematics", "part": 1, "chapter_no": 13,
        "name": "Statistics",
        "neo4j_id": "mat11-13",
        "jee_weightage": 3.0,
        "type": "content"
    },
    "kemh114": {
        "subject": "Mathematics", "part": 1, "chapter_no": 14,
        "name": "Probability",
        "neo4j_id": "mat11-14",
        "jee_weightage": 5.0,
        "type": "content"
    },

    "kemh1ps": {"subject": "Mathematics", "type": "problems", "part": 1},
}

# Files to skip entirely (answers, appendices, supplementary)
SKIP_SUFFIXES = {"an", "a1", "a2", "sm"}

def get_chapter_meta(filename_stem: str) -> dict | None:
    """Return chapter metadata for a PDF filename stem, or None if skip."""
    for suffix in SKIP_SUFFIXES:
        if filename_stem.endswith(suffix):
            return None
    return CHAPTER_MAP.get(filename_stem)
