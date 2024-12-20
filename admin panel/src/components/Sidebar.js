import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <nav>
        <NavLink to="/" className="menu-item" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/water-quality" className="menu-item" activeClassName="active">
          Water Quality
        </NavLink>
        <NavLink to="/device-management" className="menu-item" activeClassName="active">
          IoT Devices
        </NavLink>
        <NavLink to="/pond-management" className="menu-item" activeClassName="active">
          Pond Management
        </NavLink>
        <NavLink to="/alerts" className="menu-item" activeClassName="active">
          Alerts
        </NavLink>
        <NavLink to="/reports" className="menu-item" activeClassName="active">
          Reports
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
