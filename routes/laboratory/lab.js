const express = require('express');
const router = express.Router();
const pool = require('../../database_connection/database');


// Request the results page
const results = require('./results')
const requests = require('./request')




// redirect to the results page
router.use('/lab_results', results);
router.use('/lab_requests', requests)









module.exports = router;