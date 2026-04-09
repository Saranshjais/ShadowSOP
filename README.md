# ShadowSOP

A full-stack web app I built to help teams turn messy meeting transcripts, brain dumps, and Slack threads into clean, step-by-step Standard Operating Procedures (SOPs). 

Instead of manually formatting notes for hours, you just paste raw text into the app, and it uses Google's Gemini AI to sift through the noise and pull out the actual actionable steps. 

## How it works
* **The Forge**: This is the main workspace. You paste your text, hit "Distill", and the AI returns a structured list of steps. It hooks directly into a React form so you can manually edit, add, or delete steps before saving anything to the database.
* **The Vault**: This is the library where all the SOPs get saved. Once you're done, you can browse through them or download them as Markdown files to drop into GitHub or your company wiki.
* **Smart Error Handling**: The backend is set up to safely catch errors if the Google AI API goes down or gets rate-limited, passing a clean warning to the frontend instead of completely breaking the app.

## Tech Stack
I decoupled the frontend and backend so they can run and scale independently.

**Frontend:**
* React + TypeScript
* Vite (for fast builds)
* Tailwind CSS
* React Hook Form (for handling the dynamic AI arrays)

**Backend:**
* Python + FastAPI
* Google GenAI SDK (Gemini 1.5)
* SQLModel + PostgreSQL (for database management)

## Running it locally

If you want to spin this up on your own machine, you'll need to run both the frontend and the backend.

### 1. Database
Make sure you have Postgres running. The easiest way is using Docker:
```bash
docker-compose up -d
```

### 2. Backend
Open a terminal, go to the `/backend` folder, and install the Python packages:
```bash
cd backend
pip install -r requirements.txt
```
Create a `.env` file inside the `/backend` folder. You'll need to grab a free API key from Google AI Studio:
```env
DATABASE_URL=postgresql://admin:password@127.0.0.1:5433/shadowsop
GEMINI_API_KEY=your_google_api_key
CORS_ORIGINS=*
```
Start the backend server:
```bash
python -m uvicorn main:app --reload
```
The API runs on `http://localhost:8000`. 

### 3. Frontend
Open another terminal tab, go to the `/frontend` folder, and install the Node packages:
```bash
cd frontend
npm install
```
Start the Vite server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser and you're good to go.

## Deployment
The app is fully configured to be deployed on Render. 
- The Postgres database runs on a managed instance.
- The Python backend runs as a Web Service.
- The React frontend is deployed as a Static Site. 
Just make sure your `CORS_ORIGINS` on the backend points to the frontend URL, and `VITE_API_URL` on the frontend points to your backend.
