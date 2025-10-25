// This MUST be the very first line to ensure .env variables are loaded
require('dotenv').config();

// --- IMPORTS ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Imports the CORS package to fix the browser error

// --- APP INITIALIZATION ---
const app = express();
const PORT = process.env.PORT || 5001; // Use port from .env or default to 5000

// --- MIDDLEWARE ---
// This section runs on every request that comes into your server.
// The order here is very important.

// 1. CORS: Allows your frontend (on port 3000) to make requests
//    to this backend (on port 5000). This fixes the CORS error.
app.use(cors());
app.use(express.json()); // <-- THIS LINE PARSES JSON BODIES
// --- API ROUTES ---
// This must come AFTER app.use(cors())

app.use('/api/stations', require('./routes/stations'));
app.use('/api/users', require('./routes/users')); // <-- ADD THIS LINE
// ------------------

// 2. JSON Parser: Allows the server to read and understand
//    JSON data sent in the "body" of a request (like from a form).
app.use(express.json());

// --- DATABASE CONNECTION ---
const dbURI = process.env.MONGO_URI; // Get the connection string from your .env file

if (!dbURI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in .env file');
  process.exit(1); // Exit the app if the database string is missing
}

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected...')) // Logs this on successful connection
  .catch(err => console.error('MongoDB connection error:', err)); // Logs the full error if it fails

// --- API ROUTES ---
// This tells Express: "For any URL that starts with /api/stations,
// use the rules defined in the ./routes/stations file."
app.use('/api/stations', require('./routes/stations'));

// (You will add more routes here later, like '/api/users' or '/api/fares')

// --- START THE SERVER ---
// This line actually starts the server and makes it listen for requests.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});