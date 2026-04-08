Software Requirements Specification (SRS): ShadowSOP1. Executive SummaryShadowSOP is an AI-native utility that captures "conversational exhaust" (Slack dumps, email chains, messy transcripts) and transforms it into structured, actionable Standard Operating Procedures (SOPs). It eliminates the "documentation tax" by automating the transition from conversation to institutional knowledge.2. System ArchitectureFrontend: React (Vite), Tailwind CSS, Lucide Icons, Shadcn/UI (for rapid component deployment).Backend: FastAPI (Python 3.11+), Pydantic for data validation.Database: PostgreSQL (Relational).AI Orchestration: Text-only LLM (Gemini 1.5 Pro or GPT-4o) via REST API.3. Functional Requirements3.1 Ingestion Engine (POST /api/v1/distill)Input: Raw text blob (unstructured).Logic: The system must send a structured prompt to the LLM to identify:Goal: What is being achieved?Prerequisites: What is needed before starting?Steps: A numbered sequence of actions.Edge Cases: "If/Then" logic found in the text.Missing Info: Questions the AI has to clarify the process.Output: A JSON object matching the SOP schema.3.2 SOP ManagementDraft Mode: Users can edit the AI-generated steps before committing to the DB.Library: A searchable list of all saved SOPs categorized by "Department" or "Project."Export: Generate a clean Markdown or PDF version of the SOP for sharing.4. Database Schema (PostgreSQL)SQL-- Table: Companies (for multi-tenancy)
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: SOPs
CREATE TABLE sops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    raw_source_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: Steps
CREATE TABLE steps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sop_id UUID REFERENCES sops(id) ON DELETE CASCADE,
    step_order INT NOT NULL,
    action TEXT NOT NULL,
    context_notes TEXT
);

-- Table: Edge_Cases
CREATE TABLE edge_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sop_id UUID REFERENCES sops(id) ON DELETE CASCADE,
    condition TEXT NOT NULL,
    resolution TEXT NOT NULL
);
5. API Contract (FastAPI)POST /distillPayload:JSON{
  "source_text": "string",
  "context_hints": "string (optional)"
}
Response (AI Generated):JSON{
  "title": "Refund Process for Stripe",
  "steps": [
    {"order": 1, "action": "Login to Stripe Dashboard", "notes": "Use the support@ account"},
    {"order": 2, "action": "Search for Customer Email", "notes": ""}
  ],
  "edge_cases": [
    {"condition": "If transaction is older than 90 days", "resolution": "Refer to manager for manual wire."}
  ]
}
6. Prompt Engineering SpecificationThe system prompt must be strictly enforced:"You are a world-class Technical Writer. I will provide a messy conversation. Extract a structured SOP. Return ONLY a JSON object. Do not include conversational filler. Focus on imperative verbs for steps."7. UI/UX RequirementsScreen A: The "Forge": A split-screen view. Left side is a large textarea for pasting raw text. Right side is a loading state that transitions into the "Draft SOP" editor.Screen B: The "Vault": A card-based grid showing existing SOPs with search and filter functionality.Visual Style: Dark mode, high-contrast, "Developer-centric" (using monospace fonts for step previews).8. 24-Hour Production RoadmapTimeblockGoalDeliverable00:00 - 03:00Backend FoundationFastAPI setup, Postgres connection, Pydantic models.03:00 - 06:00AI IntegrationPrompt tuning, /distill endpoint testing with real Slack logs.06:00 - 12:00Frontend CoreReact setup, Tailwind theme, Ingestion UI, Draft Editor.12:00 - 16:00CRUD CompletionSaving Drafts to SQL, Library View, Delete/Edit functionality.16:00 - 20:00PolishingLoading skeletons, Error handling for API failures, Markdown Export.20:00 - 24:00DeploymentVercel (Frontend) + Railway (Backend/DB). Final smoke test.Partner's Note to Developer:Skip custom auth for the MVP—use a hardcoded organization_id or basic Header-based API key to save 3 hours. Focus your energy on the prompt accuracy and the Draft Edit experience. That is where the value is.