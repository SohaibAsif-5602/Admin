const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Device = sequelize.define("Device", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("Sensor", "Actuator"),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Online", "Offline"),
    defaultValue: "Offline",
  },
  lastCommunication: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  configuration: {
    type: DataTypes.JSON, // Store configurations as JSON
    allowNull: true,
  },
});

// Sync the model with the database
Device.sync({ alter: true })
  .then(() => {
    console.log("Device table created or updated.");
  })
  .catch((err) => {
    console.error("Error creating Device table:", err);
  });

module.exports = Device;
