const express = require("express");
const router = express.Router();
const pool = require("../database_connection/database");

router.get("/", async (req, res) => {
  try {
    // Query the database (example: select all rows from a table)
    const queryResult = await pool.query("SELECT * FROM book_consultation");
    const data = queryResult.rows;

    // Send the data as JSON response

    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET RECENT BOOKINGS

router.get("/recentBookings", async (req, res) => {
  try {
    // Query the database (example: select all rows from a table)
    const queryResult = await pool.query(
      "SELECT bc.bookings_id, bc.date, bc.patient_id, bc.health_insurance, pi.first_name, pi.last_name FROM book_consultation AS bc JOIN patient_information AS pi ON bc.patient_id = pi.patient_id ORDER BY bc.date DESC;"
    );
    const data = queryResult.rows;

    // Send the data as JSON response

    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/book", async (req, res) => {
  try {
    // Extract data from the request body (assuming JSON format)
    const { bookingsId, date, patientId, healthInsurance } = req.body;

    console.log("Received request body:", req.body);

    // Insert the record into the database
    await pool.query(
      "INSERT INTO book_consultation (bookings_id, date, patient_id, health_insurance) VALUES ($1, $2, $3, $4)",
      [bookingsId, date, patientId, healthInsurance]
    );

    res.status(200).send("successfully booked");
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).send("booking unsuccessful!");
  }
});

module.exports = router;
