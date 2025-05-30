// model/cartificate.js
import mongoose from 'mongoose';

const cartificateSchema = new mongoose.Schema({
  userName: String,
  courseName: String,
  Date: String,
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Cartificate = mongoose.model("Cartificate", cartificateSchema);

export default Cartificate;
