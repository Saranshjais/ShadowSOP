---
phase: 3
plan: 3
wave: 3
---

# Plan 3.3: "The Forge" Layout & Logic

## Objective
Build the split-screen Ingestion UI and Draft Editor with full Add/Remove/Edit capabilities.

## Context
- frontend/src/App.tsx
- frontend/src/components/Forge.tsx

## Tasks

<task type="auto">
  <name>Build "The Forge" UI</name>
  <files>
    - frontend/src/components/Forge.tsx
  </files>
  <action>
    - Create `Forge.tsx` as a split screen (Grid 2 cols).
    - Left Side: Shadcn Textarea for pasting chaos, "Distill" button.
    - Right Side: The Draft Editor. Render forms using `react-hook-form`'s `useFieldArray` to loop over the returned `steps` array. Add "Add Step" and "Remove" buttons for full operational control.
    - Ensure background is `bg-zinc-950` and text is highly legible dark mode with `font-mono` where appropriate.
  </action>
  <verify>cat frontend/src/components/Forge.tsx | Select-String "useFieldArray"</verify>
  <done>Component provides split screen and dynamic editing logic.</done>
</task>

<task type="auto">
  <name>Wire API to Frontend</name>
  <files>
    - frontend/src/App.tsx
  </files>
  <action>
    - Update `App.tsx` to mount `Forge`.
    - Provide raw fetch logic connecting to `http://localhost:8000/api/v1/distill`, parsing Response, and defaulting the React Hook Form `useFieldArray` contents.
  </action>
  <verify>cat frontend/src/App.tsx | Select-String "Forge"</verify>
  <done>App.tsx serves the Forge core.</done>
</task>

## Success Criteria
- [ ] Operational Draft Editor capable of mutation.
- [ ] Left to right UX mapping active.
