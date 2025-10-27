// backend/models/user.model.js
console.log("LOG: user.model.js file loading..."); // Debug Log

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: [true, 'Please add a username'], unique: true, trim: true },
  email: {
    type: String, required: [true, 'Please add an email'], unique: true, trim: true, lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: { type: String, required: [true, 'Please add a password'], minlength: 6, select: false }, // Exclude by default
  metroMoneyBalance: { type: Number, required: true, default: 0 }
}, { timestamps: true });

// Password compare method - MUST fetch password explicitly if needed
userSchema.methods.matchPassword = async function(enteredPassword) {
  // 'this' refers to the user document, but password might not be selected.
  // We compare directly here assuming the password was fetched if needed.
  // The route handler should select('+password') when fetching for login.
  if (!this.password) {
      console.error("Attempted matchPassword on user doc without password field selected.");
      return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hash password BEFORE saving (on create or password update)
userSchema.pre('save', async function(next) {
  // Only hash if password is new or modified
  if (!this.isModified('password')) {
    return next(); // Skip hashing if password hasn't changed
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass error to Mongoose
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
console.log("LOG: user.model.js finished loading."); // Debug Log