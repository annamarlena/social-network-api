const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  // reactionId: {} not sure how to get this, thought it was auto generated by mongoose?
  reactionBody: { type: String, required: true, maxLength: 280 },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = Reaction;