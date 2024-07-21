const mongoose = require('mongoose');

const CallSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  signalData: {
    type: Object,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Call', CallSchema);
