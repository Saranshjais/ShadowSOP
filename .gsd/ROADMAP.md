# ROADMAP.md

> **Current Phase**: Not started
> **Milestone**: v1.0

## Must-Haves (from SPEC)
- [ ] Ingestion Engine & LLM Integration (POST /api/v1/distill)
- [ ] Split-screen Draft Editor ("The Forge")
- [ ] PostgreSQL Database connection & schema definitions
- [ ] SOP Library View ("The Vault")

## Phases

### Phase 1: Backend Foundation & DB Schema
**Status**: ✅ Complete
**Objective**: Setup FastAPI, Postgres connection, Pydantic models & SQL Tables.
**Requirements**: REQ-05, REQ-09

### Phase 2: AI Integration & Ingestion
**Status**: ✅ Complete
**Objective**: Prompt tuning and implementation of `/distill` endpoint.
**Requirements**: REQ-01, REQ-02, REQ-03

### Phase 3: Frontend Core & Draft Editor
**Status**: ✅ Complete
**Objective**: React setup, Tailwind theme, "The Forge" Ingestion UI & Draft Editor.
**Requirements**: REQ-04

### Phase 4: CRUD Completion & The Vault
**Status**: ✅ Complete
**Objective**: Saving drafts to SQL, Library View, Delete/Edit functionality.
**Requirements**: REQ-06, REQ-07

### Phase 5: Polishing & Export
**Status**: ✅ Complete
**Objective**: Loading skeletons, error handling, Markdown Export.
**Requirements**: REQ-08

### Phase 6: Deployment
**Status**: 🏃 In Progress
**Objective**: Deploy the application on GitHub and host it on Render (Multi-service).
**Requirements**: N/A
