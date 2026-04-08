---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Dependencies and Structured Models

## Objective
Add dependencies for Gemini API and create the Pydantic schemas that enforce structured outputs for the AI responses.

## Context
- project-info/srs.md
- .gsd/DECISIONS.md

## Tasks

<task type="auto">
  <name>Update requirements</name>
  <files>
    - backend/requirements.txt
  </files>
  <action>
    - Append `google-genai` and `python-dotenv` to `backend/requirements.txt`.
  </action>
  <verify>cat backend/requirements.txt | Select-String "google-genai"</verify>
  <done>Dependencies documented.</done>
</task>

<task type="auto">
  <name>Create Pydantic API Schemas</name>
  <files>
    - backend/schemas.py
  </files>
  <action>
    - Create `schemas.py`.
    - Add `SOPStep`, `SOPEdgeCase`, and `SOPDistilled` Pydantic models from Phase 2 planning.
    - Create `DistillRequest(BaseModel)` containing `source_text: str` and `context_hints: Optional[str] = None` as defined in the SRS.
  </action>
  <verify>python -c "import ast; ast.parse(open('backend/schemas.py').read())"</verify>
  <done>Pydantic schemas successfully parse.</done>
</task>

## Success Criteria
- [ ] Dependencies updated
- [ ] Schemas created for structured output and request input
