const express = require("express");
const router = express.Router();
const { generateCSV } = require("../utils/reportGenerator");

router.get("/reports/daily", async (req, res) => {
  try {
    const csvData = await generateCSV("daily");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=daily-report.csv");
    res.status(200).send(csvData);
  } catch (error) {
    console.error("Error generating daily report:", error);
    res.status(500).json({ error: "Failed to generate daily report" });
  }
});

module.exports = router;
