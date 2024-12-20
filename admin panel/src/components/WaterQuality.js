import React, { useState, useEffect } from "react";
import LineChart from "./Charts/LineChart";
import axios from "axios";
import "../styles/WaterQuality.css";

const WaterQuality = () => {
  const [realTimeData, setRealTimeData] = useState({
    temperature: "N/A",
    ph: "N/A",
    turbidity: "N/A",
  });
  const [historicalData, setHistoricalData] = useState({
    temperature: [],
    ph: [],
    turbidity: [],
  });

  // Fetch real-time data
  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        const response = await axios.get(
          "https://api.thingspeak.com/channels/2592426/feeds.json?results=2"
        );
        const feeds = response.data.feeds;

        if (feeds && feeds.length > 0) {
          const latestData = feeds[feeds.length - 1];
          setRealTimeData({
            temperature: latestData.field1 || "N/A",
            ph: latestData.field2 || "N/A",
            turbidity: latestData.field3 || "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching real-time data:", error);
      }
    };

    fetchRealTimeData();
  }, []);

  // Fetch historical data
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const temperatureResponse = await axios.get(
          "https://api.thingspeak.com/channels/2592426/fields/1.json?results=10"
        );
        const phResponse = await axios.get(
          "https://api.thingspeak.com/channels/2592426/fields/2.json?results=10"
        );
        const turbidityResponse = await axios.get(
          "https://api.thingspeak.com/channels/2592426/fields/3.json?results=10"
        );

        const temperatureData = temperatureResponse.data.feeds.map((entry) => ({
          time: entry.created_at,
          value: parseFloat(entry.field1) || 0,
        }));

        const phData = phResponse.data.feeds.map((entry) => ({
          time: entry.created_at,
          value: parseFloat(entry.field2) || 0,
        }));

        const turbidityData = turbidityResponse.data.feeds.map((entry) => ({
          time: entry.created_at,
          value: parseFloat(entry.field3) || 0,
        }));

        setHistoricalData({
          temperature: temperatureData,
          ph: phData,
          turbidity: turbidityData,
        });
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, []);

  return (
    <div className="water-quality">
      <h1>Water Quality Management</h1>
      <div className="real-time">
        <h2>Real-Time Data</h2>
        <div className="parameter-cards">
          {Object.keys(realTimeData).map((param) => (
            <div className="card" key={param}>
              <h3>{param.charAt(0).toUpperCase() + param.slice(1)}</h3>
              <p>{realTimeData[param]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="historical">
        <h2>Historical Data</h2>
        <div className="charts">
          <LineChart title="Temperature Trends" data={historicalData.temperature} />
          <LineChart title="pH Trends" data={historicalData.ph} />
          <LineChart title="Turbidity Trends" data={historicalData.turbidity} />
        </div>
      </div>
    </div>
  );
};

export default WaterQuality;
