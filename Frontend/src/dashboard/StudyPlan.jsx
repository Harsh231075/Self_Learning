import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../hooks/useUser';
import { RefreshCw, BookOpen, AlertCircle } from 'lucide-react';

const StudyPlan = () => {
  const navigate = useNavigate();
  const { user, refreshUser } = useUser();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleViewDetails = (id) => {
    navigate(`/study-plan/${id}`);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshUser();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="p-6 lg:p-12 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex flex-col items-center">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-4xl font-bold text-gray-900">📚 Study Plans</h2>
        <button
          onClick={handleRefresh}
          className={`p-2 rounded-full hover:bg-white/50 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
          disabled={isRefreshing}
        >
          <RefreshCw className="w-6 h-6 text-blue-600" />
        </button>
      </div>
      <p className="mt-2 text-gray-600 text-lg">Your personalized AI-powered study roadmap!</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {user?.study_plans?.map((plan, index) => {
          let parsedData;
          try {
            parsedData = JSON.parse(plan.data.replace(/```json|```/g, ""));
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
          }

          return (
            <div
              key={plan._id}
              className="bg-white shadow-xl rounded-2xl p-6 transition-all hover:shadow-2xl hover:transform hover:-translate-y-1 cursor-pointer border border-gray-100"
              onClick={() => handleViewDetails(plan._id)}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">{parsedData.study_topic}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${parsedData.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    parsedData.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                  }`}>
                  {parsedData.difficulty}
                </span>
              </div>
              <div className="space-y-3">
                <p className="text-gray-500">
                  <strong>Duration:</strong> <span className="text-gray-800 font-medium">{parsedData.total_weeks} weeks</span>
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(plan._id);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  View Details
                </button>
              </div>
            </div>
          );
        })}

        {!user?.study_plans?.length && (
          <div className="col-span-full flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="bg-blue-50 rounded-full p-4 mb-4">
              <AlertCircle className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Study Plans Yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Start your learning journey by creating your first personalized study plan!
            </p>
            <button
              onClick={() => navigate('/create-plan')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all"
            >
              Create Study Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlan;