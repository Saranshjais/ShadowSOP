---
phase: 4
plan: 1
wave: 1
---

# Plan 4.1: Backend Data Handshake & CRUD

## Objective
Establish the `Company_ID` data relationship and the Atomic `POST /sops` operation.

## Context
- backend/auth.py
- backend/main.py
- .gsd/DECISIONS.md

## Tasks

<task type="auto">
  <name>Implement API Key Handshake</name>
  <files>
    - backend/auth.py
  </files>
  <action>
    - Update `verify_api_key` to accept the `db: Session` context.
    - Validate `x-api-key` against the `Company` table (`dev-test-key-123`).
    - If the `Company` doesn't exist, magically create it (Mock Seed logic) so it doesn't fail.
    - Return `company.id`.
  </action>
  <verify>cat backend/auth.py | Select-String "company.id"</verify>
  <done>Auth explicitly hands back a reliable Company UUID.</done>
</task>

<task type="auto">
  <name>Implement Vault DB Routes</name>
  <files>
    - backend/main.py
  </files>
  <action>
    - Register `POST /api/v1/sops` applying the Atomic Transaction logic (Insert SOP -> loop Insert Steps -> loop Insert EdgeCases -> commit).
    - Register `GET /api/v1/sops` returning all SOPs bound to the `company_id`.
  </action>
  <verify>cat backend/main.py | Select-String "db.add(new_sop)"</verify>
  <done>Vault API accurately reads and maps nested payloads securely.</done>
</task>

## Success Criteria
- [ ] Backend ensures Strict Data Isolation via company_id mapping.
- [ ] Atomic transactions pass gracefully.
