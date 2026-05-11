# Sara — Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     DOCKER COMPOSE (local / KVM2)               │
│                                                                 │
│  ┌─────────────┐    ┌──────────────────────────────────────┐   │
│  │  Next.js    │    │        FastAPI Backend (port 8000)   │   │
│  │  Frontend   │◄──►│                                      │   │
│  │  port 3000  │    │  ┌───────────┐  ┌────────────────┐  │   │
│  └─────────────┘    │  │    RAG    │  │ Memory Engine  │  │   │
│                      │  │ Pipeline  │  │  (Companion)   │  │   │
│  ┌─────────────┐    │  └─────┬─────┘  └───────┬────────┘  │   │
│  │    Nginx    │    │        │                 │           │   │
│  │  80 / 443   │    └────────┼─────────────────┼───────────┘   │
│  └─────────────┘             │                 │               │
│                      ┌───────▼─────────────────▼────────────┐  │
│                      │              Data Layer               │  │
│                      │                                       │  │
│                      │  ┌─────────┐ ┌──────────┐ ┌───────┐  │  │
│                      │  │  Neo4j  │ │ Postgres │ │ Redis │  │  │
│                      │  │ (Graph) │ │ +pgvector│ │       │  │  │
│                      │  └─────────┘ └──────────┘ └───────┘  │  │
│                      └───────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────┐                       │
│  │  Embedding Worker (background)       │                       │
│  │  Processes JEE content → embeddings  │                       │
│  └──────────────────────────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   External APIs   │
                    │ Anthropic (Claude)│
                    │ OpenAI (embed)    │
                    └───────────────────┘
```

---

## Data Layer

### Neo4j — JEE Knowledge Graph

Stores all JEE concepts and their relationships. The key insight: JEE subjects
are a connected graph, not isolated chapters. This graph lets the AI walk
concept relationships, not just search text.

**Node Types:**
```cypher
(:Subject)        {id, name}
(:Chapter)        {id, name, class_level, subject_id, jee_weightage_pct}
(:Topic)          {id, name, chapter_id, summary}
(:Concept)        {id, name, description, embedding_id, difficulty}
(:Formula)        {id, latex, plain_text, concept_id}
(:Problem)        {id, content, difficulty, type, year, embedding_id, is_pyq}
(:CommonMistake)  {id, description, pattern_tag, concept_id}
```

**Relationship Types:**
```cypher
(Chapter)-[:IN_SUBJECT]->(Subject)
(Topic)-[:IN_CHAPTER]->(Chapter)
(Concept)-[:IN_TOPIC]->(Topic)
(Formula)-[:DEFINES]->(Concept)
(Problem)-[:TESTS]->(Concept)
(Concept)-[:REQUIRES]->(Concept)          # prerequisite chain
(Concept)-[:APPEARS_WITH]->(Concept)      # co-occur in JEE questions
(Concept)-[:CONFUSED_WITH]->(Concept)     # common mistake clusters
(Concept)-[:BRIDGES_TO]->(Concept)        # cross-subject links
```

**Sara's personal edges (added dynamically at runtime):**
```cypher
(:SaraAttempt)-[:ON]->(Problem)
(:SaraAttempt)-[:WRONG_BECAUSE]->(CommonMistake)
(sara)-[:WEAK_ON]->(Concept)              # auto-updated by accuracy < 60%
(sara)-[:STRONG_ON]->(Concept)            # auto-updated by accuracy > 80%
(sara)-[:COMPLETED]->(Chapter)
(sara)-[:LAST_STUDIED]->(Topic)
```

### PostgreSQL + pgvector — Sara's Data + Vector Search

All of Sara's personal data lives here. pgvector extension enables semantic
similarity search within concept neighborhoods returned by Neo4j.

**Key tables:**
```sql
sara_profile          -- name, target, settings
sara_emotional_state  -- mood timeline, stress signals
sara_academic_history -- mock scores, accuracy per concept
sara_conversations    -- key things she said, embedding indexed
sara_mistake_patterns -- recurring error patterns with frequency
study_sessions        -- timer logs
concept_embeddings    -- all JEE concept embeddings (vector)
problem_embeddings    -- all problem embeddings (vector)
doubt_history         -- past doubts she asked + embeddings
```

### Redis — Cache & Sessions

- JWT session store
- Rate limiting (AI calls)
- Streak data (fast read)
- Current study session state

---

## RAG Pipeline (backend/app/rag/)

The intelligence loop that runs on every message Sara sends.

```
sara_message
      │
      ▼
1. extract_concepts(message)
   └── Mini Claude call: "What JEE concepts is this about?"
   └── Returns: ["Angular Momentum", "Torque", "Moment of Inertia"]
      │
      ▼
2. neo4j_traverse(concepts)
   └── Cypher: find concept nodes + depth-2 neighborhood
   └── Returns: concept cluster + prerequisites + co-occurring concepts
               + problems that test these concepts
               + Sara's weak_on edges if any
      │
      ▼
3. pgvector_search(message_embedding, neighborhood_ids)
   └── Semantic search WITHIN the neo4j neighborhood (not full DB)
   └── Returns: top 3 most relevant problems, similar past doubts
      │
      ▼
4. memory_retrieve(concept_cluster)
   └── Sara's accuracy on this cluster
   └── Her mistake patterns here
   └── Her emotional state this week
   └── Relevant past conversation snippets (embedding search)
      │
      ▼
5. build_context(all above)
   └── Structured context string for Claude system prompt
      │
      ▼
6. claude_respond(system_prompt + sara_message)
   └── Model: claude-sonnet-4-6
   └── Streaming response back to frontend
      │
      ▼
7. memory_update(message, response, concepts)
   └── Update accuracy scores
   └── Log this doubt to doubt_history
   └── Re-evaluate emotional state signals
   └── Update WEAK_ON / STRONG_ON edges in Neo4j
```

---

## Memory Engine (backend/app/memory/)

What makes the companion feel real. Runs before and after every Claude call.

**Memory retrieval returns:**
```python
{
  "profile": {
    "target_college": "...",
    "target_score": 250,
    "weak_subjects": ["Chemistry"],
    "motivation_style": "needs_encouragement"
  },
  "emotional": {
    "current_mood": "stressed",          # stressed/confident/burnt_out/neutral
    "days_in_mood": 4,
    "trigger": "mock_score_drop",
    "last_recovery": "2025-01-10"
  },
  "academic": {
    "accuracy_on_cluster": 0.41,
    "times_asked_similar_doubt": 3,
    "last_studied_this": "6 days ago",
    "mock_score_trend": -15            # points change over last 2 weeks
  },
  "relevant_memories": [
    "3 weeks ago: said she couldn't understand rotational motion",
    "last week: score improved after taking a day off"
  ],
  "mistake_patterns": [
    {"pattern": "wrong axis for moment of inertia", "frequency": 6}
  ]
}
```

**Emotional state signals (auto-detected):**
```python
BURNT_OUT:       study_hours_today > 8 OR score_trend < -20 over 2 weeks
HIGH_CONFIDENCE: accuracy_trend > +10% last 7 days OR streak > 14
EXAM_ANXIETY:    days_to_jee < 30 AND message contains anxiety keywords
FRUSTRATED:      3+ wrong answers in last 30 mins OR explicit message signals
```

---

## Companion Layer (backend/app/companion/)

Defines how Claude responds. Not just what it knows — how it speaks.

**System prompt structure:**
```
[Sara's identity + emotional state + recent context]   ← always present
[Academic context for this specific question]          ← from RAG
[Behavioral rules for this emotional state]            ← from companion/rules.py
[JEE knowledge context]                                ← from graph
[Formatting instructions]                              ← concise, warm, not robotic
```

**Response rules by emotional state:**
- `burnt_out` → acknowledge first, help second. Don't be perky.
- `frustrated` → validate before explaining. One concept at a time.
- `high_confidence` → match energy, be specific about what's working
- `exam_anxiety` → steady, grounding, focus on what she controls
- `neutral` → friendly and direct, full depth answer

---

## Frontend (Next.js 14 App Router)

**Pages:**
```
/                    → Dashboard (daily summary, streak, today's plan)
/chat                → Companion chat (main AI interface)
/syllabus            → Chapter tracker (11th + 12th coverage)
/practice            → Question bank + chapter tests
/mock                → Mock test engine (NTA-style)
/analytics           → Performance graphs, weak areas
/formulas            → Formula + concept bank
/mistakes            → Mistake journal
/planner             → Study schedule
/pyq                 → Previous year papers
```

**Key components:**
```
CompanionChat        → streaming chat UI, markdown rendering, LaTeX support
MockTestInterface    → NTA-style question palette, timer, section tabs
SyllabusBoard        → 3-column chapter grid with status + weightage
ConceptHeatmap       → accuracy visualization per chapter
StudyTimer           → pomodoro + session logger
FormulaCard          → LaTeX rendered formula with flashcard mode
```

---

## Deployment (Hostinger KVM2)

```bash
# On KVM2 (Ubuntu 22.04)
apt install docker.io docker-compose-plugin
git clone <repo> sara && cd sara
cp .env.example .env  # fill in API keys
docker compose up -d

# Seed knowledge graph (first time only)
docker compose exec api python -m app.db.seed_graph

# SSL (after DNS points to server)
docker compose exec nginx certbot --nginx -d sara.yourdomain.com
```

**Resource allocation on KVM2:**
- Neo4j: 2GB RAM limit
- Postgres: 1GB RAM limit
- API: 1GB RAM limit
- Frontend: 512MB RAM limit
- Workers: 512MB RAM limit

---

## API Endpoints

```
POST /api/chat              → main companion chat (streaming)
POST /api/chat/doubt        → doubt-specific RAG call
GET  /api/syllabus          → chapter completion status
POST /api/syllabus/:id      → update chapter status
GET  /api/analytics         → Sara's performance data
POST /api/practice/start    → start a practice session
POST /api/practice/submit   → submit answer, get feedback
POST /api/mock/start        → start a mock test
POST /api/mock/submit       → submit mock test
GET  /api/mock/:id/analysis → post-mock analysis
GET  /api/formulas          → formula bank (filterable)
GET  /api/mistakes          → Sara's mistake journal
GET  /api/planner           → current study plan
POST /api/planner/generate  → regenerate study plan
GET  /api/pyq               → previous year papers
```

---

## Tech Stack Summary

| Component | Technology | Version |
|---|---|---|
| Frontend | Next.js | 14 |
| Styling | Tailwind CSS | 3 |
| Backend | FastAPI | 0.110+ |
| Graph DB | Neo4j Community | 5 |
| Relational DB | PostgreSQL | 16 |
| Vector Search | pgvector | 0.7 |
| Cache | Redis | 7 |
| LLM | Claude claude-sonnet-4-6 | via API |
| Embeddings | text-embedding-3-small | via OpenAI API |
| Proxy | Nginx | Alpine |
| Runtime | Docker + Docker Compose | Latest |
| Language | Python 3.11, TypeScript | — |
