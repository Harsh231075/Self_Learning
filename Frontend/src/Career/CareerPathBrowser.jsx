import React from "react";
import { ChevronRight, ChevronLeft, ThumbsUp, Target } from "lucide-react";
import { motion } from "framer-motion";
import PathCard from "./PathCard"; // Assuming PathCard.js is in the same directory or correct path

export default function CareerPathBrowser({
  currentPath,
  userGoal,
  onPrevious,
  onNext,
  onSelect,
  isPreviousDisabled,
  isNextDisabled,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Removed redundant inner div structure for simplification */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Target className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-medium text-purple-900">Your Goal: {userGoal}</h2>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Explore Your Career Path
          </h1>
          <p className="mt-2 text-gray-600 text-center text-sm sm:text-base">
            We've curated the best career paths based on your learning preferences.
          </p>
        </div>

        <div className="p-6 sm:p-8">
          <div className="space-y-5 sm:space-y-6">
            <PathCard path={currentPath} />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mt-6">
              <button
                onClick={onPrevious}
                disabled={isPreviousDisabled}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={onSelect}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ThumbsUp className="h-5 w-5" />
                <span>Choose This Path</span>
              </button>

              <button
                onClick={onNext}
                disabled={isNextDisabled}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}