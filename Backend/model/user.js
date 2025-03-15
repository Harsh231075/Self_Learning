const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  photo: String,
  study_plans: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudyPlan" }], // ✅ Array of study plan IDs
  rank: { type: Number, default: 0 },
  cartificate: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cartificate" }],
  referralCode: {
    type: String,
    unique: true
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  referral: { type: Number, default: 0 },
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;

