const express = require('express');
const router = express.Router();
const pool = require('../database_connection/database')

router.get('/', async(req, res) => {
  try {
    // Query the database (example: select all rows from a table)
    const queryResult = await pool.query("SELECT * FROM lab");
    const data = queryResult.rows;

    // Send the data as JSON response
    
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  
});



module.exports = router;