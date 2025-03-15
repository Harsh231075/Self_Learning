const getSystemInstruction = require('./Role.js');

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyCBkGF3NMHPpvGzuEhPcBpZmnjjjD3Eb38');

// console.log(getSystemInstruction(role))
async function generateContent(role, prompt) {
  // console.log("goole", prompt, role)
  console.log(role);
  console.log('1', prompt)
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: getSystemInstruction(role), // Dynamic AI role assignment
  });

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("AI Error:", error);
    return "Error generating AI response.";
  }
}
module.exports = generateContent;