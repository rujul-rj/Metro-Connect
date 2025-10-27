<<<<<<< HEAD
// backend/server.js
require('dotenv').config(); // MUST be first

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- Route Imports ---
// Ensure these paths correctly point to your route files
const stationRoutes = require('./routes/stations');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookingRoutes');
const lostFoundRoutes = require('./routes/lostFoundRoutes'); // Ensure this file exists
console.log("SERVER.JS: userRoutes imported:", !!userRoutes); // Debug log
console.log("SERVER.JS: lostFoundRoutes imported:", !!lostFoundRoutes); // Debug log

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// --- Database Connection ---
const dbURI = process.env.MONGO_URI;
if (!dbURI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in .env file');
  process.exit(1);
}

// --- New Connection Logic ---
const connectDB = async () => {
  try {
    // Make sure 'process.env.MONGO_URI' matches your variable name in .env
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`); // Success!
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`); // Failure!
    process.exit(1); // Exit the process with failure
  }
};

// Call the function to connect
connectDB(); 
// --- End of new code ---

//
// I HAVE REMOVED THE DUPLICATE mongoose.connect(...).then().catch() BLOCK FROM HERE
//

// --- API Route Registration ---
// Map base paths to the imported route handlers
app.use('/api/stations', stationRoutes);
app.use('/api/users', userRoutes);      // Handles all requests starting with /api/users/
app.use('/api/bookings', bookingRoutes);
app.use('/api/lostfound', lostFoundRoutes);
console.log("SERVER.JS: Registered API routes.");

// --- Error Handling Middleware (Optional but recommended) ---
// Add this AFTER your routes
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);
  res.status(500).send('Something broke!');
});


// --- Start Server ---
=======
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
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});