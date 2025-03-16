import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate for redirection
import AIGuidanceHeader from "./AIGuidanceHeader";
import ProgressBar from "./ProgressBar";
import WelcomeScreen from "./WelcomeScreen";
import QuestionStep from "./QuestionStep";
import axios from "axios";

export function AIGuidance() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigation

  // Questions
  const questions = [
    { id: "learningGoal", question: "What would you like to learn?", options: ["Programming", "Digital Marketing", "Data Science", "Design", "Business", "Languages"] },
    { id: "learningStyle", question: "How do you prefer to learn new things?", options: ["Visual Learning", "Reading & Writing", "Interactive Practice", "Audio & Discussion"] },
    { id: "timeCommitment", question: "How much time can you dedicate daily to learning?", options: ["30 minutes", "1-2 hours", "2-4 hours", "4+ hours"] },
    { id: "difficulty", question: "What level of challenge are you comfortable with?", options: ["Basic - Take it slow", "Moderate - Steady pace", "Advanced - Push my limits", "Expert - Deep dive"] },
    { id: "goalTimeline", question: "When do you want to achieve your learning goal?", options: ["Within 1 month", "3-6 months", "6-12 months", "More than a year"] },
    { id: "motivation", question: "What drives you to learn this subject?", options: ["Career Growth", "Personal Interest", "Specific Project", "Academic Requirement"] },
    { id: "background", question: "What's your current background in this subject?", options: ["Complete Beginner", "Some Basic Knowledge", "Intermediate", "Advanced"] },
    { id: "preferredResources", question: "What type of learning resources do you prefer?", options: ["Video Tutorials", "Interactive Courses", "Books & Articles", "Project-Based Learning"] }
  ];

  // Start AI Guidance
  const handleStart = () => {
    setStarted(true);
  };

  // Handle Answer Selection
  const handleAnswer = (answer) => {
    const currentQuestion = questions[step];
    setAnswers({ ...answers, [currentQuestion.id]: answer });

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleFinalSubmit();
    }
  };

  // Handle Back Button
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Submit User Answers to Backend
  const handleFinalSubmit = async () => {
    setSubmitted(true);
    setLoading(true);

    const prompt = `
"What would you like to learn? Share your learning goals with us.\n\n${answers.learningGoal}\n\nHow do you prefer to learn new things?\n\n${answers.learningStyle}\n\nHow much time can you dedicate daily to learning?\n\n${answers.timeCommitment}\n\nWhat level of challenge are you comfortable with?\n\n${answers.difficulty}\n\nWhen do you want to achieve your learning goal?\n\n${answers.goalTimeline}\n\nWhat drives you to learn this subject?\n\n${answers.motivation}\n\nWhat's your current background in this subject?\n\n${answers.background}\n\nWhat type of learning resources do you prefer?\n\n${answers.preferredResources}"
    `;

    // console.log("Sending prompt to AI:", prompt);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/ai/request`,
        { prompt, role: "confuse_user" },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      // console.log("AI Response Received:", response.data.finalresponse);
      setAiResponse(response.data.finalresponse);

      // ✅ Redirect to CompletionScreen & pass aiResponse
      navigate("/completion", { state: { aiResponse: response.data.finalresponse } });

    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header & Back Button */}
          {started && <AIGuidanceHeader step={step} handleBack={handleBack} />}
          {started && !submitted && <ProgressBar step={step} totalSteps={questions.length} />}

          {/* UI Logic */}
          {!started ? (
            <WelcomeScreen handleStart={handleStart} />
          ) : submitted ? (
            loading ? (
              // Show Beautiful Loading UI while AI response is being fetched
              <div className="text-center py-6">
                <div className="flex justify-center items-center mb-4">
                  <div className="w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Analyzing your learning profile...</h3>
                <p className="text-gray-600 mt-2">Hold tight! Our AI is generating the best recommendations for you.</p>
              </div>
            ) : (
              // ✅ Once response is ready, navigate to CompletionScreen
              <div className="text-center py-6">
                <h3 className="text-xl font-semibold text-green-600">✅ Redirecting to Results...</h3>
                <p className="text-gray-600 mt-2">Your personalized recommendations are ready. You are being redirected.</p>
              </div>
            )
          ) : (
            <QuestionStep question={questions[step]} handleAnswer={handleAnswer} />
          )}
        </div>
      </div>
    </div>
  );
}
