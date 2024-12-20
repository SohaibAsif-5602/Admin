import React, { useState, useEffect } from "react";
import "../styles/IoTDevices.css";
import axios from "axios";

const THINGSPEAK_API_BASE = "https://api.thingspeak.com"; // Base URL for ThingSpeak
const ONLINE_THRESHOLD_MINUTES = 2; // Device is considered online if it communicated in the last 2 minutes

const IoTDevices = () => {
  const [devices, setDevices] = useState([]);

  // Fetch devices and their last communication from ThingSpeak
  const fetchDevices = async () => {
    try {
      // Fetch ThingSpeak data (replace with your actual channel/feed configuration)
      const response = await axios.get(
        `${THINGSPEAK_API_BASE}/channels/2592426/feeds.json?results=1`
      );

      // Simulate devices list from ThingSpeak data
      const feeds = response.data.feeds || [];
      const devicesFromThingSpeak = feeds.map((feed, index) => ({
        id: index + 1,
        name: `Device ${index + 1}`,
        type: "Sensor", // You can dynamically fetch device type if available
        lastCommunication: new Date(feed.created_at),
      }));

      setDevices(devicesFromThingSpeak);
    } catch (error) {
      console.error("Error fetching devices from ThingSpeak:", error);
    }
  };

  // Calculate if a device is online based on its last communication time
  const isDeviceOnline = (lastCommunication) => {
    const now = new Date();
    const lastCommTime = new Date(lastCommunication);
    const diffMinutes = (now - lastCommTime) / (1000 * 60); // Difference in minutes
    return diffMinutes <= ONLINE_THRESHOLD_MINUTES;
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 60000); // Refresh every 1 minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="iot-devices">
      <h1>IoT Device Management</h1>

      {/* Overview Section */}
      <div className="overview">
        <p>Total Devices: {devices.length}</p>
        <p>
          Online:{" "}
          {devices.filter((device) => isDeviceOnline(device.lastCommunication))
            .length}
        </p>
        <p>
          Offline:{" "}
          {devices.filter((device) => !isDeviceOnline(device.lastCommunication))
            .length}
        </p>
      </div>

      {/* Device List */}
      <table className="device-table">
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Status</th>
            <th>Type</th>
            <th>Last Communication</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td
                className={`status ${
                  isDeviceOnline(device.lastCommunication) ? "online" : "offline"
                }`}
              >
                {isDeviceOnline(device.lastCommunication) ? "Online" : "Offline"}
              </td>
              <td>{device.type}</td>
              <td>{new Date(device.lastCommunication).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IoTDevices;
