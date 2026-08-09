"use client";

import { useState, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader";
import MobileBottomNav from "../components/MobileBottomNav";
import DashboardView from "../components/DashboardView";
import CropsView from "../components/CropView";
import AdvisoryView from "../components/AdvisoryView";
import HistoryView from "../components/HistoryView";
import SettingsView from "../components/SettingsView";

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<string>("dashboard-view");

  const handleNavigate = useCallback((view: string) => {
    console.log("Navigating to:", view);
    setActiveView(view);
  }, []);

  const renderView = () => {
    console.log("Rendering view:", activeView);
    switch (activeView) {
      case "dashboard-view":
        return <DashboardView />;
      case "crops-view":
        return <CropsView />;
      case "advisory-view":
        return <AdvisoryView />;
      case "history-view":
        return <HistoryView />;
      case "settings-view":
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <>
      {/* Mobile Header - only visible on mobile */}
      <MobileHeader />

      {/* Desktop Sidebar - only visible on desktop */}
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />

      <div className="app-layout">
        <main className="main-content" id="mainContent">
          {renderView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation - only visible on mobile */}
      <MobileBottomNav activeView={activeView} onNavigate={handleNavigate} />
    </>
  );
}
