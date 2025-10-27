// backend/models/LostFoundItem.js
const mongoose = require('mongoose');

const lostFoundItemSchema = new mongoose.Schema({
  status: { type: String, required: true, enum: ['lost', 'found'] },
  category: { type: String, required: [true, 'Please select a category'], enum: ['Electronics', 'Bags/Luggage', 'Clothing/Accessories', 'ID/Cards/Wallets', 'Keys', 'Other'] },
  description: { type: String, required: [true, 'Please provide a description'], maxlength: [500, 'Description max 500 chars'] },
  station: { type: String, required: [true, 'Please specify the station'] },
  dateLostFound: { type: Date, required: [true, 'Please provide the date'] },
  contactName: { type: String, maxlength: [100, 'Name max 100 chars'] },
  contactInfo: { type: String, maxlength: [100, 'Contact info max 100 chars'] },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  isClaimed: { type: Boolean, default: false }
}, { timestamps: true });

const LostFoundItem = mongoose.model('LostFoundItem', lostFoundItemSchema);

module.exports = LostFoundItem;