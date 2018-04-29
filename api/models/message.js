const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
