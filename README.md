# 🛡️ ShadowSOP

**ShadowSOP** is an AI-native organizational utility built to instantly transform chaotic conversational exhaust (Zoom transcripts, Slack dumps, meeting notes) into highly structured, actionable Standard Operating Procedures (SOPs).

---

## ⚡ Features

* 🔨 **The Forge:** An interactive workspace where users paste raw text. The backend queries Google Gemini 1.5 strictly enforcing a JSON schema to return deterministic, formatted steps.
* 📋 **Human-in-the-loop Editing:** Generated steps map directly into React Hook Forms, allowing humans to edit, add, or delete steps before saving into the database.
* 🏦 **The Vault:** A unified library of all saved SOPs complete with an instant Markdown Export feature.
* 🤖 **Resilient AI Handling:** Built-in FastAPI exception overrides gracefully catch upstream AI rate limits (503s) without crashing the application.

---

## 🚀 Tech Stack

ShadowSOP utilizes a modern, decoupled architecture separated into a fast front-end and a concurrent back-end.

**Frontend:**
* **Framework:** React 18 & TypeScript
* **Build Tool:** Vite (for lightning-fast HMR)
* **Styling:** Tailwind CSS ("Cyber-Zinc" aesthetic)
* **State/Forms:** React Hook Form

**Backend:**
* **Framework:** FastAPI & Python 3.11
* **AI Integration:** Google GenAI SDK (Gemini 1.5 Pro/Flash)
* **Database Pipeline:** SQLModel (SQLAlchemy + Pydantic)
* **Database:** PostgreSQL

---

## 💻 Local Development Setup

To run ShadowSOP locally, you will need to start both the Python backend and the React frontend.

### 1. Database
You must have a PostgreSQL instance running on port 5432 (or 5433 depending on your docker setup).
```bash
docker-compose up -d
```

### 2. Backend Setup
1. Open a terminal and navigate to exactly `/backend`.
2. Install the required dependencies: `pip install -r requirements.txt`
3. Create a `.env` file in the `/backend` folder or root with the following keys:
   ```env
   DATABASE_URL=postgresql://admin:password@127.0.0.1:5433/shadowsop
   GEMINI_API_KEY=your_google_ai_key_here
   CORS_ORIGINS=*
   ```
4. Start the FastAPI Uvicorn server:
   ```bash
   python -m uvicorn main:app --reload
   ```
5. The API will be available at `http://localhost:8000`. You can view the docs at `http://localhost:8000/docs`.

### 3. Frontend Setup
1. Open a new terminal tab and navigate exactly to `/frontend`.
2. Install Node dependencies: `npm install`
3. Optional: Create a `.env` file in `/frontend` to point to a remote server. Alternatively, it naturally defaults to localhost.
   ```env
   VITE_API_URL=http://localhost:8000
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

---

## 🌍 Production Deployment

The project is natively configured for Render using a **Multi-Service Architecture**:
* **Database:** Render Managed PostgreSQL.
* **Backend API:** Render Web Service (Python 3).
* **Frontend UI:** Render Static Site (Vite Build).

*Ensure that `CORS_ORIGINS` on the backend matches the Render Static Site URL, and `VITE_API_URL` on the frontend matches the Render Web Service URL.*
