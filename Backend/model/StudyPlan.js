// model/studyPlan.js
import mongoose from 'mongoose';

const studyPlanSchema = new mongoose.Schema({
  data: { type: String, required: true }
  // If you plan to use the full schema later, just uncomment and switch back
}, { timestamps: true });

const StudyPlan = mongoose.model('StudyPlan', studyPlanSchema);

export default StudyPlan;
