const express = require("express");
const router = express.Router();
const pool = require("../../database_connection/database");






// Define the GET route for fetching all lab requests
router.get('/get-lab-requests', async (req, res) => {
    const sql = 'SELECT * FROM lab_request'; // SQL query to select all data from lab_request table
  
    try {
        const result = await pool.query(sql); // Execute the SQL query
        res.json(result.rows); // Send the resulting rows as JSON
    } catch (err) {
        res.status(500).send(err); // Send error response if query fails
    }
  });
  
  // Defining the POST route for adding a lab request
  router.post('/add-lab-request', async (req, res) => {
    // Destructuring data from the request body
    const { request_id, date_and_time, patient_id, lab_desc, doctor_id } = req.body;
    
    // SQL query to insert data into lab_request table
    const sql = `INSERT INTO lab_request (request_id, date_and_time, patient_id, lab_desc, doctor_id) VALUES ($1, $2, $3, $4, $5)`;
    // Array of values to be inserted
    const values = [request_id, date_and_time, patient_id, lab_desc, doctor_id];
  
    try {
        // Executing the SQL query with the provided values
        const result = await pool.query(sql, values);
        res.send('Record added successfully'); // Sending success response
    } catch (err) {
        res.status(500).send(err); // Sending error response if query fails
    }
  });
  


















module.exports = router;