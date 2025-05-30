import React from "react";
import { Brain, Target } from "lucide-react";

export function UserType({ onComplete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto w-full">
      {/* Header */}
      <h2 className="text-xl font-semibold mb-4">Let's Get Started! 🚀</h2>
      <p className="text-gray-600 mb-6 text-center">Choose how you'd like to begin your learning journey</p>

      {/* Option Buttons */}
      <div className="grid gap-4">
        {/* Option 1: Clear Path */}
        <button
          onClick={() => onComplete("clear")}
          className="p-5 border-2 border-blue-200 rounded-lg hover:border-blue-500 transition group flex flex-col items-center text-center"
        >
          <div className="bg-blue-200 rounded-full p-4 mb-3 group-hover:bg-blue-500 transition">
            <Target className="h-8 w-8 text-blue-600 group-hover:text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-1">I Know What to Learn</h3>
          <p className="text-gray-600 text-sm">I have a specific topic or skill in mind that I want to master.</p>
        </button>

        {/* Option 2: AI Guidance */}
        <button
          onClick={() => onComplete("confused")}
          className="p-5 border-2 border-purple-200 rounded-lg hover:border-purple-500 transition group flex flex-col items-center text-center"
        >
          <div className="bg-purple-200 rounded-full p-4 mb-3 group-hover:bg-purple-500 transition">
            <Brain className="h-8 w-8 text-purple-600 group-hover:text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Help Me Choose</h3>
          <p className="text-gray-600 text-sm">I'd like AI guidance to find the best learning path for me.</p>
        </button>
      </div>
    </div>
  );
}
