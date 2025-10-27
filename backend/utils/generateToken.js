// backend/utils/generateToken.js
console.log("LOG: generateToken.js file loading..."); // Debug Log

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
      console.error('FATAL ERROR: JWT_SECRET is not defined in .env file for token generation');
      // Throwing an error might be better here to halt login if secret is missing
      throw new Error("Cannot generate token: JWT Secret is missing");
  }
  // Sign the token with user ID payload
  return jwt.sign({ id }, secret, {
    expiresIn: '30d', // Set token expiration
  });
};

module.exports = generateToken;
console.log("LOG: generateToken.js finished loading."); // Debug Log