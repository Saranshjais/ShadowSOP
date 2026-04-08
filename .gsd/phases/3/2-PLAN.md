---
phase: 3
plan: 2
wave: 2
---

# Plan 3.2: Frontend Initialization & Shadcn UI

## Objective
Initialize the React Vite application in the empty `frontend` folder, add Tailwind, and setup Shadcn components.

## Context
- .gsd/DECISIONS.md

## Tasks

<task type="auto">
  <name>Initialize Vite React-TS</name>
  <files>
    - frontend/package.json
  </files>
  <action>
    - Remove `frontend/.gitkeep`.
    - Run `npm create vite@latest . -- --template react-ts` inside the `frontend` directory.
    - Run `npm install` and install dependencies: `react-hook-form`, `lucide-react`, `tailwindcss`, `postcss`, `autoprefixer`.
    - Initialize simple tailwind setup: `npx tailwindcss init -p`.
  </action>
  <verify>Test-Path frontend/package.json</verify>
  <done>Vite is scaffolded inside frontend/.</done>
</task>

<task type="auto">
  <name>Configure Tailwind & Shadcn</name>
  <files>
    - frontend/tailwind.config.js
    - frontend/components.json
  </files>
  <action>
    - Update `frontend/tailwind.config.js` to integrate the "Cyber-Zinc" palette (`bg-zinc-950` root class).
    - Run `npx shadcn-ui@latest init -d` inside `frontend`.
    - Run `npx shadcn-ui@latest add button card textarea scroll-area -y` inside `frontend`.
  </action>
  <verify>Test-Path frontend/components.json</verify>
  <done>Shadcn foundational components loaded into project.</done>
</task>

## Success Criteria
- [ ] Vite successfully replaces empty frontend directory.
- [ ] Tailwind and Shadcn baseline established for Dark Mode.
