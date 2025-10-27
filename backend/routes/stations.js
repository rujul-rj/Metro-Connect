const router = require('express').Router();
<<<<<<< HEAD
const express = require('express');
const getFare = require('../data/fareMatrix.js'); // <-- This line is fixed
=======
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
let Station = require('../models/station.model');

// GET: Fetch all stations
router.route('/').get((req, res) => {
  Station.find()
    .then(stations => res.json(stations))
    .catch(err => res.status(400).json('Error: ' + err));
});

<<<<<<< HEAD
// POST: Add a new station  
=======
// POST: Add a new station
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
router.route('/add').post((req, res) => {
  const { name, line, facilities, shops, crowdLevel } = req.body;

  const newStation = new Station({
    name,
    line,
    facilities,
    shops,
    crowdLevel,
  });

  // Sample data to add (you can use Postman to send this)
  // {
  //   "name": "Majestic (Nadaprabhu Kempegowda)",
  //   "line": "Purple",
  //   "facilities": ["Restroom", "Parking", "Food Court", "Interchange"],
  //   "shops": ["Asha Sweets", "Bookstall"],
  //   "crowdLevel": "High"
  // }

  newStation.save()
    .then(() => res.json('Station added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

<<<<<<< HEAD
// @desc    Calculate fare between two stations
// @route   POST /api/stations/calculate-fare
// @access  Public (or Private if you want only logged-in users to see it)
router.post('/calculate-fare', (req, res) => {
  const { startStation, endStation } = req.body;

  if (!startStation || !endStation) {
    return res.status(400).json({ message: 'Please select both stations' });
  }

  const fare = getFare(startStation, endStation);

  if (fare !== null) {
    res.json({ fare: fare });
  } else {
    // This block is now fixed
    res.status(404).json({ message: 'Could not calculate fare' });
  }
});

module.exports = router;

=======
module.exports = router;
>>>>>>> f2cee92c094d2c6df22d0f22bc55c8592bdbe6e1
