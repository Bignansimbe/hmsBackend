const express = require("express");
const router = express.Router();
const pool = require("../database_connection/database");
const bcrypt = require("bcrypt"); // Importing bcrypt for hashing passwords

router.get("/", async (req, res) => {
  try {
    // Query the database (example: select all rows from a table)
    const queryResult = await pool.query("SELECT * FROM employees");
    const data = queryResult.rows;

    // Send the data as JSON response

    res.json(data);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/addEmployee", async (req, res) => {
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
      employementEndDate,
    } = req.body;

    console.log("Received request body:", req.body);

    // Insert the record into the database
    await pool.query(
      "INSERT INTO employees (name, age, qualification, department, address, email, contact, employment_date, employment_end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        employeeName,
        employeeAge,
        qualification,
        department,
        address,
        email,
        contact,
        employmentDate,
        employementEndDate,
      ]
    );

    res.status(200).send("Submitted successfully!");
  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).send("submission unsuccessfull!");
  }
});


// Route to store a hashed password
router.post('/store-password', async (req, res) => {
  const { employee_id, password, department } = req.body; // Extracting employee_id, password, and department from the request body

  try {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hashing the password
    const query = 'INSERT INTO e_passwords (employee_id, password, department) VALUES ($1, $2, $3)'; // SQL query to insert hashed password and department
    await pool.query(query, [employee_id, hashedPassword, department]); // Executing the query
    res.status(200).send('Password and department stored successfully');
  } catch (error) {
    console.error('Error storing password and department:', error);
    res.status(500).send('Error storing password and department');
  }
});


// Route to verify a department and password
// Route to verify a department and password
// POST endpoint to verify the user's password and provide feedback for the frontend
router.post("/verify-password", async (req, res) => {
  // Extracting employee_id, department, and password from the request body
  const { employee_id, department, password } = req.body;
  // Logging received input for debugging purposes
  console.log('Received input:', { employee_id, department, password });

  // SQL query to get the hashed password and department associated with the employee_id
  const query = "SELECT password, department FROM e_passwords WHERE employee_id = $1";

  try {
    // Executing the query using the employee_id
    const result = await pool.query(query, [employee_id]);
    // Logging the query result for debugging purposes
    console.log('Query result:', result.rows);

    // Checking if the employee exists in the database
    if (result.rows.length === 0) {
      // If no employee is found, send a 404 response
      return res.status(404).json({ message: "Employee not found" });
    }

    // Retrieved hashed password and department from the database
    const { password: hashedPassword, department: storedDepartment } = result.rows[0];
    // Logging retrieved data for debugging purposes
    console.log('Stored data:', { hashedPassword, storedDepartment });

    // Checking if the department matches the stored department
    if (storedDepartment !== department) {
      // If the department does not match, send a 403 response
      return res.status(403).json({ message: "Unauthorized department" });
    }

    // Comparing the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, hashedPassword);
    // Logging password match result for debugging purposes
    console.log('Password match:', isMatch);

    // If the passwords do not match, send a 401 response
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Send a 200 response with success message and department on successful login
    res.status(200).json({ message: "Login successful", department, employee_id });
  } catch (error) {
    // Logging error and sending error response
    console.error("Error verifying password:", error);
    res.status(500).json({ message: "Error verifying password" });
  }
});




module.exports = router;
