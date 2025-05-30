
import generateContent from '../ai/ai.services.js'

const chatHandler = async (req, res) => {
  const role = "you are ai AI Assistant which help students solve thire problem and doubts"
  try {
    const { message } = req.body;
    console.log("mess", message)
    if (!message) return res.status(400).json({ error: "Message is required" });
    const prompt = message
    const aiResponse = await generateContent(role, prompt);
    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error in chatHandler:", error.message);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export default chatHandler
