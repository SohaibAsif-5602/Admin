const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Alert = sequelize.define("Alert", {
  parameter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("active", "resolved"),
    defaultValue: "active",
  },
});

Alert.sync({ alter: true })
  .then(() => console.log("Alert table created or updated."))
  .catch((err) => console.error("Error creating Alert table:", err));

module.exports = Alert;
