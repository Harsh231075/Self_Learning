import express from "express";
import generateContent from "../ai/ai.services.js";
import authenticateUser from "../middleware/authMiddleware.js";
import StudyPlan from "../model/StudyPlan.js";
import User from "../model/user.js";

const router = express.Router();

// Handle AI-based content generation request
router.post("/request", authenticateUser, async (req, res) => {
  try {
    const { role, prompt } = req.body;

    if (!role || !prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    if (role !== 'performance') {
      const PromptRole = "prompt";
      const response = await generateContent(PromptRole, prompt);

      if (!response) {
        return res.status(400).json({ error: "Error in AI generating content" });
      }

      console.log("AI Generated Prompt =>", response);

      const finalresponse = await generateContent(role, response);

      if (!finalresponse) {
        return res.status(400).json({ error: "Error in AI generating content" });
      }

      // Skip saving for these roles
      if (role === "confuse_user" || role === "quiz") {
        return res.status(200).json({ message: "Answer generated", finalresponse });
      }

      // Save study plan to database
      const studyPlan = new StudyPlan({ data: finalresponse });
      await studyPlan.save();

      // Link study plan to user
      await User.findByIdAndUpdate(req.userId, {
        $push: { study_plans: studyPlan._id }
      });

      return res.status(200).json({ message: "Study Plan Created Successfully", finalresponse });

    } else {
      // Generate performance-related study plan
      const finalresponse = await generateContent(role, prompt);
      return res.status(200).json({ message: "Study Plan Created Successfully", finalresponse });
    }

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
