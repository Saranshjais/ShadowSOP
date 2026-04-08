---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Backend Adjustments

## Objective
Enable CORS so the frontend development server can connect, and update the Gemini prompt.

## Context
- backend/main.py
- backend/ai_service.py

## Tasks

<task type="auto">
  <name>Configure CORS</name>
  <files>
    - backend/main.py
  </files>
  <action>
    - Add `CORSMiddleware` to the FastAPI app, explicitly allowing `<origin>` `http://localhost:5173`.
    - Ensure `allow_credentials=True`, `allow_methods=["*"]`, `allow_headers=["*"]`.
  </action>
  <verify>cat backend/main.py | Select-String "CORSMiddleware"</verify>
  <done>CORS is correctly configured.</done>
</task>

<task type="auto">
  <name>Refine AI System Prompt</name>
  <files>
    - backend/ai_service.py
  </files>
  <action>
    - Update `system_instruction` to: "You are a Senior Systems Architect. Analyze the following unstructured communication. Identify the primary objective and decompose it into a high-density, step-by-step SOP. If you encounter ambiguity (e.g., 'the server' without specifying which one), flag it in the 'missing_info_queries' field. Your output must be strictly valid JSON according to the provided schema."
  </action>
  <verify>cat backend/ai_service.py | Select-String "Senior Systems Architect"</verify>
  <done>AI prompt properly aligned with Phase 3 refinements.</done>
</task>

## Success Criteria
- [ ] Backend accepts requests from `localhost:5173`.
- [ ] Model prompt optimized for Senior Systems Architecture.
