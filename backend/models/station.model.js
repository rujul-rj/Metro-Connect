const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stationSchema = new Schema({
  name: { type: String, required: true },
  line: { type: String, enum: ['Purple', 'Green', 'Yellow', 'Pink', 'Blue'], required: true },
  facilities: { type: [String], default: ['Restroom', 'Ticketing', 'Parking'] },
  shops: { type: [String], default: [] },
  crowdLevel: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
}, {
  timestamps: true,
});

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;