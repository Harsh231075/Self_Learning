const express = require("express");
const router = express.Router();
const generateContent = require("../ai/ai.services.js");
const authenticateUser = require("../middleware/authMiddleware");
const StudyPlan = require("../model/StudyPlan");
const User = require("../model/user.js");

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
      };

      // ✅ Confused User ka response store nahi hoga
      if (role === "confuse_user" || role === "quiz") {
        return res.status(200).json({ message: "answer", finalresponse });
      };

      // ✅ Study Plan wale responses hi database me store honge
      const studyPlan = new StudyPlan({ data: finalresponse });
      await studyPlan.save();

      // ✅ User document me StudyPlan ID add karna
      await User.findByIdAndUpdate(req.userId, { $push: { study_plans: studyPlan._id } });

      return res.status(200).json({ message: "Study Plan Created Successfully", finalresponse });
    } else {
      // const PromptRole = "prompt";
      const finalresponse = await generateContent(role, prompt);
      return res.status(200).json({ message: "Study Plan Created Successfully", finalresponse });
    }


  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
