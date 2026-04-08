---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Project Skeleton & Database Schema

## Objective
Initialize the monorepo directory structure, set up local PostgreSQL via Docker Compose, and define the raw SQL schema.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- project-info/srs.md

## Tasks

<task type="auto">
  <name>Initialize Monorepo Structure & Docker Compose</name>
  <files>
    - docker-compose.yml
    - backend/.gitkeep
    - frontend/.gitkeep
  </files>
  <action>
    - Create the `backend/` and `frontend/` directories.
    - Create `docker-compose.yml` with the specified postgres:15 service and volume mapping.
  </action>
  <verify>docker-compose config</verify>
  <done>docker-compose.yml is valid and directories exist.</done>
</task>

<task type="auto">
  <name>Create Database Schema Script</name>
  <files>
    - backend/schema.sql
  </files>
  <action>
    - Extract the PostgreSQL `CREATE TABLE` scripts exactly from `project-info/srs.md` into `backend/schema.sql`.
    - Ensure tables exist: `companies`, `sops`, `steps`, `edge_cases`.
    - At the top of the file, add `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` since the tables rely on `uuid_generate_v4()`.
  </action>
  <verify>cat backend/schema.sql | Select-String "CREATE TABLE companies"</verify>
  <done>schema.sql perfectly matches the SRS database definitions.</done>
</task>

## Success Criteria
- [ ] Monorepo directories exist.
- [ ] `docker-compose.yml` is valid and ready to run.
- [ ] `backend/schema.sql` is completely replicated from SRS.
