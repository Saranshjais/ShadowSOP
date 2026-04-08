---
phase: 1
plan: 3
wave: 2
---

# Plan 1.3: Models, Auth, and Main

## Objective
Define the SQLModel classes to match the schema, implement the `x-api-key` auth dependency, and set up the main FastAPI app.

## Context
- project-info/srs.md
- backend/schema.sql

## Tasks

<task type="auto">
  <name>Implement SQLModel Models</name>
  <files>
    - backend/models.py
  </files>
  <action>
    - Create SQLModel classes (`Company`, `SOP`, `Step`, `EdgeCase`) that map correctly to the database tables (`table=True`).
    - Define precise relationships and UUID types as outlined in the SRS.
  </action>
  <verify>python -c "import ast; ast.parse(open('backend/models.py').read())"</verify>
  <done>models.py defines all required SQLModel entities.</done>
</task>

<task type="auto">
  <name>Implement Auth Dependency & FastAPI App</name>
  <files>
    - backend/auth.py
    - backend/main.py
  </files>
  <action>
    - Create `backend/auth.py` containing the `verify_api_key(x_api_key: str = Header(...))` dependency ensuring `"dev-test-key-123"` is matched.
    - Create `backend/main.py` scaffolding the FastAPI application instance. Include a simple `/health` GET endpoint. Include `auth.py` and `database.py`.
  </action>
  <verify>python -c "import ast; ast.parse(open('backend/main.py').read())"</verify>
  <done>FastAPI app starts properly with the auth dependency available.</done>
</task>

## Success Criteria
- [ ] SQLModel models accurately mirror manually written SQL fields.
- [ ] The global auth dependency is ready for route protection.
- [ ] The `main.py` runner script is established.
