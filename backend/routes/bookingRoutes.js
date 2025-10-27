// backend/routes/bookingRoutes.js
const router = require('express').Router();
const Booking = require('../models/bookingModel.js');
const User = require('../models/user.model.js'); // <-- 1. IMPORT USER MODEL
const { protect } = require('../middleware/authMiddleware.js');
const { v4: uuidv4 } = require('uuid');

// @desc    Create a new booking AND deduct fare
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, async (req, res) => {
  const { startStation, endStation, fare } = req.body;
  const userId = req.user._id; // Get user ID from protect middleware

  if (!startStation || !endStation || fare == null || fare <= 0) {
    return res.status(400).json({ message: 'Invalid booking details or fare' });
  }

  try {
    // --- 2. ADD MONEY DEDUCTION LOGIC ---
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has enough balance
    if (user.metroMoneyBalance < fare) {
      return res.status(400).json({ message: 'Insufficient Metro Money balance' });
    }

    // Deduct the fare
    user.metroMoneyBalance -= fare;
    await user.save(); // Save the updated user balance
    // --- END OF MONEY DEDUCTION ---

    // 3. Now create the booking
    const booking = new Booking({
      user: userId,
      startStation,
      endStation,
      fare,
      ticketId: uuidv4().split('-')[0].toUpperCase(),
    });

    const createdBooking = await booking.save();

    // 4. Send back the booking AND the new balance
    res.status(201).json({
       booking: createdBooking,
       newBalance: user.metroMoneyBalance // Send the updated balance back
    });

  } catch (error) {
    console.error("Booking Error:", error); // Log the error for debugging
    res.status(500).json({ message: 'Server error creating booking' });
  }
});

// GET /api/bookings/mybookings (This route is fine, no changes needed)
router.get('/mybookings', protect, async (req, res) => {
  // ... your existing code to fetch bookings ...
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
});

module.exports = router;