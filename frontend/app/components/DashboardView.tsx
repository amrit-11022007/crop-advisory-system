"use client";

import {
  RiCheckboxCircleLine,
  RiDropLine,
  RiThermometerLine,
  RiCloudLine,
  RiCheckLine,
  RiMicLine,
} from "react-icons/ri";

export default function DashboardView() {
  return (
    <div id="dashboard-view" className="view-section">
      <header className="header">
        <h1>Welcome back, Ramesh</h1>
        <p>Here is your crop status for today.</p>
      </header>

      {/* Recommendation Card */}
      <section className="card recommendation-card">
        <div className="card-header">
          <span className="card-title">
            {"Today's"}
            <br />
            recommendation
          </span>
          <span className="badge green-badge">
            <RiCheckboxCircleLine /> High Confidence
          </span>
        </div>
        <h2 className="recommendation-text">Apply urea to wheat crop</h2>
        <p className="recommendation-desc">
          Optimal timing based on current soil moisture and forecasted mild
          temperatures over the next 48 hours.
        </p>
        <button className="btn-outline-action" id="markDoneBtn">
          <RiCheckLine /> Mark as applied
        </button>
      </section>

      {/* Metrics Grid */}
      <section className="metrics-grid">
        <div className="card metric-card">
          <div className="icon-box blue">
            <RiDropLine />
          </div>
          <div className="metric-info">
            <span className="metric-label">Soil moisture</span>
            <span className="metric-value">65%</span>
          </div>
        </div>
        <div className="card metric-card">
          <div className="icon-box orange">
            <RiThermometerLine />
          </div>
          <div className="metric-info">
            <span className="metric-label">Temperature</span>
            <span className="metric-value">28°C</span>
          </div>
        </div>
        <div className="card metric-card">
          <div className="icon-box grey">
            <RiCloudLine />
          </div>
          <div className="metric-info">
            <span className="metric-label">Rain risk</span>
            <span className="metric-value">Low</span>
          </div>
        </div>
      </section>

      {/* Question Input Card */}
      <section className="card question-card">
        <h3>Have a question?</h3>
        <div className="input-wrapper">
          <input
            type="text"
            id="questionInput"
            placeholder="Ask a question about your crop"
          />
          <button className="mic-btn" id="micBtn" title="Speak to ask">
            <RiMicLine />
          </button>
        </div>
      </section>
    </div>
  );
}
