const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // Import your MySQL connection
const { QueryTypes } = require('sequelize');

router.get('/users', async (req, res) => {
  try {
    const results = await sequelize.query('SELECT username, email FROM Users', {
      type: QueryTypes.SELECT,
    });
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

router.get('/user-dashboard', async (req, res) => {
  const { username, email } = req.query;

  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }

  try {
    const results = await sequelize.query(
      'SELECT * FROM Users WHERE username = :username AND email = :email',
      {
        replacements: { username, email },
        type: QueryTypes.SELECT,
      }
    );
    res.json(results);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
});

module.exports = router;