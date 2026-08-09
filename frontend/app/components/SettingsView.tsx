"use client";

export default function SettingsView() {
  return (
    <div id="settings-view" className="view-section">
      <h1 className="page-title">Profile</h1>

      {/* Profile Card */}
      <section className="card profile-card">
        <div className="user-header">
          <div className="user-details">
            <h2>Ramesh Kumar</h2>
            <p>Active Farmer</p>
          </div>
        </div>

        <div className="info-list">
          <div className="info-item">
            <span className="info-label">Phone number</span>
            <span className="info-value">+91 98765 43210</span>
          </div>
          <div className="info-item">
            <span className="info-label">Location</span>
            <span className="info-value">Palampur, Kangra District</span>
          </div>
          <div className="info-item">
            <span className="info-label">Primary crop type</span>
            <span className="info-value">Wheat & Mustard</span>
          </div>
        </div>
      </section>

      {/* Preferences Card */}
      <section className="card preferences-card">
        <h2 className="card-title">Preferences</h2>

        <div className="setting-item">
          <div className="setting-text">
            <span className="setting-label">Language</span>
            <p className="setting-desc">Select your preferred app language</p>
          </div>
          <select id="languageSelect" className="dropdown-btn">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="pa">Punjabi</option>
          </select>
        </div>

        <div className="actions-row">
          <button id="editProfileBtn" className="btn btn-outline">
            Edit profile
          </button>
          <button id="logoutBtn" className="btn btn-secondary">
            Log out
          </button>
        </div>
      </section>
    </div>
  );
}
