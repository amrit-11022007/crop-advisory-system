CREATE TABLE IF NOT EXISTS farmers (
    farmer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    location_city VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS advisories (
    advisory_id SERIAL PRIMARY KEY,
    farmer_id INT REFERENCES farmers(farmer_id) ON DELETE CASCADE,
    nitrogen DECIMAL(5,2) NOT NULL,
    phosphorus DECIMAL(5,2) NOT NULL,
    potassium DECIMAL(5,2) NOT NULL,
    ph_level DECIMAL(4,2) NOT NULL,
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2),
    rainfall DECIMAL(5,2),
    recommended_crop VARCHAR(100),
    recommended_fertilizer VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);


-- Table 1: Crop Recommendation Feature
-- Uses soil nutrients, weather, and pH to predict the best crop.
CREATE TABLE IF NOT EXISTS crop_recommendations (
    crop_req_id SERIAL PRIMARY KEY,
    farmer_id INT REFERENCES farmers(farmer_id) ON DELETE CASCADE,
    
    -- ML Model Inputs
    nitrogen DECIMAL(5,2) NOT NULL,
    phosphorus DECIMAL(5,2) NOT NULL,
    potassium DECIMAL(5,2) NOT NULL,
    temperature DECIMAL(5,2) NOT NULL,
    humidity DECIMAL(5,2) NOT NULL,
    ph_level DECIMAL(4,2) NOT NULL,
    rainfall DECIMAL(5,2) NOT NULL,
    
    -- ML Model Output
    predicted_crop VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: Fertilizer Recommendation Feature
-- Uses soil type, crop type, moisture, and nutrients to predict the best fertilizer.
CREATE TABLE IF NOT EXISTS fertilizer_recommendations (
    fert_req_id SERIAL PRIMARY KEY,
    farmer_id INT REFERENCES farmers(farmer_id) ON DELETE CASCADE,
    
    -- ML Model Inputs
    temperature DECIMAL(5,2) NOT NULL,
    humidity DECIMAL(5,2) NOT NULL,
    moisture DECIMAL(5,2) NOT NULL,
    soil_type VARCHAR(50) NOT NULL,   -- e.g., 'Sandy', 'Loamy', 'Black', 'Red', 'Clayey'
    crop_type VARCHAR(50) NOT NULL,   -- e.g., 'Maize', 'Sugarcane', 'Cotton', 'Wheat'
    nitrogen DECIMAL(5,2) NOT NULL,
    potassium DECIMAL(5,2) NOT NULL,
    phosphorus DECIMAL(5,2) NOT NULL,
    
 	   -- ML Model Output
    predicted_fertilizer VARCHAR(100), -- e.g., 'Urea', 'DAP', '14-35-14', '28-28'
    created_at TIMESTAMP DEFAULT NOW()
);
