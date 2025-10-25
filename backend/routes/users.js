// backend/routes/users.js

const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- 1. REGISTER A NEW USER ---
// @route   POST /api/users/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // 2. Create new user instance
    user = new User({
      username,
      email,
      password,
    });

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save user to database
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- 2. LOGIN A USER ---
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // 3. Create a JWT Payload (the data to store in the token)
    const payload = {
      user: {
        id: user.id,
        username: user.username
      }
    };

    // 4. Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Your secret from .env
      { expiresIn: '3h' }, // Token expires in 3 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token back to the client
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;