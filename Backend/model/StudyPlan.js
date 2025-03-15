const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema({
  //   study_topic: { type: String, required: true },
  //   difficulty: { type: String, required: true },
  //   total_weeks: { type: Number, required: true },
  //   weekly_plan: [
  //     {
  //       week: { type: Number, required: true },
  //       title: { type: String, required: true },
  //       topics: [String], // Array of Strings
  //       resources: [
  //         {
  //           name: { type: String, required: true },
  //           url: { type: String, required: true },
  //         },
  //       ],
  //       project: { type: String, required: true },
  //     },
  //   ],
  // }, { timestamps: true }); // ✅ Automatically stores createdAt & updatedAt
  data: { type: String, required: true },
})

const StudyPlan = mongoose.model("StudyPlan", studyPlanSchema);
module.exports = StudyPlan;
