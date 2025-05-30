import React from "react";
import { useNavigate } from "react-router-dom";
import { Target, ArrowLeft, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function ErrorDisplay() {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleStartOver = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl max-w-md w-full"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h3>
        <p className="text-gray-600 mb-6">We couldn't find any career paths. Let's try again!</p>
        <div className="space-x-4">
          <button
            onClick={handleRefresh}
            className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-all duration-300 inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleStartOver}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </motion.div>
    </div>
  );
}