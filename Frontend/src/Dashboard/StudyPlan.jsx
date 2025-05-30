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

  const getDifficultyStyles = (difficulty) => {
    const styles = {
      'Easy': 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 border border-emerald-200',
      'Medium': 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200',
      'Hard': 'bg-gradient-to-r from-rose-100 to-red-100 text-red-700 border border-rose-200'
    };
    return styles[difficulty] || styles['Medium'];
  };

  const renderStudyPlanCard = (plan, index) => {
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
        className="group bg-white shadow-lg rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:transform hover:-translate-y-2 cursor-pointer border border-gray-100 relative overflow-hidden animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={() => handleViewDetails(plan._id)}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
              {parsedData.study_topic}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyStyles(parsedData.difficulty)}`}>
                {parsedData.difficulty}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold text-gray-800">Duration:</span>
              <span className="ml-2 text-blue-600 font-bold">{parsedData.total_weeks} weeks</span>
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails(plan._id);
          }}
          className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-3 group-hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <BookOpen className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span>View Details</span>
        </button>
      </div>
    );
  };

  const renderEmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl border border-gray-100 animate-fade-in">
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-full p-8 mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
          <AlertCircle className="w-12 h-12 text-blue-500 relative z-10" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-3">No Study Plans Yet</h3>
      <p className="text-gray-600 text-center mb-8 max-w-md leading-relaxed text-lg">
        Start your learning journey by creating your first personalized study plan tailored just for you!
      </p>

      <button
        onClick={() => navigate('/my-dashbaord')}
        className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
      >
        <BookOpen className="w-5 h-5" />
        <span>Create Study Plan</span>
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-12 flex flex-col items-center">
        {/* Header Section */}
        <div className="flex items-center gap-6 mb-8 animate-fade-in">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              📚 Study Plans
            </h1>
            <p className="text-gray-600 text-xl font-medium">Your personalized AI-powered study roadmap!</p>
          </div>

          <button
            onClick={handleRefresh}
            className={`p-4 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl group ${isRefreshing ? 'animate-spin' : 'hover:scale-110'}`}
            disabled={isRefreshing}
          >
            <RefreshCw className="w-7 h-7 text-blue-600 group-hover:text-purple-600 transition-colors" />
          </button>
        </div>

        {/* Study Plans Grid */}
        <div className="mt-8 w-full max-w-7xl">
          {user?.study_plans?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {user.study_plans.map((plan, index) => renderStudyPlanCard(plan, index))}
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="max-w-2xl w-full">
                {renderEmptyState()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;
