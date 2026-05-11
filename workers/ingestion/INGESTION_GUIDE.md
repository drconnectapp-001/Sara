# PDF Ingestion Pipeline — Operational Guide

## Status
✅ **Pipeline validated with dry-run** on Laws of Motion (keph104.pdf)
- Extracted: 56 sections, 12 examples
- No database errors
- Ready for production ingestion

## Next Steps

### 1. Start Docker Compose
```bash
cd /Users/guruprasath/Documents/Sara
docker compose up --build
```

Wait for all services to be healthy (check `docker compose ps`):
- postgres ✅
- neo4j ✅
- redis ✅
- api ✅
- embedding_worker ✅
- frontend ✅
- nginx ✅

### 2. Run Single-Chapter Ingestion (Test Run)
```bash
cd workers/ingestion
./venv/bin/python3 ingest.py --pdf-dir ../../Class-11 --file keph104.pdf
```

This will:
1. Parse keph104.pdf → 56 sections + 12 examples
2. Extract concepts/formulas via Claude Haiku (async, batched)
3. Write concept nodes + edges to Neo4j
4. Write NCERT section chunks to pgvector
5. Print success/failure count

Expected output:
```
Processing: keph104.pdf
  Chapter : Laws of Motion
  Success : 1/1
  Concepts extracted : ~25-30
  Embeddings queued : 56 chunks + 25 concepts
```

### 3. Verify Neo4j Graph
Open http://localhost:7474 (Neo4j Browser)
```cypher
MATCH (c:Concept {chapter: "phy11-04"}) RETURN c LIMIT 10
```

Should see Newton's Laws, Force, Acceleration, etc.

### 4. Verify pgvector Embeddings
In a postgres client:
```sql
SELECT COUNT(*) FROM ncert_chunks WHERE chapter_id = 'phy11-04';
SELECT COUNT(*) FROM concept_embeddings WHERE chapter = 'phy11-04' AND embedding IS NOT NULL;
```

### 5. Process All Remaining 49 PDFs
Once step 2 passes, run full ingestion:
```bash
cd workers/ingestion
./venv/bin/python3 ingest.py --pdf-dir ../../Class-11
```

### Full Ingestion Time Estimate
- 50 PDFs × ~2 min per PDF = ~100 minutes total
- Haiku calls: ~1250 sections × $0.001/1k = ~$1.25
- Embedding calls: ~1250 chunks × $0.02/1M = ~$0.03
- **Total API cost**: ~$1.30

### Troubleshooting

**Error: "connection refused" to Neo4j/Postgres**
- Check Docker services: `docker compose ps`
- Check logs: `docker compose logs postgres`

**Error: "ANTHROPIC_API_KEY not set"**
- Add to .env: `ANTHROPIC_API_KEY=sk-ant-...`

**Error: Haiku extraction fails**
- Check OpenAI key (for embeddings)
- Check Anthropic key (for extraction)
- Check rate limits

**Process hangs**
- Default concurrency = 5 Haiku calls simultaneously
- Reduce in concept_extractor.py if rate-limited

## Environment Variables (.env)
```
ANTHROPIC_API_KEY=sk-ant-xxx
OPENAI_API_KEY=sk-xxx
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password
POSTGRES_URL=postgresql://neondb_owner:password@localhost:5432/neondb
```

## Architecture Notes

**PDF Parsing** → **Concept Extraction** → **Graph + Vector Store**
```
keph104.pdf
  ↓ (pdfplumber)
56 sections + 12 examples
  ↓ (Haiku extraction, batched)
Concepts {name, definition, prerequisites, formulas, cross-links}
  ↓
Neo4j: Concept nodes + REQUIRES/CONFUSED_WITH/BRIDGES_TO edges
pgvector: ncert_chunks with embeddings for retrieval
```

The graph provides **structure** (what concepts depend on what).
The vector store provides **content** (precise NCERT explanations).
Together they power the RAG pipeline in the chat API.
