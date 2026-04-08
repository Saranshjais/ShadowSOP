---
phase: 5
plan: 2
wave: 2
---

# Plan 5.2: Frontend Export Utility & Error Handling

## Objective
Establish zero-latency Frontend markdown exports and structured error toast bindings.

## Context
- frontend/src/components/Forge.tsx
- frontend/src/components/Vault.tsx

## Tasks

<task type="auto">
  <name>Vanilla JS Markdown Extraction</name>
  <files>
    - frontend/src/lib/export.ts
  </files>
  <action>
    - Ensure `lib` directory exists.
    - Create `exportToMarkdown(sopData)` utility that maps the `SOPDistilled` schema to explicit `Blob` strings and forces window download as `.md`.
  </action>
  <verify>Test-Path frontend/src/lib/export.ts</verify>
  <done>Export Logic lives as pure stateless JS payload.</done>
</task>

<task type="auto">
  <name>Bind Export and Failure States</name>
  <files>
    - frontend/src/components/Forge.tsx
    - frontend/src/components/Vault.tsx
    - frontend/src/App.tsx
  </files>
  <action>
    - App.tsx: Make `showToast` available to children or handle error state lifting if a `500` HTTP response triggers in Forge. Forge shows "Gemini: Input too vague. Add more context." via red styled text or standard layout toast.
    - Forge.tsx: Hook up a new `Export to .md` button that executes `exportToMarkdown` without DB interaction.
    - Vault.tsx: Hook up `Export` mapped directly onto each returned SOP Card.
  </action>
  <verify>cat frontend/src/components/Forge.tsx | Select-String "exportToMarkdown"</verify>
  <done>System handles Exporting correctly and respects LLM failure states gracefully.</done>
</task>

## Success Criteria
- [ ] Markdown downloaded dynamically matching exact Draft/Vault contents.
- [ ] Explicit error notifications to manage bad unstructured text gracefully.
