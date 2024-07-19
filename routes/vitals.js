
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

// Route to fetch vitals by patient ID
router.get('/patientVital/:patientId', async (req, res) => {
  const { patientId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM vitals WHERE patient_id = $1 ORDER BY date_and_time DESC LIMIT 1',
      [patientId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Vitals not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/insertVitals', async (req, res) => {
  try {
    // Extract data from the request body (assuming JSON format)
    const { 
      vitalId,
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
      'INSERT INTO vitals (vital_id, patient_id, date_and_time, weight, temperature, blood_pressure, heart_rate, glucose_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [vitalId,
        patientId,
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