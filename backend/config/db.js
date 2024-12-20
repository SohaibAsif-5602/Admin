const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("FYP", "root", "2003", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Error connecting to the database:", err));

module.exports = sequelize;
