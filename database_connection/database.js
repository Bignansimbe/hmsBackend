// db.js
const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: "postgres://default:FKPcf52pgmZb@ep-patient-bush-a40pc8yq-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require?sslmode=require",
})



module.exports = pool;
