
const express = require('express');
const router = express.Router();
const pool = require('../database_connection/database')

router.get('/', async(req, res) => {
  try {
    // Query the database (example: select all rows from a table)
    const queryResult = await pool.query("SELECT * FROM vitals");
    const data = queryResult.rows;

    // Send the data as JSON response
    
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
});


router.post('/insertVitals', async (req, res) => {
  try {
    // Extract data from the request body (assuming JSON format)
    const { 
      patientId,
        dateAndTime,
        weight,
        temperature,
        bloodPressure,
        heartRate,
        glucoseLevel
    } = req.body;

    console.log('Received request body:', req.body)

    // Insert the record into the database
    await pool.query(
      'INSERT INTO vitals (patient_id, date_and_time, weight, temperature, blood_pressure, heart_rate, glucose_level) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [patientId,
        dateAndTime,
        weight,
        temperature,
        bloodPressure,
        heartRate,
        glucoseLevel
      ]
    );

    res.status(200).send('Vitals successfully submitted!');
  } catch (error) {
    console.error('Error inserting record:', error);
    res.status(500).send('submission unsuccessful');
  }
});






module.exports = router;