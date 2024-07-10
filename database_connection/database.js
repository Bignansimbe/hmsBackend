// db.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "aoh_ownership",
  host: "postgresql-178159-0.cloudclusters.net", // Change this if your database is hosted elsewhere
  database: "postgres",
  password: "AOH2007",
  port: 10007, // Default PostgreSQL port
});




module.exports = pool;
