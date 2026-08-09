"use client";

import {
  RiDashboardLine,
  RiPlantLine,
  RiLightbulbLine,
  RiHistoryLine,
  RiSettings3Line,
} from "react-icons/ri";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  const navItems = [
    { id: "dashboard-view", label: "Dashboard", icon: RiDashboardLine },
    { id: "crops-view", label: "Crops", icon: RiPlantLine },
    { id: "advisory-view", label: "Advisory", icon: RiLightbulbLine },
    { id: "history-view", label: "History", icon: RiHistoryLine },
    { id: "settings-view", label: "Settings", icon: RiSettings3Line },
  ];

  return (
    <aside className="sidebar" id="sidebar">
      {/* Brand */}
      <div className="brand">
        <h2>Fasal Sathi</h2>
        <p>Crop Advisory</p>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        {navItems.map((item) => (
          <button
            key={item.id}
            data-target={item.id}
            className={`nav-btn ${activeView === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon />
            {item.label}
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="user-profile">
        <div className="avatar">RK</div>
        <span className="user-name">Ramesh Kumar</span>
      </div>
    </aside>
  );
}
