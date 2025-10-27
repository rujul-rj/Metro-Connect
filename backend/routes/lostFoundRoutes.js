// backend/routes/lostFoundRoutes.js
console.log("LOG: lostFoundRoutes.js file loading..."); // Log file load

const router = require('express').Router();
// IMPORTANT: Make sure the path and casing matches your model file EXACTLY
const LostFoundItem = require('../models/LostFoundItem.js');
const { protect } = require('../middleware/authMiddleware.js'); // Ensure this path is correct

// --- POST /api/lostfound --- (Submit Report)
router.post('/', protect, async (req, res) => {
  console.log("LOG: POST /api/lostfound route hit.");
  const { status, category, description, station, dateLostFound, contactName, contactInfo } = req.body;
  if (!status || !category || !description || !station || !dateLostFound || !['lost', 'found'].includes(status)) {
    return res.status(400).json({ message: 'Missing or invalid required fields' });
  }
  try {
    const newItem = new LostFoundItem({
      status, category, description, station, dateLostFound, contactName, contactInfo,
      reportedBy: req.user ? req.user._id : null, // Uses req.user from protect middleware
      isClaimed: false,
    });
    const savedItem = await newItem.save();
    console.log(`Backend: New ${status} item reported: ${savedItem._id}`);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error(`Backend: Error reporting ${status} item:`, error);
    if (error.name === 'ValidationError') {
       const messages = Object.values(error.errors).map(val => val.message);
       return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error reporting item' });
  }
});

// --- GET /api/lostfound/found --- (Fetch Found Items)
router.get('/found', async (req, res) => {
  console.log("LOG: GET /api/lostfound/found route hit!");
  try {
    const foundItems = await LostFoundItem.find({ status: 'found', isClaimed: false })
      .sort({ createdAt: -1 })
      .select('-contactName -contactInfo -reportedBy'); // Exclude sensitive info

    console.log(`Backend: Found ${foundItems.length} items to return.`);
    res.json(foundItems);
  } catch (error) {
    console.error('Backend: Error fetching found items:', error);
    res.status(500).json({ message: 'Server error fetching found items' });
  }
});

module.exports = router;
console.log("LOG: lostFoundRoutes.js finished loading."); // Log file load end