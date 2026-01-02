# RouteSaathi 2.0 - AI-Driven Fleet Management System

RouteSaathi 2.0 is a comprehensive, AI-powered fleet management solution designed for the Bengaluru Metropolitan Transport Corporation (BMTC). It optimizes public transport operations by providing real-time tracking, AI-based route recommendations, and role-specific interfaces for Coordinators, Conductors, and Passengers.

![RouteSaathi Logo](frontend/src/assets/RouteSaathi_logo.png)

## 🚀 Key Features

### 1. Coordinator Dashboard (Control Center)
- **Live Fleet Tracking**: Real-time map view of all active buses using GPS simulation.
- **AI Recommendations**: Machine learning-driven suggestions for bus reallocation based on demand.
- **Broadcast System**: Send alerts and messages to conductors instantly.
- **Analytics**: Visual stats for active buses, high-demand routes, and revenue.

### 2. Conductor App (Mobile First)
- **Digital Ticketing**: Issue tickets digitally with dynamic fare calculation.
- **Live Occupancy**: Real-time bus occupancy updates based on ticket issuance.
- **Quick Actions**: One-tap reporting for SOS, Traffic, Breakdown, and Bus Full status.
- **Assignment View**: View daily route assignments and schedules.

### 3. Passenger App (Commuter)
- **Live Bus Tracking**: Track nearby buses on an interactive map.
- **Occupancy Badges**: See if a bus is Available, Moderate, or Crowded before boarding.
- **Route Search**: Find buses between specific stops.
- **SOS Safety**: Emergency alert system for passenger safety.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS (Custom BMTC Theme)
- **Maps**: React Leaflet & OpenStreetMap
- **Icons**: Lucide React

### Backend
- **Framework**: Python FastAPI
- **Data**: JSON-based mock database (NoSQL-style)
- **AI/ML**: Scikit-learn (Random Forest Regressor) for demand prediction
- **Server**: Uvicorn

---

## 📦 Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm**

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd RouteSaathi-2.0
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

---

## 🏃‍♂️ Running the Application

You need to run both the backend and frontend servers simultaneously.

### Start Backend Server
```bash
# In the backend directory
python -m uvicorn main:app --reload --port 8000
```
The API will be available at `http://localhost:8000`.
API Documentation (Swagger UI): `http://localhost:8000/docs`

### Start Frontend Server
```bash
# In the frontend directory
npm run dev
```
The application will be accessible at `http://localhost:5174`.

---

## 🔐 Demo Credentials

Use the following credentials to log in and test different personas:

| Role | Email | Password |
|------|-------|----------|
| **Coordinator** | `admin@bmtc.gov.in` | `admin123` |
| **Conductor** | `ganesh@bmtc.gov.in` | `conductor123` |
| **Passenger** | `user@gmail.com` | `user123` |

> **Note**: You can also use the "Quick Demo Access" buttons on the login page or "Use as Passenger" for instant access.

---

## 📂 Project Structure

```
RouteSaathi 2.0/
├── backend/
│   ├── data/               # JSON mock databases (users, buses, routes, etc.)
│   ├── routers/            # API endpoints (auth, buses, tickets, ai_engine)
│   ├── services/           # Business logic and data access layer
│   └── main.py             # Application entry point
│
├── frontend/
│   ├── src/
│   │   ├── assets/         # Images and logos
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React Context (Auth)
│   │   ├── pages/          # Page views (Coordinator, Conductor, Passenger)
│   │   └── services/       # API integration (Axios)
│   └── index.css           # Global styles and Tailwind imports
│
└── README.md               # Project documentation
```

---


**© 2025 Bengaluru Metropolitan Transport Corporation (BMTC)**
