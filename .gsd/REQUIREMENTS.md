# REQUIREMENTS.md

## Format
| ID | Requirement | Source | Status |
|----|-------------|--------|--------|
| REQ-01 | REST Endpoint `POST /api/v1/distill` accepts unstructured text | SPEC Goal 1 | Pending |
| REQ-02 | System sends prompt to Text-only LLM (Gemini/GPT-4o) for data extraction | SPEC Goal 1 | Pending |
| REQ-03 | LLM output is strictly JSON mapping to Goal, Prerequisites, Steps, Edge Cases, Missing Info | SPEC Goal 1 | Pending |
| REQ-04 | User Interface ("The Forge") with split screen (raw text on left, editor on right) | SPEC Goal 2 | Pending |
| REQ-05 | System persists Draft SOPs to PostgreSQL Database (SOPs, Steps, Edge Cases tables) | SPEC Goal 2 | Pending |
| REQ-06 | Dashboard ("The Vault") displays library of saved SOPs in card-grid | SPEC Goal 3 | Pending |
| REQ-07 | Users can filter/search the SOP Library by category/department | SPEC Goal 3 | Pending |
| REQ-08 | Capability to Export an SOP to Markdown format | SPEC Goal 4 | Pending |
| REQ-09 | Hardcoded or header-based MVP Authentication | SPEC Constraint | Pending |
