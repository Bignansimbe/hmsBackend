const express = require('express');
const router = express.Router();
const pool = require('../database_connection/database')

router.get('/', async(req, res) => {
  try {
    // Query the database (example: select all rows from a table)
    const queryResult = await pool.query("SELECT * FROM employees");
    const data = queryResult.rows;

    // Send the data as JSON response
    
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
});


router.post('/addEmployee', async (req, res) => {
  try {
    // Extract data from the request body (assuming JSON format)
    const { 
      employeeName,
      employeeAge,
      qualification,
      department,
      address,
      email,
      contact,
      employmentDate,
      employementEndDate
    } = req.body;

    console.log('Received request body:', req.body)

    // Insert the record into the database
    await pool.query(
      'INSERT INTO employees (name, age, qualification, department, address, email, contact, employment_date, employment_end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [
        employeeName,
        employeeAge,
        qualification,
        department,
        address,
        email,
        contact,
        employmentDate,
        employementEndDate]
    );

    res.status(200).send('Submitted successfully!');
  } catch (error) {
    console.error('Error inserting record:', error);
    res.status(500).send('submission unsuccessfull!');
  }
});



module.exports = router;