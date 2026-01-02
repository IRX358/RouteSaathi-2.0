# 🚀 Deployment Guide for RouteSaathi 2.0

This guide provides step-by-step instructions to deploy the RouteSaathi 2.0 application. We will deploy the **Backend** on [Render](https://render.com) and the **Frontend** on [Vercel](https://vercel.com).

---

## 📋 Prerequisites

1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).
3.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).

---

## 1️⃣ Backend Deployment (Render)

We will deploy the Python FastAPI backend as a Web Service on Render.

1.  **Push Code to GitHub**: Ensure your project is pushed to a GitHub repository.
2.  **Create New Web Service**:
    *   Go to the [Render Dashboard](https://dashboard.render.com/).
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repository.
3.  **Configure Service**:
    *   **Name**: `routesaathi-backend` (or similar)
    *   **Region**: Choose the one closest to you (e.g., Singapore, Frankfurt).
    *   **Root Directory**: `backend` (Important! This tells Render where the backend code lives).
    *   **Runtime**: `Python 3`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4.  **Environment Variables**:
    *   Scroll down to "Environment Variables" (optional but recommended).
    *   Add `PYTHON_VERSION` with value `3.9.0` (or your local version).
5.  **Deploy**:
    *   Click **Create Web Service**.
    *   Wait for the deployment to finish. You will see a green "Live" badge.
    *   **Copy the Backend URL**: It will look like `https://routesaathi-backend.onrender.com`. You will need this for the frontend.

> **Note**: Since this project uses local JSON files for data storage, data will reset every time the server restarts on Render's free tier. For persistent data, you would need to upgrade to a paid plan with a persistent disk or switch to a real database like PostgreSQL.

---

## 2️⃣ Frontend Deployment (Vercel)

We will deploy the React Frontend on Vercel.

1.  **Import Project**:
    *   Go to the [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **Add New...** -> **Project**.
    *   Import the same GitHub repository.
2.  **Configure Project**:
    *   **Framework Preset**: `Vite` (should be detected automatically).
    *   **Root Directory**: Click "Edit" and select `frontend`.
3.  **Build Settings**:
    *   Leave the default Build Command (`npm run build`) and Output Directory (`dist`).
4.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Key: `VITE_API_URL`
    *   Value: Paste your **Render Backend URL** (e.g., `https://routesaathi-backend.onrender.com`).
    *   *Note*: The application is now configured to automatically append `/api` to this URL, so you just need the base domain.
5.  **Deploy**:
    *   Click **Deploy**.
    *   Vercel will build and deploy your site.
    *   Once complete, you will get a live URL (e.g., `https://routesaathi-frontend.vercel.app`).

> **Note**: A `vercel.json` file has been included in the `frontend` directory to handle Single Page Application (SPA) routing. This ensures that direct links to routes like `/login` or `/coordinator` work correctly.

---

## 3️⃣ Final Verification

1.  Open your deployed Frontend URL.
2.  Try logging in as a **Coordinator** (`admin@bmtc.gov.in` / `admin123`).
3.  If you see the dashboard and data loads, your deployment is successful! 
4.  If you see network errors, check the browser console (F12) to ensure requests are going to the correct Render backend URL.

---

## 🔄 Updating Your App

To update your app, simply **push changes to your GitHub repository**.
*   **Render** and **Vercel** will automatically detect the changes and trigger a new deployment.

---

**© 2025 Bengaluru Metropolitan Transport Corporation (BMTC)**
