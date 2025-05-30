import React from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function SelectedPathView({ selectedPathData, onBackToChoices, onConfirm }) {
  if (!selectedPathData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8" // Outer motion div
      >
        {/* Removed redundant inner div structure for simplification */}
        <div className="text-center space-y-4">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Great Choice!</h2>
          <p className="text-lg text-gray-600">
            You selected:{" "}
            <span className="font-semibold text-purple-600">{selectedPathData.title}</span>
          </p>
          <div className="space-y-6">
            <div className="bg-purple-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">Career Overview</h3>
              <p className="text-gray-700 text-sm sm:text-base">{selectedPathData.summary}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Why This Path Suits You</h3>
              <p className="text-gray-700 text-sm sm:text-base">{selectedPathData.why_suitable}</p>
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={onBackToChoices}
                className="px-5 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base flex items-center gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
              <button
                onClick={onConfirm}
                className="px-5 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm sm:text-base flex items-center gap-2"
              >
                Confirm
                <CheckCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}