# 🌾 Smart Crop Advisory System for Small and Marginal Farmers

**Problem Statement ID:** SIH25010
**Category:** Software
**Theme:** Agriculture, FoodTech & Rural Development

---

## 📌 Overview

Small and marginal farmers often lack access to timely, personalized, and location-specific agricultural advice. This leads to suboptimal crop selection, inefficient fertilizer usage, and reduced yields.

The **Smart Crop Advisory System** is a full-stack web application that recommends suitable crops and fertilizers to farmers based on their soil conditions and local weather data, backed by a machine learning model trained on agricultural datasets. Farmers can register, submit their farm details, and receive data-driven advisory recommendations through a simple dashboard.

---

## 🎯 Problem Statement

Design and develop a smart crop advisory system that:
- Collects soil and environmental parameters from farmers
- Uses ML to recommend the most suitable crop and/or fertilizer
- Maintains a history of advisories for each farmer
- Presents recommendations through an easy-to-use dashboard

---

## ✨ Key Features

- 👤 **Farmer Registration & Authentication** — Secure sign-up/login for farmer profiles
- 🌱 **Crop & Fertilizer Recommendation** — ML-based suggestions from soil (N, P, K, pH) and weather inputs (temperature, humidity, rainfall)
- 📊 **Advisory Dashboard** — Visual display of current and past recommendations
- 🗂️ **Advisory History** — Track previous recommendations per farmer/field
- 🌦️ **Weather Integration** — Fetches live weather data for the farmer's location
- 🔐 **Role-based Access** — Farmer and Admin views

---

## 🏗️ System Architecture

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│  Frontend   │ ───► │  Backend    │ ───► │   ML Model   │      │  Database   │
│ (React/HTML)│ ◄─── │ (API Layer) │ ◄─── │  (Crop/Fert. │ ◄──► │ (MongoDB /  │
│             │      │             │      │  Prediction) │      │  PostgreSQL)│
└─────────────┘      └─────────────┘      └──────────────┘      └─────────────┘
```

1. **Frontend** collects farmer input (soil values, location) via a form.
2. **Backend API** validates and forwards data to the ML service, and stores results in the database.
3. **ML Model** predicts the best crop/fertilizer based on input features.
4. **Database** stores farmer profiles, submitted data, and advisory history.

---

## 🛠️ Tech Stack

| Layer          | Technology (suggested)                          |
|----------------|--------------------------------------------------|
| Frontend       | next.js                                          |
| Backend        | Python (Flask/FastAPI)                           |
| ML Model       | Python, scikit-learn / pandas / numpy            |
| Database       | PostgreSQL                                       |
| Authentication | JWT-based auth                                   |
| Deployment     | Docker, Render / Vercel / Railway / AWS          |
| Weather API    | OpenWeatherMap API (or similar)                  |

*(Update this table with the exact stack your team finalizes.)*

---

## 📂 Project Structure

```
smart-crop-advisory/
│
├── frontend/                 # Client-side application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
├── backend/                  # API server
│   ├── routes/
│   ├── controllers/
│   ├── models/                # DB schemas (Farmer, CropData, Advisory)
│   ├── middleware/            # Auth, validation
│   └── server.js
│
├── ml-model/                  # ML training & inference
│   ├── dataset/
│   ├── train_model.py
│   ├── model.pkl
│   └── predict_api.py         # Flask/FastAPI service exposing /predict
│
├── docs/                       # Reports, diagrams, PPT
│
├── .env.example
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- MongoDB / PostgreSQL running locally or a cloud URI
- npm / pip

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/smart-crop-advisory.git
cd smart-crop-advisory
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env    # add DB URI, JWT secret, weather API key
npm run dev
```

### 3. ML Model Service Setup
```bash
cd ml-model
pip install -r requirements.txt
python predict_api.py
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm start
```

The app should now be running at `http://localhost:3000` (frontend) with the backend API at `http://localhost:5000` and the ML service at `http://localhost:8000` (adjust ports as configured).

---

## 🧠 Machine Learning Model

- **Inputs:** Nitrogen (N), Phosphorus (P), Potassium (K), pH, temperature, humidity, rainfall
- **Output:** Recommended crop and/or fertilizer
- **Algorithm:** Random Forest / Decision Tree / XGBoost (classification)
- **Dataset:** Public crop recommendation datasets (e.g., Kaggle "Crop Recommendation Dataset")
- **Training script:** `ml-model/train_model.py`
- **Serving:** Exposed via a REST endpoint (`/predict`) consumed by the backend

---

## 🔌 API Endpoints (Sample)

| Method | Endpoint                  | Description                          |
|--------|----------------------------|---------------------------------------|
| POST   | `/api/auth/register`      | Register a new farmer                 |
| POST   | `/api/auth/login`         | Farmer login                          |
| POST   | `/api/advisory/predict`   | Submit soil/weather data, get advisory|
| GET    | `/api/advisory/history/:farmerId` | Get past advisories for a farmer |
| GET    | `/api/weather?location=`  | Fetch live weather for a location     |

---

## 🚀 Future Scope

- Multilingual support for regional languages
- SMS/IVR-based advisory for farmers without smartphones
- Satellite/remote-sensing based soil health monitoring
- Pest and disease detection using image classification
- Market price integration for crop selling decisions

---

## 👥 Team

| Name | Role |
|------|------|
| Aman Pokharia , Ridhima Bhatt   | Frontend |
| Amrit Raj Yadav , Samarth Chaudhary   | Backend |
| Kartik Tiwari    | ML |
| Kartik Sharma   | Database/Deployment |

*(Fill in your team members and roles.)*

---

## 📄 License

This project is developed for **Smart India Hackathon (SIH) 2025** as an educational/practice submission under problem statement **SIH25010**.
