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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});