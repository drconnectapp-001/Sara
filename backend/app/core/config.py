from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    anthropic_api_key: Optional[str] = None  # not used — chat runs via Ollama
    openai_api_key: str                       # used for wiki chunk embeddings

    postgres_url: str
    neo4j_uri: str = "bolt://neo4j:7687"
    neo4j_user: str = "neo4j"
    neo4j_password: str
    redis_url: str = "redis://redis:6379"

    jwt_secret: str
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24 * 30  # 30 days

    environment: str = "development"
    log_level: str = "INFO"
    frontend_url: str = "http://localhost:3000"

    # Sara's profile ID (single user — no multi-tenancy)
    sara_id: str = "sara"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
