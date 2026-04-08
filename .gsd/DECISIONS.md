# DECISIONS.md

> Record of Architectural Decision Records (ADRs).

## Phase 1 Decisions

**Date:** 2026-04-08

### Scope
- **Database Migrations:** Decided to skip Alembic/versioning in favor of raw `schema.sql` and `init_db.py` to allow fast DROP/CREATE cycles for the 24-hour sprint.
- **Authentication:** Decided to implement a simple stateless `x-api-key` header mapped explicitly to a test `company_id` for quick MVP execution.

### Approach
- **Database ORM:** Chose **SQLModel**.
- **Reason:** Built by the creator of FastAPI (Tiangolo), it unifies SQLAlchemy DB models and Pydantic validation schemas, avoiding code duplication while keeping the power of an ORM.
- **Project Structure:** Monorepo (`/backend` and `/frontend`).
- **Reason:** Enables fast, unified iterations and simultaneous deployments to Vercel/Railway.

### Constraints
- Development must be heavily time-boxed (24-hour sprint).
- Local infrastructure is simplified via a basic `docker-compose.yml` for PostgreSQL, avoiding complex setups.

## Phase 2 Decisions

**Date:** 2026-04-08

### Scope
- **LLM Provider:** Gemini 1.5 Pro, utilizing its massive context window. Keys managed via `.env` and `python-dotenv`.
- **Endpoint Contract:** The `/distill` endpoint follows a "Review First, Save Second" pattern (Synchronous execution, returning structured JSON for Frontend review without immediate DB persistence).

### Approach
- **LLM Extraction Integration:** Option A - Native Structured Outputs.
- **Reason:** Leverages `google-genai` SDK and Pydantic schema enforcing to bypass markdown regex parsing entirely, resulting in robust, predictable JSON returns and minimizing server errors.

### Constraints
- **Latency:** Acceptable to block for 10-15s during inference. Frontend will handle the loading UX.

## Phase 3 Decisions

**Date:** 2026-04-08

### Scope
- **Shadcn/UI Integration:** Decided to use the Shadcn CLI to immediately construct the necessary components component (`button`, `card`, `textarea`, `scroll-area`).
- **"The Forge" Capabilities:** Editor allows Full Add/Remove/Edit functionality.

### Approach
- **Draft Editor Mechanics:** Option A — Controlled React State using `react-hook-form` and `useFieldArray`.
- **Reason:** Provides snappy workspace UX for managing arrays of SOP steps without messy raw JSON input views.
- **Backend CORS:** Integrate `CORSMiddleware` in `main.py` referencing `http://localhost:5173`.
- **Prompt Adjustments:** Update the Gemini system instruction to specify acting as a "Senior Systems Architect" seeking hidden dependencies.

### Constraints
- **Design Aesthetics:** Strongly adhere to the "Cyber-Zinc" theme (`bg-zinc-950`, `text-emerald-500`, `font-mono`) for a high-end minimalist Apple-meets-Linear vibe.

## Phase 4 Decisions

**Date:** 2026-04-08

### Scope
- **Frontend Routing:** Utilize Shadcn `Tabs` to build a "Single-Page Studio" (Forge / Vault) to avoid global state and React Router bloat.
- **Data Rendering:** "The Vault" will render Read-Only views with an "Edit/Remix" button which immediately re-injects the SOP into The Forge for overrides.

### Approach
- **Vault Save Operation:** Implement Atomic Transaction logic in `POST /sops` rather than leveraging implicit ORM recursion to guarantee stability under pressure.
- **Handshake Logic:** Modify `verify_api_key` to strictly resolve the exact `company_id` for DB attachment.

### Constraints
- **Notifications:** Integrate `sonner` via UI libraries immediately to provide polished "SOP Vaulted Successfully" toasts to maximize demo factor.

## Phase 5 Decisions

**Date:** 2026-04-08

### Scope
- **Markdown Export:** Expand functionality to permit Frontend-Only Export generation from BOTH `Forge.tsx` (unsaved drafts) and `Vault.tsx` (permanent assets).
- **Loading UI:** Adopt a Hybrid strategy. `Vault.tsx` employs `Skeleton` UI patterns for predictable layout pacing, while `Forge.tsx` outputs dynamic "AI-at-work" pulsing text logic to mediate latency psychology.

### Approach
- **AI Engine Upgrade:** Modify `ai_service.py` pointing inference toward the ultra-fast `gemini-3-flash-preview` instead of `1.5-pro` to significantly decrease processing cycles and adhere rigidly to MVP execution speed priorities.
- **Export Utility:** Pure frontend JavaScript functional mapping to Text Blob strings bypassing Backend API overhead.

### Constraints
- **Error Transparency:** Map explicit Toaster notifications targeting LLM failures (e.g. rate limits) with actionable hints to maintain the high-end Apple-meets-Linear professional aesthetic.
