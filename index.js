// index.js 
// imports
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const patients = require('./routes/patients');
const vitals = require('./routes/vitals')
const bills = require('./routes/bills')
const consultation = require('./routes/consultation')
const employees = require('./routes/employees')
const lab = require('./routes/laboratory/lab')
const prescriptions = require('./routes/prescriptions')
const booking = require('./routes/bookings')
const cors = require("cors");
// Mount the middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/patients', patients);
app.use('/vitals', vitals);
app.use('/bill', bills);
app.use('/consultation', consultation)
app.use('/employees', employees)
app.use('/lab', lab)
app.use('/prescriptions', prescriptions)
app.use('/bookings', booking)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
