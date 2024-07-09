// routes/all.js
const express = require('express');
const router = express.Router();
const pool = require('../database_connection/database')
// GET routes
router.get('/', async(req, res) => {
  try {
    // Query the database (example: select all rows from a table)
    const queryResult = await pool.query("SELECT * FROM patient_information");
    const data = queryResult.rows;

    // Send the data as JSON response
    
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post('/insertRecord', async (req, res) => {
  try {
    // Extract data from the request body (assuming JSON format)
    const { 
      patientId,
      firstName,
      lastName,
      dob,
      age,
      gender,
      residence,
      telephone,
      emergencyContact,
      healthInsurance,
      maritalStatus
    } = req.body;

    console.log('Received request body:', req.body)

    // Insert the record into the database
    await pool.query(
      'INSERT INTO patient_information (patient_id, first_name, last_name, dob, age, gender, residence, telephone, emergency_contact, health_insurance, marital_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        patientId,
        firstName,
        lastName,
        dob,
        age,
        gender,
        residence,
        telephone,
        emergencyContact,
        healthInsurance,
        maritalStatus]
    );

    res.status(200).send('Record inserted successfully');
  } catch (error) {
    console.error('Error inserting record:', error);
    res.status(500).send('Error inserting record');
  }
});




module.exports = router;
