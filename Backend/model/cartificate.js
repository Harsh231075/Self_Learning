const mongoose = require('mongoose')

const cartificateSchema = new mongoose.Schema({
  userName: String,
  courseName: String,
  Date: String,
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})

const cartificate = mongoose.model("Cartificate", cartificateSchema);
module.exports = cartificate;