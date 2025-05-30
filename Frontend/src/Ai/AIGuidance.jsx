import React, { useState } from "react";
import { Brain, ArrowLeft, Sparkles, Send, BookOpen, PenTool, CheckCircle, ClipboardList } from "lucide-react";

export function AIGuidance() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const [customAnswer, setCustomAnswer] = useState("");
  const [isTypingMode, setIsTypingMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: "learningGoal",
      question: "What would you like to learn? Share your learning goals with us.",
      options: ["Programming", "Digital Marketing", "Data Science", "Design", "Business", "Languages"]
    },
    {
      id: "learningStyle",
      question: "How do you prefer to learn new things?",
      options: ["Visual Learning", "Reading & Writing", "Interactive Practice", "Audio & Discussion"]
    },
    {
      id: "timeCommitment",
      question: "How much time can you dedicate daily to learning?",
      options: ["30 minutes", "1-2 hours", "2-4 hours", "4+ hours"]
    },
    {
      id: "difficulty",
      question: "What level of challenge are you comfortable with?",
      options: ["Basic - Take it slow", "Moderate - Steady pace", "Advanced - Push my limits", "Expert - Deep dive"]
    },
    {
      id: "goalTimeline",
      question: "When do you want to achieve your learning goal?",
      options: ["Within 1 month", "3-6 months", "6-12 months", "More than a year"]
    },
    {
      id: "motivation",
      question: "What drives you to learn this subject?",
      options: ["Career Growth", "Personal Interest", "Specific Project", "Academic Requirement"]
    },
    {
      id: "background",
      question: "What's your current background in this subject?",
      options: ["Complete Beginner", "Some Basic Knowledge", "Intermediate", "Advanced"]
    },
    {
      id: "preferredResources",
      question: "What type of learning resources do you prefer?",
      options: ["Video Tutorials", "Interactive Courses", "Books & Articles", "Project-Based Learning"]
    }
  ];

  const handleStart = () => {
    setStarted(true);
  };

  const handleOptionSelect = (answer) => {
    const currentQuestion = questions[step];
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    setCustomAnswer("");
    setIsTypingMode(false);
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleCustomSubmit = () => {
    if (customAnswer.trim()) {
      const currentQuestion = questions[step];
      setAnswers({ ...answers, [currentQuestion.id]: customAnswer });
      setCustomAnswer("");
      setIsTypingMode(false);
      if (step < questions.length - 1) {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setIsTypingMode(false);
      setCustomAnswer("");
    }
  };

  const handleFinalSubmit = () => {
    setSubmitted(true);
    // Here you can add logic to send the answers to your backend
    console.log("Final Answers:", answers);
  };

  const renderWelcomeScreen = () => (
    <div className="text-center space-y-6">
      <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="h-8 w-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Learning Journey</h1>
      <p className="text-gray-600 max-w-md mx-auto">
        Let's create a personalized learning path just for you. We'll ask you a few questions to understand your goals and preferences better.
      </p>
      <button
        onClick={handleStart}
        className="mt-8 bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center gap-2 text-lg"
      >
        Start Your Journey
        <Sparkles className="w-5 h-5" />
      </button>
    </div>
  );

  const renderQuestion = () => {
    const currentQuestion = questions[step];
    const isLastQuestion = step === questions.length - 1;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-800">{currentQuestion.question}</h3>

        {isTypingMode ? (
          <div className="space-y-4">
            <textarea
              value={customAnswer}
              onChange={(e) => setCustomAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full h-32 p-4 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
            />
            <button
              onClick={handleCustomSubmit}
              disabled={!customAnswer.trim()}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continue
              <Send className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className="p-4 border border-gray-200 rounded-lg text-left hover:bg-purple-50 hover:border-purple-300 transition-all group"
                >
                  <span className="text-gray-700 group-hover:text-purple-700">{option}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsTypingMode(true)}
              className="w-full mt-4 py-3 text-purple-600 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
            >
              <PenTool className="w-4 h-4" />
              I want to type my own answer
            </button>
            {isLastQuestion && answers[currentQuestion.id] && (
              <button
                onClick={handleFinalSubmit}
                className="w-full mt-4 bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-lg font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                Submit All Answers
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderProgress = () => {
    const currentProgress = ((step + 1) / questions.length) * 100;

    return (
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${currentProgress}%` }}
        />
      </div>
    );
  };

  const renderCompletionScreen = () => (
    <div className="text-center py-8 space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-2xl font-semibold text-gray-800">Thank you for sharing!</h3>

      {/* Summary Section */}
      <div className="mt-8 text-left bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-purple-50 border-b border-purple-100 flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-purple-600" />
          <h4 className="font-medium text-purple-900">Your Learning Profile Summary</h4>
        </div>
        <div className="divide-y divide-gray-100">
          {questions.map((q) => (
            <div key={q.id} className="p-4 hover:bg-gray-50 transition-colors">
              <p className="text-sm font-medium text-gray-600">{q.question}</p>
              <p className="mt-1 text-base text-gray-900">{answers[q.id]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  {/* <div className="mt-8 p-6 bg-purple-50 rounded-lg">
        <h4 className="text-lg font-medium text-purple-800 mb-2">What's Next?</h4>
        <p className="text-purple-600">
          Our AI system is analyzing your responses to create the most effective learning journey for your goals. We'll consider your learning style, time commitment, and experience level to ensure the best possible outcome.
        </p>
      </div> */}

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Header */}
          {started && (
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-800">AI Learning Assistant</h2>
              </div>
              {step > 0 && !submitted && (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Back
                </button>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {started && !submitted && (
            <div className="mb-8">{renderProgress()}</div>
          )}

          {/* Content */}
          {!started ? (
            renderWelcomeScreen()
          ) : submitted ? (
            renderCompletionScreen()
          ) : (
            <div className="min-h-[300px]">
              {renderQuestion()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

