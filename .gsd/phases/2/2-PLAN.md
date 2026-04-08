---
phase: 2
plan: 2
wave: 2
---

# Plan 2.2: AI Service & Distill Endpoint

## Objective
Implement the Gemini prompt and the synchronous POST `/distill` endpoint to return structured JSON.

## Context
- .env
- .gsd/DECISIONS.md
- backend/schemas.py

## Tasks

<task type="auto">
  <name>Implement Gemini Generative AI Service</name>
  <files>
    - backend/ai_service.py
  </files>
  <action>
    - Import `dotenv` and `os` to load env variables.
    - Create `def distill_sop(...) -> schemas.SOPDistilled:`
    - Initialize Gemini using `google.genai`. Connect to `"models/gemini-1.5-pro"`.
    - Use system instruction: "You are a Technical Operations Consultant. Identify hidden dependencies..."
    - Enforce `response_schema=schemas.SOPDistilled` through `client.models.generate_content`.
    - Return the parsed Pydantic object.
  </action>
  <verify>python -c "import ast; ast.parse(open('backend/ai_service.py').read())"</verify>
  <done>ai_service.py compiles without syntax errors.</done>
</task>

<task type="auto">
  <name>Implement POST /distill Route</name>
  <files>
    - backend/main.py
  </files>
  <action>
    - Import `schemas` and `ai_service`.
    - Register `@app.post("/api/v1/distill", response_model=schemas.SOPDistilled)`.
    - Route takes `request: schemas.DistillRequest`.
    - The route calls `ai_service.distill_sop()` synchronously, guarded by the API key dependency.
  </action>
  <verify>python -c "import ast; ast.parse(open('backend/main.py').read())"</verify>
  <done>main.py compiles with the new endpoint.</done>
</task>

## Success Criteria
- [ ] AI service defines Gemini structured logic.
- [ ] POST `/distill` successfully bridges the AI core.
