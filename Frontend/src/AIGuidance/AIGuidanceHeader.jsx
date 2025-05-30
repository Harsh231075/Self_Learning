import React from "react";
import { Brain, ArrowLeft } from "lucide-react";

export default function AIGuidanceHeader({ step, handleBack }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-purple-600" />
        <h2 className="text-2xl font-semibold text-gray-800">AI Learning Assistant</h2>
      </div>
      {step > 0 && (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      )}
    </div>
  );
}
