import getSystemInstruction from './Role.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCBkGF3NMHPpvGzuEhPcBpZmnjjjD3Eb38');

async function generateContent(role, prompt) {
  // console.log(role);
  // console.log('1', prompt);
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

export default generateContent;
