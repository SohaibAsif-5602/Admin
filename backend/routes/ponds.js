const express = require("express");
const router = express.Router();
const sequelize = require("../config/db"); // Import your MySQL connection
const nodemailer = require("nodemailer"); // Import nodemailer

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other email services
  auth: {
    user: "tahashayan812@gmail.com", // Replace with your email
    pass: "sfjsumbfjseikgzj", // Replace with your app-specific password
  },
});

// Get all ponds
router.get("/", async (req, res) => {
  try {
    const [ponds] = await sequelize.query("SELECT * FROM Pond");
    res.json(ponds);
  } catch (error) {
    console.error("Error fetching ponds:", error);
    res.status(500).json({ error: "Failed to fetch ponds" });
  }
});

// Approve a pond and send an email
router.put("/:pond_id/approve", async (req, res) => {
  try {
    const { pond_id } = req.params;

    if (!pond_id) {
      return res.status(400).json({ error: "Pond ID is required" });
    }

    console.log("Approving pond with ID:", pond_id);

    // Update pond status to "approved"
    const [updateResult] = await sequelize.query(
      "UPDATE Pond SET status = 'approved' WHERE pond_id = :pond_id",
      {
        replacements: { pond_id },
        type: sequelize.QueryTypes.UPDATE,
      }
    );

    if (updateResult === 0) {
      return res.status(404).json({ error: "Pond not found" });
    }

    // Fetch the user_id associated with the pond
    const [pond] = await sequelize.query(
      "SELECT user_id FROM Pond WHERE pond_id = :pond_id",
      {
        replacements: { pond_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!pond) {
      return res.status(404).json({ error: "No user associated with this pond" });
    }

    const { user_id } = pond;

    // Fetch user email using user_id
    const [user] = await sequelize.query(
      "SELECT email FROM Users WHERE user_id = :user_id",
      {
        replacements: { user_id },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found for email" });
    }

    console.log("User email:", user.email);

    const userEmail = user.email;

    // Send approval email
    const mailOptions = {
      from: "tahashayan812@gmail.com", // Replace with your email
      to: userEmail,
      subject: "Pond Approved",
      text: "Congratulations! Your pond has been approved. You can now access all features.",
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Pond approved successfully, and email sent to the user" });
  } catch (error) {
    console.error("Error approving pond:", error.message);
    res.status(500).json({ error: "Failed to approve pond", details: error.message });
  }
});

// Delete a pond by pond_id
router.delete("/:pond_id", async (req, res) => {
  try {
    const { pond_id } = req.params;

    if (!pond_id) {
      return res.status(400).json({ error: "Pond ID is required" });
    }

    const [deleteResult] = await sequelize.query(
      "DELETE FROM Pond WHERE pond_id = :pond_id",
      {
        replacements: { pond_id },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: "Pond not found" });
    }

    res.json({ message: "Pond deleted successfully" });
  } catch (error) {
    console.error("Error deleting pond:", error.message);
    res.status(500).json({ error: "Failed to delete pond", details: error.message });
  }
});

module.exports = router;
