import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Alerts.css";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8000/api/alerts");
        console.log("API Response:", response.data); // Debugging
        setAlerts(response.data); // Assuming API response is an array
      } catch (err) {
        console.error("Error fetching alerts:", err);
        setError("Failed to fetch alerts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);
  
  return (
    <div className="alerts">
      <h1>Alerts and Notifications</h1>

      {loading && <p>Loading alerts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
  <ul>
    {alerts.length > 0 ? (
      alerts.map((alert, index) => (
        <li key={index}>
          <strong>{alert.subject}</strong> - Status: {alert.status} <br />
          <small>Requested At: {new Date(alert.requestedAt).toLocaleString()}</small> <br />
          <small>Sent At: {new Date(alert.sentAt).toLocaleString()}</small>
        </li>
      ))
    ) : (
      <li>No alerts available</li>
    )}
  </ul>
)}
    </div>
  );
};

export default Alerts;
