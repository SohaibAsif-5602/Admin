import React from "react";
import "../styles/IoTDevices.css";

const DeviceDetails = ({ device, onClose }) => {
  return (
    <div className="modal">
      <h2>{device.name}</h2>
      <p>Type: {device.type}</p>
      <p>Status: {device.status}</p>
      <p>Last Communication: {device.lastCommunication}</p>

      <h3>Configuration</h3>
      <form>
        <label>
          Threshold:
          <input type="number" defaultValue="0" />
        </label>
        <button type="submit">Update</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DeviceDetails;
