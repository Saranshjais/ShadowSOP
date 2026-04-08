# ARCHITECTURE.md

## System Overview
ShadowSOP is a web application with a separated frontend and backend.

## Frontend
- **Framework**: React via Vite
- **Styling**: Tailwind CSS
- **Components**: Shadcn/UI for rapid deployment, Lucide Icons
- **Visuals**: Dark mode, developer-centric monospace fonts

## Backend
- **Framework**: FastAPI (Python 3.11+)
- **Data Validation**: Pydantic
- **AI Orchestration**: Direct API calls to Text-only LLMs (Gemini / GPT-4o)

## Database
- **Type**: PostgreSQL (Relational)
- **Tables**: `companies`, `sops`, `steps`, `edge_cases`
