import React, { useState, } from "react";
import { Link, useLocation } from "react-router-dom";
import { Book } from "lucide-react";
import { UserType } from "../Ai/UserType";
import { AIGuidance } from "../AIGuidance/AIGuidance";
import { UserForm } from "../Ai/UserForm";
import QuizComponent from "../test/Quiz"; // Import the quiz component
import { useUser } from '../hooks/useUser';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [userChoice, setUserChoice] = useState(null);
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleUserChoice = (choice) => {
    setUserChoice(choice);
  };

  const handleFeedback = () => {
    navigate('/feedback');
  };

  if (userChoice === "confused") {
    return <AIGuidance />;
  }

  if (location.pathname === "/quiz") {
    return <QuizComponent />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      <div className="flex-1 min-w-0">
        <div className="p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Welcome back,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                {user?.name ? ` ${user.name.charAt(0).toUpperCase() + user.name.slice(1)}` : ' User'}
              </span>
              ! 👋
            </h1>
            <p className="mt-2 text-gray-600">Ready to enhance your knowledge today?</p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {userChoice === null && <UserType onComplete={handleUserChoice} />}
            {userChoice === "clear" && <UserForm />}

            {/* Quiz Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center space-x-6 mb-8">
                <img
                  src={user?.photo || '/default-avatar.png'}
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-4 border-blue-100 shadow-lg object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Ready to Challenge Yourself?</h2>
                  <p className="text-gray-600">Take a quiz and earn your certificate!</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-xl hover:shadow-lg transition-all duration-300">
                <Link to="/test" className="block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-500 rounded-lg p-3 shadow-md">
                        <Book className="h-6 w-6 text-white animate-pulse" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">Start Quiz</h3>
                        <p className="text-gray-600">Test your skills now!</p>
                      </div>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Feedback Section */}
              <div className="mt-6">
                <button
                  onClick={handleFeedback}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Share Your Feedback</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
