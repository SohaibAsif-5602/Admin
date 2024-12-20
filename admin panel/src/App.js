import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import WaterQuality from "./components/WaterQuality";
import DeviceManagement from "./components/IoTDevices";
import PondManagement from "./components/PondManagement";
import Alerts from "./components/Alerts";
import Reports from "./components/Reports";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/water-quality" element={<WaterQuality />} />
            <Route path="/device-management" element={<DeviceManagement />} />
            <Route path="/pond-management" element={<PondManagement />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
