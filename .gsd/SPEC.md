# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
ShadowSOP is an AI-native utility that captures "conversational exhaust" (Slack dumps, email chains, messy transcripts) and transforms it into structured, actionable Standard Operating Procedures (SOPs). It eliminates the "documentation tax" by automating the transition from conversation to institutional knowledge.

## Goals
1. Extract step-by-step SOPs from unstructured conversation logs using LLMs.
2. Provide a Draft Editor ("The Forge") to manage and refine AI-generated SOPs.
3. Manage saved SOPs categorized by "Department" or "Project".
4. Enable Export of SOPs into clean Markdown formats.

## Non-Goals (Out of Scope)
- Custom complex authentication for the MVP (using hardcoded org_id or basic header API key).
- Ingesting audio/video sources natively (text-based ingestion only).
- Advanced collaboration/multiplayer editing features.

## Users
Teams and organizations seeking to document their processes efficiently without the manual overhead of writing down standard operating procedures from scratch.

## Constraints
- **Technical**: React (Vite) frontend, FastAPI (Python 3.11+) backend, PostgreSQL DB, REST API text-only LLM (Gemini/GPT-4o).
- **Time**: Target 24-hour development cycle for MVP (skip auth, focus on prompt and editor).
- Prompt accuracy and Draft Edit experience are the primary focal points of the MVP.

## Success Criteria
- [ ] Users can paste a conversational blob and receive a validated, structured JSON SOP.
- [ ] Draft SOPs can be edited and saved to the PostgreSQL database.
- [ ] Users can view existing SOPs in a card-based grid ("The Vault").
- [ ] SOPs can be exported cleanly to Markdown or PDF.
