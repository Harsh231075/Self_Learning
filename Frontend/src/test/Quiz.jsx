import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function QuizComponent() {
  const [questions, setQuestions] = useState([]); // ✅ Store only the questions array
  const [quizTitle, setQuizTitle] = useState(""); // ✅ Store quiz topic
  const [difficulty, setDifficulty] = useState(""); // ✅ Store difficulty level
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { prompt, testInfo } = location.state || "I want a quiz.";

  // console.log("certifiacte=>", testInfo);

  // **Fetch Questions from Backend**
  useEffect(() => {
    const role = "quiz";
    const token = localStorage.getItem("token");

    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/ai/request`,
          { prompt, role },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log()

        // ✅ Step 1: Clean the AI response
        const cleanedText = response.data.finalresponse.replace(/```json|```/g, "").trim();

        // ✅ Step 2: Parse the cleaned JSON
        const jsonData = JSON.parse(cleanedText);
        console.log("Parsed Quiz Data:", jsonData);


        // ✅ Step 3: Extract and store relevant fields
        setQuizTitle(jsonData.quiz_topic);
        setDifficulty(jsonData.difficulty);
        setQuestions(jsonData.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // **Handle Answer Selection**
  const handleAnswerSelect = (questionText, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionText]: option, // ✅ Store answer using question text
    }));
  };

  // **Navigate to Next Question**
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // **Navigate to Previous Question**
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // **Submit Quiz**

  // Update handleSubmit
  const handleSubmit = () => {
    navigate("/quiz-submit", {
      state: {
        answers,
        questions,
        testInfo // Pass testInfo to quiz submit
      }
    });
  };


  // **Loading State**
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <p className="text-gray-600 ml-3">Loading quiz questions...</p>
      </div>
    );
  }

  // **No Questions Error**
  if (questions.length === 0) {
    return <p className="text-center text-gray-600">No questions available.</p>;
  }

  // ✅ Get the current question from the array
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6">
        {/* ✅ Display Quiz Title and Difficulty */}
        <h2 className="text-xl font-semibold text-gray-900">{quizTitle}</h2>
        <p className="text-sm text-gray-500">Difficulty: {difficulty}</p>

        {/* ✅ Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
          <div
            className="h-2 bg-purple-600 transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* ✅ Question */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h3>
          <div className="mt-4 space-y-3">
            {/* ✅ Properly Render Options */}
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion.question, option)}
                className={`block w-full text-left px-4 py-3 rounded-lg border transition ${answers[currentQuestion.question] === option
                  ? "border-purple-600 bg-purple-50 text-purple-900 font-semibold"
                  : "border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 disabled:bg-gray-100"
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit
              <CheckCircle className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
