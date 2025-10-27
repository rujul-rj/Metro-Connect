// backend/models/bookingModel.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Links this to your user.model.js
  },
  startStation: {
    type: String,
    required: true,
  },
  endStation: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;