import React from "react";
import { motion } from "framer-motion";

export default function LoadingIndicator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl"
      >
        <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
        <p className="text-purple-900 mt-4 text-lg font-medium">
          Analyzing your responses...
        </p>
        <p className="text-purple-600/80 mt-2">Creating your personalized career path</p>
      </motion.div>
    </div>
  );
}