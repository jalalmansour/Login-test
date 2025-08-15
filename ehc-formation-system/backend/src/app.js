const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging
app.use(helmet()); // Basic security headers

// Root route
app.get('/', (req, res) => {
  res.send('EHC Training Hub Backend');
});

// Export the app for use in server.js
module.exports = app;