-- Sara JEE Companion — PostgreSQL Schema
-- Auto-runs on first docker compose up via init.d mount

-- Enable vector extension
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Sara's Profile ──────────────────────────────────────────────────────────

CREATE TABLE sara_profile (
    id                VARCHAR(10) PRIMARY KEY DEFAULT 'sara',
    name              VARCHAR(100) NOT NULL DEFAULT 'Sara',
    password_hash     TEXT NOT NULL,
    target_college    TEXT DEFAULT 'IIT Bombay',
    target_score      INT DEFAULT 250,
    class_level       INT DEFAULT 11,
    weak_subjects     TEXT[] DEFAULT '{}',
    strong_subjects   TEXT[] DEFAULT '{}',
    motivation_style  VARCHAR(30) DEFAULT 'balanced',
    current_mood      VARCHAR(30) DEFAULT 'neutral',
    current_streak    INT DEFAULT 0,
    longest_streak    INT DEFAULT 0,
    total_study_hours FLOAT DEFAULT 0,
    created_at        TIMESTAMP DEFAULT NOW()
);

-- Seed Sara's profile (password: changeme — update on first login)
INSERT INTO sara_profile (id, name, password_hash, target_college, target_score)
VALUES (
    'sara', 'Sara',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/lfpd7OxBr0L8vkR2e',
    'IIT Bombay', 250
) ON CONFLICT DO NOTHING;

-- ── Emotional Timeline ───────────────────────────────────────────────────────

CREATE TABLE sara_emotional_timeline (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    detected_mood   VARCHAR(30) NOT NULL,
    trigger_reason  TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- ── Chapter Progress ─────────────────────────────────────────────────────────

CREATE TABLE sara_chapter_progress (
    chapter_id        TEXT PRIMARY KEY,
    status            VARCHAR(20) DEFAULT 'not_started',
    confidence_level  INT DEFAULT 0,
    last_studied_at   TIMESTAMP
);

-- ── Concept Accuracy Tracking ────────────────────────────────────────────────

CREATE TABLE sara_concept_accuracy (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    concept_name    TEXT NOT NULL,
    subject         TEXT NOT NULL,
    correct         INT DEFAULT 0,
    total           INT DEFAULT 0,
    accuracy        FLOAT DEFAULT 0,
    updated_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE (concept_name)
);

-- ── Mock Test Scores ─────────────────────────────────────────────────────────

CREATE TABLE sara_mock_scores (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    score            INT NOT NULL,
    physics_score    INT,
    chemistry_score  INT,
    math_score       INT,
    total_questions  INT DEFAULT 90,
    attempted        INT,
    correct          INT,
    test_type        VARCHAR(30) DEFAULT 'full_mock',
    taken_at         TIMESTAMP DEFAULT NOW()
);

-- ── Practice Attempts ────────────────────────────────────────────────────────

CREATE TABLE sara_practice_attempts (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_neo4j_id TEXT NOT NULL,
    is_correct      BOOLEAN NOT NULL,
    time_taken_sec  INT,
    subject         TEXT,
    chapter_id      TEXT,
    attempted_at    TIMESTAMP DEFAULT NOW()
);

-- ── Study Sessions (timer) ───────────────────────────────────────────────────

CREATE TABLE sara_study_sessions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subject         TEXT,
    chapter_id      TEXT,
    duration_minutes INT NOT NULL,
    started_at      TIMESTAMP NOT NULL,
    ended_at        TIMESTAMP
);

-- ── Mistake Patterns ─────────────────────────────────────────────────────────

CREATE TABLE sara_mistake_patterns (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    concept_name        TEXT NOT NULL,
    pattern_description TEXT NOT NULL,
    frequency           INT DEFAULT 1,
    last_seen_at        TIMESTAMP DEFAULT NOW(),
    UNIQUE (concept_name, pattern_description)
);

-- ── Key Memories (companion memory) ─────────────────────────────────────────

CREATE TABLE sara_key_memories (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content             TEXT NOT NULL,
    memory_type         VARCHAR(30) DEFAULT 'statement',
    related_concepts    TEXT[] DEFAULT '{}',
    created_at          TIMESTAMP DEFAULT NOW()
);

-- ── Doubt History ────────────────────────────────────────────────────────────

CREATE TABLE doubt_history (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sara_query       TEXT NOT NULL,
    response_summary TEXT,
    concepts         TEXT[] DEFAULT '{}',
    resolved         BOOLEAN DEFAULT TRUE,
    embedding        vector(1536),
    created_at       TIMESTAMP DEFAULT NOW()
);

-- ── Spaced Repetition ────────────────────────────────────────────────────────

CREATE TABLE sara_revision_schedule (
    chapter_id      TEXT PRIMARY KEY,
    next_revision   DATE NOT NULL,
    interval_days   INT DEFAULT 1,
    ease_factor     FLOAT DEFAULT 2.5,
    repetitions     INT DEFAULT 0
);

-- ── Vector Embedding Tables ──────────────────────────────────────────────────

CREATE TABLE concept_embeddings (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    neo4j_id    TEXT NOT NULL UNIQUE,
    content     TEXT,
    embedding   vector(1536),
    subject     TEXT,
    chapter     TEXT
);

CREATE TABLE problem_embeddings (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    neo4j_id    TEXT NOT NULL UNIQUE,
    content     TEXT,
    embedding   vector(1536),
    difficulty  TEXT,
    is_pyq      BOOLEAN DEFAULT FALSE,
    year        INT
);

-- ── JEE Chapters Reference ───────────────────────────────────────────────────

CREATE TABLE jee_chapters (
    id                TEXT PRIMARY KEY,
    name              TEXT NOT NULL,
    subject           TEXT NOT NULL,
    class_level       INT NOT NULL,
    jee_weightage_pct FLOAT,
    display_order     INT
);

-- Physics 11th chapters
INSERT INTO jee_chapters VALUES
  ('phy11-01', 'Physical World & Measurement', 'Physics', 11, 2, 1),
  ('phy11-02', 'Kinematics', 'Physics', 11, 7, 2),
  ('phy11-03', 'Laws of Motion', 'Physics', 11, 8, 3),
  ('phy11-04', 'Work, Energy & Power', 'Physics', 11, 6, 4),
  ('phy11-05', 'Rotational Motion', 'Physics', 11, 7, 5),
  ('phy11-06', 'Gravitation', 'Physics', 11, 5, 6),
  ('phy11-07', 'Properties of Solids & Liquids', 'Physics', 11, 4, 7),
  ('phy11-08', 'Thermodynamics', 'Physics', 11, 7, 8),
  ('phy11-09', 'Kinetic Theory of Gases', 'Physics', 11, 4, 9),
  ('phy11-10', 'Oscillations & Waves', 'Physics', 11, 7, 10);

-- Chemistry 11th chapters
INSERT INTO jee_chapters VALUES
  ('che11-01', 'Basic Concepts of Chemistry', 'Chemistry', 11, 3, 1),
  ('che11-02', 'Atomic Structure', 'Chemistry', 11, 5, 2),
  ('che11-03', 'Chemical Bonding', 'Chemistry', 11, 6, 3),
  ('che11-04', 'States of Matter', 'Chemistry', 11, 4, 4),
  ('che11-05', 'Thermodynamics (Chemistry)', 'Chemistry', 11, 5, 5),
  ('che11-06', 'Equilibrium', 'Chemistry', 11, 6, 6),
  ('che11-07', 'Redox Reactions', 'Chemistry', 11, 3, 7),
  ('che11-08', 'Hydrogen & s-block Elements', 'Chemistry', 11, 4, 8),
  ('che11-09', 'p-block Elements (11th)', 'Chemistry', 11, 4, 9),
  ('che11-10', 'Organic Chemistry Basics', 'Chemistry', 11, 6, 10),
  ('che11-11', 'Hydrocarbons', 'Chemistry', 11, 5, 11);

-- Mathematics 11th chapters
INSERT INTO jee_chapters VALUES
  ('mat11-01', 'Sets, Relations & Functions', 'Mathematics', 11, 4, 1),
  ('mat11-02', 'Trigonometric Functions', 'Mathematics', 11, 7, 2),
  ('mat11-03', 'Complex Numbers & Quadratics', 'Mathematics', 11, 7, 3),
  ('mat11-04', 'Permutations & Combinations', 'Mathematics', 11, 5, 4),
  ('mat11-05', 'Binomial Theorem', 'Mathematics', 11, 4, 5),
  ('mat11-06', 'Sequences & Series', 'Mathematics', 11, 6, 6),
  ('mat11-07', 'Straight Lines & Conic Sections', 'Mathematics', 11, 8, 7),
  ('mat11-08', 'Introduction to 3D Geometry', 'Mathematics', 11, 3, 8),
  ('mat11-09', 'Limits & Derivatives', 'Mathematics', 11, 7, 9),
  ('mat11-10', 'Statistics & Probability', 'Mathematics', 11, 5, 10);

-- ── Wiki Knowledge Chunks (Obsidian vault → RAG + practice + formulas) ───────

CREATE TABLE IF NOT EXISTS wiki_chunks (
    id               SERIAL PRIMARY KEY,
    concept_id       TEXT NOT NULL,
    concept_name     TEXT NOT NULL,
    subject          TEXT NOT NULL,
    section_heading  TEXT NOT NULL,
    content          TEXT,
    embedding        vector(1536),
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (concept_id, section_heading)
);

-- ── NCERT Section Chunks (full text for RAG retrieval) ──────────────────────

CREATE TABLE IF NOT EXISTS ncert_chunks (
    id              SERIAL PRIMARY KEY,
    chapter_id      TEXT NOT NULL,
    chapter_name    TEXT NOT NULL,
    subject         TEXT NOT NULL,
    section_heading TEXT NOT NULL,
    content         TEXT,
    embedding       vector(1536),
    UNIQUE (chapter_id, section_heading)
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX ON concept_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);
CREATE INDEX ON problem_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);
CREATE INDEX ON doubt_history USING ivfflat (embedding vector_cosine_ops) WITH (lists = 10);
CREATE INDEX ON sara_concept_accuracy (subject);
CREATE INDEX ON sara_practice_attempts (attempted_at);
CREATE INDEX ON sara_study_sessions (started_at);
CREATE INDEX ON ncert_chunks USING ivfflat (embedding vector_cosine_ops) WITH (lists = 50);
CREATE INDEX IF NOT EXISTS wiki_chunks_embedding_idx ON wiki_chunks USING ivfflat (embedding vector_cosine_ops);
