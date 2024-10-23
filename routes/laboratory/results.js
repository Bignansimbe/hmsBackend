const express = require("express");
const router = express.Router();
const pool = require("../../database_connection/database");


// Define a route to get data from the lab_results table
router.get('/', async (req, res) => { // When a GET request is made to '/lab_results'
    try {
      const result = await pool.query('SELECT * FROM lab_results'); // Execute a SQL query to select all rows from lab_results table
      res.json(result.rows); // Send the query results as a JSON response
    } catch (err) { // If there is an error during query execution
      console.error(err); // Log the error to the console
      res.status(500).send('Error fetching data'); // Send a 500 Internal Server Error response
    }
  });
  

  // Add a new lab result
router.post('/add_lab_results', async (req, res) => {
    const { date_and_time, request_id, patient_id, result, employee_id } = req.body;
    try {
      const results = await pool.query(
        'INSERT INTO lab_results (date_and_time, request_id, patient_id, result, employee_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
        [date_and_time, request_id, patient_id, result, employee_id]
      );
      res.status(201).json(results.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding data');
    }
  });
  
  // Update an existing lab result
  router.put('/update_lab_results/:id', async (req, res) => {
    const { id } = req.params;
    const { date_and_time, request_id, patient_id, result, employee_id } = req.body;
    try {
      const results = await pool.query(
        'UPDATE lab_results SET date_and_time = $1, request_id = $2, patient_id = $3, result = $4, employee_id = $5 WHERE result_id = $6 RETURNING *', 
        [date_and_time, request_id, patient_id, result, employee_id, id]
      );
      res.json(results.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating data');
    }
  });
  
  // Delete a lab result
  router.delete('/delete_lab_results/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM lab_results WHERE result_id = $1', [id]);
      res.status(204).send(); // 204 No Content
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting data');
    }
  });

















module.exports = router;