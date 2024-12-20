const express = require("express");
const axios = require("axios");

const router = express.Router();

// Route to fetch alerts from ThingSpeak
router.get("/alerts", async (req, res) => {
  try {
    const apiKey = "TAKZBbwP0+NL+AuhU+Y"; // Replace with your actual API key
    const url = "https://api.thingspeak.com/alerts/history?count=1";

    const response = await axios.get(url, {
      headers: {
        "ThingSpeak-Alerts-API-Key": apiKey,
      },
    });

    res.json(response.data); // Send the alerts back to the client
  } catch (err) {
    console.error("Error fetching alerts:", err.message);
    res.status(500).json({ error: "Failed to fetch alerts. Please try again later." });
  }
});

module.exports = router;
