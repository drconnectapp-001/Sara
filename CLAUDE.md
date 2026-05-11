# Sara — JEE Companion AI · Agent Handoff Guide

## What This Project Is

A deeply personal AI companion and study platform built exclusively for Sara,
an 11th grade student preparing for JEE Mains 2027. This is NOT a generic
study app. It is a friend that knows her academic journey, her emotional state,
her weak concepts, and responds with that context every single time.

Two things make it special:
1. **Graph-embedded JEE knowledge** — concepts stored as a graph in Neo4j so
   the AI walks concept relationships (not just text similarity) when answering doubts
2. **Personal memory** — Sara's scores, mistakes, mood signals, and history
   are retrieved before every AI response so it always feels personal

## Owner & Context

- Built for: Sara (11th grade, JEE Mains 2027 target)
- Subjects: Physics, Chemistry, Mathematics
- Hosting: Hostinger KVM2 VPS (Docker)
- Primary developer: Guruprasath (mediverx@gmail.com)
- AI model: Claude claude-sonnet-4-6 via Anthropic API
- Embeddings: text-embedding-3-small via OpenAI API

---

## Repository Structure

```
sara/
├── CLAUDE.md              ← YOU ARE HERE — read first
├── ARCHITECTURE.md        ← full technical blueprint
├── BUILD_STATUS.md        ← what is done, what is next
├── docker-compose.yml     ← spins up all services locally
├── .env.example           ← required environment variables
├── .gitignore
│
├── frontend/              ← Next.js 14 (Sara's UI)
│   ├── Dockerfile
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── app/           ← App Router pages
│       ├── components/    ← UI components
│       ├── lib/           ← API client, utils
│       └── types/         ← TypeScript types
│
├── backend/               ← Python FastAPI (the brain)
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── main.py            ← FastAPI entry point
│   └── app/
│       ├── api/           ← route handlers
│       ├── core/          ← config, settings
│       ├── db/            ← postgres + neo4j clients
│       ├── memory/        ← Sara's memory engine
│       ├── rag/           ← RAG pipeline
│       │   ├── pipeline.py       ← orchestrator
│       │   ├── graph_query.py    ← Neo4j traversal
│       │   ├── vector_search.py  ← pgvector search
│       │   └── context_builder.py← assembles Claude context
│       ├── companion/     ← companion persona + prompts
│       └── models/        ← Pydantic schemas
│
├── workers/
│   └── embedding/         ← background embedding pipeline
│       ├── Dockerfile
│       ├── worker.py      ← processes content → embeddings
│       └── requirements.txt
│
├── nginx/
│   └── nginx.conf         ← reverse proxy config
│
└── data/
    ├── graph/
    │   └── seed.cypher    ← Neo4j JEE knowledge graph seed
    └── seed/
        └── init.sql       ← PostgreSQL schema + initial data
```

---

## Services (docker-compose)

| Service | Port | What it does |
|---|---|---|
| `frontend` | 3000 | Next.js — Sara's UI |
| `api` | 8000 | FastAPI — all backend logic |
| `neo4j` | 7474, 7687 | Knowledge graph database |
| `postgres` | 5432 | Sara's data + vector embeddings |
| `redis` | 6379 | Session cache, rate limiting |
| `embedding_worker` | — | Background: embeds JEE content |
| `nginx` | 80, 443 | Reverse proxy, SSL termination |

---

## How to Run Locally

```bash
# 1. Copy env file and fill in API keys
cp .env.example .env

# 2. Start all services
docker compose up --build

# 3. Wait ~60s for Neo4j to initialize, then seed the graph
docker compose exec api python -m app.db.seed_graph

# 4. Open in browser
http://localhost:3000
```

---

## Critical Architecture Decisions

### Why Neo4j + pgvector (not just one DB)?
- **Neo4j**: traverses concept relationships (prerequisite chains, cross-subject
  bridges). Standard vector search can't do "find all concepts that require
  this concept as a prerequisite"
- **pgvector**: semantic similarity search WITHIN the graph neighborhood
  returned by Neo4j. Both work together, not in competition.

### Why FastAPI (Python) not Node.js?
LangChain/LangGraph, Neo4j driver, pgvector, and ML tooling all have better
Python support. Frontend stays Next.js (TypeScript).

### RAG Pipeline Flow (important — read before touching rag/)
```
User message
  → extract_concepts()        [mini Claude call]
  → neo4j_traverse()          [Cypher query, depth 2]
  → pgvector_search()         [within graph neighborhood]
  → memory_retrieve()         [Sara's personal context]
  → build_context()           [assembles everything]
  → claude_respond()          [claude-sonnet-4-6]
  → memory_update()           [store this interaction]
```

### Companion Persona Rule
The system prompt always includes Sara's emotional state + academic context.
Claude must respond as a knowledgeable friend, not a tutor. If she's burnt out,
acknowledge it before helping. If she keeps making the same mistake, name it.
See `backend/app/companion/prompts.py` for the full persona template.

---

## Environment Variables Required

```
ANTHROPIC_API_KEY     ← Claude API (responses)
OPENAI_API_KEY        ← text-embedding-3-small (embeddings only)
NEO4J_URI             ← bolt://neo4j:7687
NEO4J_USER            ← neo4j
NEO4J_PASSWORD        ← set in .env
POSTGRES_URL          ← postgresql://...
REDIS_URL             ← redis://redis:6379
JWT_SECRET            ← random secret for Sara's auth
```

---

## Current Build Status

→ See **BUILD_STATUS.md** for exact status of every component.

---

## For the Next Agent Continuing This Work

1. Read `BUILD_STATUS.md` first — it tells you exactly where work stopped
2. Read `ARCHITECTURE.md` for the full technical blueprint
3. The most important files to understand before writing code:
   - `backend/app/rag/pipeline.py` — the core intelligence loop
   - `backend/app/memory/engine.py` — Sara's memory system
   - `backend/app/companion/prompts.py` — the companion persona
   - `data/graph/seed.cypher` — how JEE knowledge is structured
4. Never hardcode Sara's name or data — always read from `sara_profile` table
5. Never make the AI sound generic — every response must use memory context
6. Test the RAG pipeline with: `docker compose exec api python -m app.rag.test`

---

## What This Is NOT

- Not a multi-user platform (built only for Sara)
- Not a content creation tool (JEE content is seeded, not user-generated)
- Not a generic chatbot (every response is shaped by Sara's specific history)
