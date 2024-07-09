// db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "aoh_ownership",
  host: "localhost", // Change this if your database is hosted elsewhere
  database: "postgres",
  password: "AOH2007",
  port: 5432, // Default PostgreSQL port
});




module.exports = pool;
