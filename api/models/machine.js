const mongoose = require('mongoose');

const machineSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  location: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Machine', machineSchema);
