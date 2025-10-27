// backend/middleware/authMiddleware.js
console.log("LOG: authMiddleware.js file loading..."); // Debug Log

const jwt = require('jsonwebtoken');
// Ensure path is correct relative to middleware folder
const User = require('../models/user.model.js');

const protect = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1]; // Extract token
      if (!process.env.JWT_SECRET) { throw new Error("JWT_SECRET missing on server"); }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from token, EXCLUDE password
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
         console.error(`Auth Error: User not found for token ID: ${decoded.id}`);
         // Send 401 Unauthorized if user doesn't exist anymore
         return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next(); // User is valid, proceed to the route handler

    } catch (error) {
      console.error('Auth Error: Token verification failed:', error.message);
      // Handle specific JWT errors
      if (error.name === 'JsonWebTokenError') return res.status(401).json({ message: 'Not authorized, token invalid' });
      if (error.name === 'TokenExpiredError') return res.status(401).json({ message: 'Not authorized, token expired' });
      // General failure
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) { // If no token was found in the header at all
    console.error('Auth Error: No token provided in Authorization header');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
console.log("LOG: authMiddleware.js finished loading."); // Debug Log