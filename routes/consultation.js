const express = require("express");
const router = express.Router();
const pool = require("../database_connection/database");

router.get("/", async (req, res) => {
  try {
    // Query the database (example: select all rows from a table)
    const queryResult = await pool.query("SELECT * FROM consultation");
    const data = queryResult.rows;

    // Send the data as JSON response

    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/awaitingConsultation", async (req, res) => {
  try {
    //query the database to get patient information with vitals
    const result = await pool.query(
      "SELECT vt.vital_id, vt.date_and_time, vt.patient_id, pi.first_name, pi.last_name, dob FROM vitals AS vt JOIN patient_information AS pi ON vt.patient_id = pi.patient_id ORDER BY vt.date_and_time DESC;"
    );
    const data = result.rows;
    res.json(data);
    console.log(data);
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
