require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const deviceRoutes = require("./routes/devices");
const alertsRoutes = require("./routes/alerts");
const reportRoutes = require("./routes/reports");
const pondRoutes = require("./routes/ponds");
const userDashboardRoute = require('./routes/userDashboard');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Database Connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to MySQL database.");
  })
  .catch((err) => {
    console.error("Unable to connect to MySQL:", err);
  });

// Routes
app.use("/api", alertsRoutes);
app.use("/api", reportRoutes);
app.use("/api/ponds", pondRoutes);
app.use("/api/devices", deviceRoutes);
app.use('/api', userDashboardRoute);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
