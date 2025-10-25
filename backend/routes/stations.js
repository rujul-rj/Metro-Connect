const router = require('express').Router();
let Station = require('../models/station.model');

// GET: Fetch all stations
router.route('/').get((req, res) => {
  Station.find()
    .then(stations => res.json(stations))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST: Add a new station
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

module.exports = router;