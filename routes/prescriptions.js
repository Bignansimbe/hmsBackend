const express = require('express');
const router = express.Router();
const pool = require('../database_connection/database')

router.get('/', async(req, res) => {
  try {
    // Query the database (example: select all rows from a table)
    const queryResult = await pool.query("SELECT * FROM prescription");
    const data = queryResult.rows;

    // Send the data as JSON response
    
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
});

router.post('/prescribe', async (req, res) => {
  try {
    // Extract data from the request body (assuming JSON format)
    const { 
      patientId,
      prescriptionDate,
      prescriptions,
      prescriptionCost,
      doctorId,
      pharmacistId
      } = req.body;

    console.log('Received request body:', req.body)

    // Insert the record into the database
    await pool.query(
      'INSERT INTO prescription (patient_id, prescription_date, prescriptions, prescription_cost, doctor_id, pharmacist_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [patientId,
        prescriptionDate,
        prescriptions,
        prescriptionCost,
        doctorId,
        pharmacistId
        ]
    );

    res.status(200).send('submitted successfully');
  } catch (error) {
    console.error('Error inserting record:', error);
    res.status(500).send('submission unsuccessful!');
  }
});



module.exports = router;