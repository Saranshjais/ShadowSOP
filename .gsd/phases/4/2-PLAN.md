---
phase: 4
plan: 2
wave: 2
---

# Plan 4.2: Frontend Single-Page Studio Foundation

## Objective
Elevate the UX with Shadcn Tabs mapping, Toaster notifications, and App-level State to connect Forge + Vault natively.

## Context
- frontend/src/App.tsx
- frontend/src/components/Forge.tsx

## Tasks

<task type="auto">
  <name>Design Tabs & Toaster Mechanics</name>
  <files>
    - frontend/src/App.tsx
  </files>
  <action>
    - Establish `activeTab` state ("forge" vs "vault").
    - Implement a very fast local `<Tabs />` UI block in `App.tsx`.
    - Implement an in-memory `toast()` mock utilizing fixed positioning for maximum visual appeal during demo.
  </action>
  <verify>cat frontend/src/App.tsx | Select-String "activeTab"</verify>
  <done>App.tsx wraps logic acting as a strict Single-Page Studio.</done>
</task>

<task type="auto">
  <name>Add Saving Logic</name>
  <files>
    - frontend/src/components/Forge.tsx
  </files>
  <action>
    - Add `handleSaveToVault` integrating a `fetch("POST", "/api/v1/sops")`.
    - Upon HTTP 200, fire the success Toast and clear the Editor explicitly.
  </action>
  <verify>cat frontend/src/components/Forge.tsx | Select-String "handleSave"</verify>
  <done>Forge fully respects data transport parameters.</done>
</task>

## Success Criteria
- [ ] UI is robust, non-reloading, zero-flicker routing.
- [ ] Toast notification acts as a polished finishing touch.
