import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import "./Charts/LineChart"
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [alertsData, setAlertsData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(false);

  const THINGSPEAK_API_BASE = "https://api.thingspeak.com";

  // Fetch Devices from ThingSpeak
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          `${THINGSPEAK_API_BASE}/channels/2592426/feeds.json?results=1`
        );
        const feeds = response.data.feeds || [];
        const devicesFromThingSpeak = feeds.map((feed, index) => ({
          id: index + 1,
          name: `Device ${index + 1}`,
          type: "Sensor",
          lastCommunication: new Date(feed.created_at),
        }));
        setDevices(devicesFromThingSpeak);
      } catch (error) {
        console.error("Error fetching devices from ThingSpeak:", error);
      }
    };

    fetchDevices();
  }, []);

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/users");
        if (!response.ok) {
          console.error("Error fetching users:", response.status);
          return;
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch Alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(
          "https://api.thingspeak.com/alerts/history?count=1"
        );
        if (!response.ok) {
          console.error("Error fetching alerts:", response.status);
          return;
        }
        const data = await response.json();
        setAlertsData(data.alerts || []);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    fetchAlerts();
  }, []);

  // Fetch Ponds
  useEffect(() => {
    const fetchPonds = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/ponds");
        setPonds(response.data);
      } catch (error) {
        console.error("Error fetching ponds:", error);
      }
      setLoading(false);
    };

    fetchPonds();
  }, []);

  const pondLineData = {
    labels: ponds.map((pond, index) => `Pond ${index + 1}`),
    datasets: [
      {
        label: "Number of Ponds Over Time",
        data: ponds.map(() => 1),
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.2,
        pointBackgroundColor: "#36a2eb",
      },
    ],
  };

  const userCountPieData = {
    labels: ["Total Users"],
    datasets: [
      {
        data: [users.length],
        backgroundColor: ["#36a2eb"],
        hoverBackgroundColor: ["#36a2eb"],
      },
    ],
  };

  const alertLineData = {
    labels: alertsData.map((alert, index) => `Alert ${index + 1}`),
    datasets: [
      {
        label: "Alerts",
        data: alertsData.map((alert) => alert.value || 0),
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
      },
    ],
  };

  const devicePieData = {
    labels: devices.map((device) => device.name),
    datasets: [
      {
        data: devices.map(() => 1),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="chart-row">
        <div className="chart">
          <h2>Total Users</h2>
          <Doughnut style={{ width: "200px", height: "200px", margin: "0 auto" }} data={userCountPieData} options={{ responsive: true }} />
        </div>

        <div className="chart">
          <h2>Number of Ponds</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Line style={{ width: "400px", height: "60%", margin: "0 auto" }} data={pondLineData} options={{ responsive: true }} />
          )}
        </div>
      </div>

      <div className="chart-row">
        <div className="chart">
          <h2>Alert History</h2>
          <Line style={{ width: "450px", height: "80%", margin: "0 auto" }} data={alertLineData} options={{ responsive: true }} />
        </div>

        <div className="chart">
          <h2>Devices</h2>
          <Doughnut style={{ width: "200px", height: "200px", margin: "0 auto" }} data={devicePieData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
