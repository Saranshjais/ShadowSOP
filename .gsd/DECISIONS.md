# DECISIONS.md

> Record of Architectural Decision Records (ADRs).

## Phase 1 Decisions

**Date:** 2026-04-08

### Scope
- **Database Migrations:** Decided to skip Alembic/versioning in favor of raw `schema.sql` and `init_db.py` to allow fast DROP/CREATE cycles for the 24-hour sprint.
- **Authentication:** Decided to implement a simple stateless `x-api-key` header mapped explicitly to a test `company_id` for quick MVP execution.

### Approach
- **Database ORM:** Chose **SQLModel**.
- **Reason:** Built by the creator of FastAPI (Tiangolo), it unifies SQLAlchemy DB models and Pydantic validation schemas, avoiding code duplication while keeping the power of an ORM.
- **Project Structure:** Monorepo (`/backend` and `/frontend`).
- **Reason:** Enables fast, unified iterations and simultaneous deployments to Vercel/Railway.

### Constraints
- Development must be heavily time-boxed (24-hour sprint).
- Local infrastructure is simplified via a basic `docker-compose.yml` for PostgreSQL, avoiding complex setups.
