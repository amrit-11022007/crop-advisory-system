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

---

## 🏗️ System Architecture

```
┌─────────────┐      ┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│  Frontend   │ ───► │  Backend    │ ───► │   ML Model   │      │  Database   │
│(NextJS/HTML)│ ◄─── │ (API Layer) │ ◄─── │  (Crop/Fert. │ ◄──► │ (MongoDB /  │
│             │      │             │      │  Prediction) │      │  PostgreSQL)│
└─────────────┘      └─────────────┘      └──────────────┘      └─────────────┘
```

1. **Frontend** collects farmer input (soil values, location) via a form.
2. **Backend API** validates and forwards data to the ML service, and stores results in the database.
3. **ML Model** predicts the best crop/fertilizer based on input features.
4. **Database** stores farmer profiles, submitted data, and advisory history.

---

## 🛠️ Tech Stack

| Layer          | Technology (suggested)                |
| -------------- | ------------------------------------- |
| Frontend       | next.js                               |
| Backend        | Python (Django)                       |
| ML Model       | Python, scikit-learn / pandas / numpy |
| Database       | PostgreSQL + MongoDB                  |
| Authentication | JWT-based auth                        |
| Deployment     | Render / Vercel / MongoDB Atlas       |
| Weather API    | openn-meteo API                       |

---

## 📂 Project Structure

```
smart-crop-advisory/
│
├── frontend/                 # Client-side application
│   ├── css/
│   │   ├── login.css
│   │   ├── style.css
│   │   └── variables.css
│   ├── js/
│   │   ├── login.js
│   │   ├── regiser.js
│   │   └── script.js
│   ├── index.html             # Main page
│   ├── login.html
│   └── register.html
│
├── backend/                   # API server
│   ├── api/
│   ├── config/
│   ├── db.sqlite3             # DB schemas (Farmer, CropData, Advisory)
│   ├── requirement.txt        # Auth, validation
│   └── manage.py
│
├── Recommmendation models/    # ML training & inference
│   ├── dataset/
│   ├── train_model.py
│   ├── model.pkl
│   └── predict_api.py         # Flask/FastAPI service exposing /predict
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v12+)
- Python (v3.9+)
- MongoDB / PostgreSQL running locally or a cloud URI
- npm / pnpm + pip

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/smart-crop-advisory.git
cd smart-crop-advisory
```

### 2. Backend Setup

```bash
cd backend
cp .env.example .env    # add DB URI, JWT secret, weather API key
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 3. ML Model Service Setup

```bash
cd ml-model
pip install -r requirements.txt
python predict_api.py
```

### 4. Frontend Setup (for nextjs version)

```bash
cd frontend
pnpm install
pnpm build
pnpm dev
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

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new farmer |
| POST   | `/api/auth/login`    | Farmer login          |

---

## 🚀 Future Scope

- Multilingual support for regional languages
- SMS/IVR-based advisory for farmers without smartphones
- Satellite/remote-sensing based soil health monitoring
- Pest and disease detection using image classification
- Market price integration for crop selling decisions

---

## 👥 Team

| Name                          | Role                |
| ----------------------------- | ------------------- |
| Aman Pokharia , Ridhima Bhatt | Frontend            |
| Samarth Chaudhary             | Backend             |
| Amrit Raj Yadav               | Full Stack          |
| Kartik Tiwari                 | ML                  |
| Kartik Sharma                 | Database/Deployment |

---

## 📄 License

This project is available under MIT Licence.
