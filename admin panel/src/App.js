// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
                <div className="app-container">
                  <Sidebar />
                  <div className="content">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/water-quality" element={<div>Water Quality</div>} />
                      <Route path="/device-management" element={<div>IoT Devices</div>} />
                      <Route path="/pond-management" element={<div>Pond Management</div>} />
                      <Route path="/alerts" element={<div>Alerts</div>} />
                      <Route path="/reports" element={<div>Reports</div>} />
                    </Routes>
                  </div>
                </div>
            }
          />
        </Routes>
      </Router>
  );
};

export default App;
