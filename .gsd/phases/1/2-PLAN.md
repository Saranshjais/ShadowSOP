---
phase: 1
plan: 2
wave: 1
---

# Plan 1.2: Backend Foundation & Database Connection

## Objective
Configure FastAPI backend dependencies, implement the raw SQL initialization script, and set up database connection handling.

## Context
- .gsd/DECISIONS.md
- backend/schema.sql

## Tasks

<task type="auto">
  <name>Setup Backend Dependencies</name>
  <files>
    - backend/requirements.txt
  </files>
  <action>
    - Create `requirements.txt` with: `fastapi`, `uvicorn`, `sqlmodel`, `psycopg2-binary`.
  </action>
  <verify>cat backend/requirements.txt | Select-String sqlmodel</verify>
  <done>Dependencies are specifically documented.</done>
</task>

<task type="auto">
  <name>Implement Database Connection & Initialization Script</name>
  <files>
    - backend/database.py
    - backend/init_db.py
  </files>
  <action>
    - Create `backend/database.py` defining the standard SQLModel `engine = create_engine(DATABASE_URL)` and `def get_db()` session dependency.
    - The `DATABASE_URL` should default to `postgresql://admin:password@localhost:5432/shadowsop`.
    - Create `backend/init_db.py` to connect to the DB using `psycopg2`, read the `schema.sql` file, and execute its contents. This allows easy drop/recreate data runs.
  </action>
  <verify>python -c "import ast; ast.parse(open('backend/database.py').read())"</verify>
  <done>database.py and init_db.py are implemented without syntax errors.</done>
</task>

## Success Criteria
- [ ] Requirements are documented.
- [ ] `database.py` exports DB execution engine and session dependency.
- [ ] `init_db.py` can be executed to quickly populate tables.
