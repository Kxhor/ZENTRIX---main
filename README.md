Zentrix - AI Agentic Regulatory Integrity Platform

«Real-time AI-powered compliance intelligence for fintech systems»

An advanced multi-agent AI framework and dashboard designed to assist in regulatory compliance tracking, data sovereignty monitoring, and RBI mandate alignment for large fintech and enterprise organizations.

Zentrix analyzes real-time Supabase transactions, merchant ledgers, and infrastructure metrics against a localized "policy_rulebook.json". Upon detecting anomalies, it calculates an integrity score, recommends corrective actions, and generates structured compliance reports aligned with regulatory requirements.

---

🚀 Key Features

- Live Rulebook Engine: Parses 200+ micro-rules (KYC, AML, tech limits, data sovereignty) continuously against a live PostgreSQL database
- Dynamic Dashboard: Real-time integrity pulse via WebSocket streams
- Automated Incident Reporting: Generates RBI/FIU-aligned compliance reports
- Predictive Breach Detection: Identifies potential failures before regulatory violations occur

---

🧰 Technology Stack

- Frontend: React 18, Next.js 14, TypeScript, TailwindCSS
- Backend: Python 3.12, FastAPI, Uvicorn, WebSockets
- Database: Supabase (PostgreSQL)
- AI Layer: LangChain, Gemini 1.5 Flash

---

💻 Getting Started

1. Database Setup

Ensure your Supabase project contains:

- "merchants" → "kyc_status", "onboarding_date", "bank_account_hash"
- "transactions" → "latency_ms", "server_location", "amount_inr", "purpose_code", "auth_factors"
- "escrow_ledger" → "fund_type", "account_label"
- "infrastructure" → "current_net_worth_inr", "rto_hours"

---

2. Backend Setup

cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

Create a ".env" file:

SUPABASE_URL=
SUPABASE_KEY=
GEMINI_API_KEY=

Run the backend server:

uvicorn main:app --reload --port 8000

---

3. Frontend Setup

cd frontend
npm install
npm run dev

Visit: http://localhost:3000/

---

👨‍💻 Author

Kishor G
Developed as an AI-powered regulatory intelligence system