import React, { useState } from "react";
import axios from "axios";
import "../styles/Reports.css";

const ReportPage = () => {
  const [reportType, setReportType] = useState("daily");
  const THINGSPEAK_READ_API_KEY = "45H5S1N645GKKUCB"; 
  const CHANNEL_ID = "2592426";

  // Generate and download the report
  const downloadReport = async () => {
    try {
      // Fetch data from ThingSpeak
      const response = await axios.get(
        `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${THINGSPEAK_READ_API_KEY}`
      );

      const feeds = response.data.feeds;
      if (!feeds.length) {
        console.error("No data available from ThingSpeak.");
        return;
      }

      // Generate CSV from ThingSpeak data
      const csvHeader = "ID,Parameter,Value,Timestamp\n";
      const csvRows = feeds
        .flatMap((feed, index) => [
          {
            id: index + 1,
            parameter: "Temperature",
            value: feed.field1,
            timestamp: feed.created_at,
          },
          {
            id: index + 1,
            parameter: "pH",
            value: feed.field2,
            timestamp: feed.created_at,
          },
          {
            id: index + 1,
            parameter: "Turbidity",
            value: feed.field3,
            timestamp: feed.created_at,
          },
        ])
        .map(
          (item) =>
            `${item.id},${item.parameter},${item.value},${new Date(
              item.timestamp
            ).toISOString()}`
        )
        .join("\n");

      const csvContent = csvHeader + csvRows;

      // Create a URL for the file
      const url = window.URL.createObjectURL(new Blob([csvContent], { type: "text/csv" }));
      const link = document.createElement("a");
      link.href = url;

      // Set the filename
      const fileName = `${reportType}-report.csv`;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the report:", error);
    }
  };

  return (
    <div className="report-page">
      <h1>Download Reports</h1>

      {/* Report Type Selector */}
      <div className="report-type-selector">
        <label>
          <input
            type="radio"
            value="daily"
            checked={reportType === "daily"}
            onChange={(e) => setReportType(e.target.value)}
          />
          Daily Report
        </label>
        {/* You can add more report types here if needed */}
      </div>

      {/* Download Button */}
      <button onClick={downloadReport}>Download {reportType} Report</button>
    </div>
  );
};

export default ReportPage;
