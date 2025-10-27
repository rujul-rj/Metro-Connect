// backend/routes/users.js
<<<<<<< HEAD
console.log("LOG: users.js file loading..."); // Debug Log

const router = require('express').Router();
// Ensure these paths are correct relative to the routes folder
const User = require('../models/user.model.js');
const { protect } = require('../middleware/authMiddleware.js');
const generateToken = require('../utils/generateToken.js');
const bcrypt = require('bcryptjs');

// --- LOGIN ---
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  console.log('LOG: POST /api/users/login route hit!');
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' });
  try {
    const user = await User.findOne({ email }).select('+password'); // Select password for comparison
    if (user && (await bcrypt.compare(password, user.password))) { // Direct bcrypt compare
      console.log(`Backend: Login successful for ${email}`);
      res.json({
        _id: user._id, username: user.username, email: user.email,
        metroMoneyBalance: user.metroMoneyBalance, token: generateToken(user._id),
      });
    } else {
      console.log(`Backend: Login failed for ${email} (Invalid creds or user not found)`);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) { console.error('Backend: Error during login:', error); res.status(500).json({ message: 'Server error during login' }); }
});

// --- REGISTER ---
// @route   POST /api/users/register
router.post('/register', async (req, res) => {
  console.log('LOG: POST /api/users/register route hit!');
  const { username, email, password } = req.body;
  if (!username || !email || !password || password.length < 6) return res.status(400).json({ message: 'Please provide username, email, and password (min 6 chars)' });
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    // Password hashing happens via pre-save hook in model
    const user = await User.create({ username, email, password });
    if (user) {
      console.log(`Backend: Registration successful for ${email}`);
      res.status(201).json({
        _id: user._id, username: user.username, email: user.email,
        metroMoneyBalance: user.metroMoneyBalance, token: generateToken(user._id),
      });
    } else { res.status(400).json({ message: 'Invalid user data' }); }
  } catch (error) { console.error('Backend: Error during registration:', error); res.status(500).json({ message: 'Server error during registration' }); }
});

// --- GET PROFILE ---
// @route   GET /api/users/profile
router.get('/profile', protect, (req, res) => { // Can be synchronous as protect attaches user
  console.log('LOG: GET /api/users/profile route hit!');
  if (req.user) {
    res.json({ // Send data attached by 'protect' middleware
      _id: req.user._id, username: req.user.username, email: req.user.email,
      metroMoneyBalance: req.user.metroMoneyBalance,
    });
  } else { res.status(404).json({ message: 'User not found (error in protect middleware?)' }); }
});

// --- UPDATE PROFILE ---
// @route   PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  console.log('LOG: PUT /api/users/profile route hit!');
  try {
    const user = await User.findById(req.user._id); // Re-fetch needed for update
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.username = req.body.username || user.username;
    const originalEmail = user.email;
    user.email = req.body.email || user.email;
    if (user.email !== originalEmail) {
       const emailExists = await User.findOne({ email: user.email });
       if (emailExists && emailExists._id.toString() !== user._id.toString()) {
           return res.status(400).json({ message: 'Email already in use' });
       }
    }
    const updatedUser = await user.save();
    res.json({ // Send back updated info + NEW token (best practice)
      _id: updatedUser._id, username: updatedUser.username, email: updatedUser.email,
      metroMoneyBalance: updatedUser.metroMoneyBalance, token: generateToken(updatedUser._id),
    });
  } catch (error) { console.error('Backend: Error updating profile:', error); res.status(500).json({ message: 'Server error updating profile' }); }
});

// --- ADD MONEY ---
// @route   POST /api/users/addmoney
router.post('/addmoney', protect, async (req, res) => {
  console.log('LOG: POST /api/users/addmoney route hit!');
  const { amount } = req.body;
  if (amount == null || isNaN(amount) || Number(amount) <= 0) return res.status(400).json({ message: 'Invalid amount' });
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.metroMoneyBalance += Number(amount);
    const updatedUser = await user.save();
    console.log(`Backend: Added ${amount} for ${user.email}. New balance: ${updatedUser.metroMoneyBalance}`);
    res.json({ metroMoneyBalance: updatedUser.metroMoneyBalance });
  } catch (error) { console.error('Backend: Error adding money:', error); res.status(500).json({ message: 'Server error adding money' }); }
});

// --- WITHDRAW MONEY ---
// @route   POST /api/users/withdrawmoney
router.post('/withdrawmoney', protect, async (req, res) => {
  console.log('LOG: POST /api/users/withdrawmoney route hit!');
  const { amount } = req.body;
  if (amount == null || isNaN(amount) || Number(amount) <= 0) return res.status(400).json({ message: 'Invalid amount' });
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.metroMoneyBalance < Number(amount)) return res.status(400).json({ message: 'Insufficient balance' });
    user.metroMoneyBalance -= Number(amount);
    const updatedUser = await user.save();
    console.log(`Backend: Withdrew ${amount} for ${user.email}. New balance: ${updatedUser.metroMoneyBalance}`);
    res.json({ metroMoneyBalance: updatedUser.metroMoneyBalance });
  } catch (error) { console.error('Backend: Error withdrawing money:', error); res.status(500).json({ message: 'Server error withdrawing money' }); }
});

// --- CHANGE PASSWORD ---
// @route   PUT /api/users/changepassword
router.put('/changepassword', protect, async (req, res) => {
  console.log('LOG: PUT /api/users/changepassword route hit!');
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 6) return res.status(400).json({ message: 'Provide current and new password (min 6 chars)' });
  try {
      // Re-fetch user with password to use matchPassword method
      const user = await User.findById(req.user._id).select('+password');
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (await bcrypt.compare(currentPassword, user.password)) {
          user.password = newPassword; // Pre-save hook will hash
          await user.save();
          console.log(`Backend: Password changed for ${user.email}`);
          res.json({ message: 'Password updated successfully' });
      } else {
          console.log(`Backend: Password change failed for ${user.email} - Invalid current password`);
          res.status(401).json({ message: 'Invalid current password' });
      }
  } catch (error) {
      console.error('Backend: Error changing password:', error);
      res.status(500).json({ message: 'Server error changing password' });
  }
});

// --- FUNNY MONEY ACTIONS ---
async function performFunnyAction(req, res, actionFn, actionName) {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const currentBalance = user.metroMoneyBalance;
    let newBalance = actionFn(currentBalance);
    newBalance = Math.max(0, Math.round(newBalance));
    newBalance = Math.min(newBalance, 1000000); // Cap
    user.metroMoneyBalance = newBalance;
    await user.save();
    console.log(`Backend: Funny action '${actionName}' for ${user.email}. New balance: ${newBalance}`);
    res.json({ metroMoneyBalance: newBalance });
  } catch (error) { console.error(`Backend: Error during '${actionName}':`, error); res.status(500).json({ message: error.message || 'Server error' }); }
}
router.post('/multiplymoney', protect, (req, res) => { console.log("LOG: POST /api/users/multiplymoney hit"); performFunnyAction(req, res, b => b * 2, 'multiply'); });
router.post('/dividemoney', protect, (req, res) => { console.log("LOG: POST /api/users/dividemoney hit"); performFunnyAction(req, res, b => b / Math.PI, 'divide'); });
router.post('/squaremoney', protect, (req, res) => { console.log("LOG: POST /api/users/squaremoney hit"); performFunnyAction(req, res, b => b * b, 'square'); });
router.post('/sqrtmoney', protect, (req, res) => { console.log("LOG: POST /api/users/sqrtmoney hit"); performFunnyAction(req, res, b => { if (b < 0) throw new Error("Negative balance!"); return Math.sqrt(b); }, 'sqrt'); });
router.post('/logmoney', protect, (req, res) => { console.log("LOG: POST /api/users/logmoney hit"); performFunnyAction(req, res, b => { if (b <= 0) throw new Error("Non-positive balance!"); return Math.log(b); }, 'log'); });
router.post('/expmoney', protect, (req, res) => { console.log("LOG: POST /api/users/expmoney hit"); performFunnyAction(req, res, b => Math.exp(b), 'exp'); });
router.post('/donatemoney', protect, async (req, res) => {
  console.log("LOG: POST /api/users/donatemoney hit");
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.metroMoneyBalance = 0;
    await user.save();
    console.log(`Backend: Donated all money for ${user.email}.`);
    res.json({ metroMoneyBalance: 0 });
  } catch (error) { console.error(`Backend: Error during donation:`, error); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
console.log("LOG: users.js finished loading."); // Debug Log
=======

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
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
