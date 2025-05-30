import React from "react";
import { Briefcase, BookOpen } from "lucide-react";

export default function PathCard({ path }) {
  if (!path) return null;

  return (
    <>
      <div className="bg-purple-50 rounded-lg p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <Briefcase className="h-5 w-5 text-purple-600" />
          <h2 className="text-lg font-semibold text-purple-900">{path.title}</h2>
        </div>
        <p className="text-gray-700 text-sm sm:text-base">{path.summary}</p>
      </div>
      <div className="bg-white rounded-lg p-4 border border-purple-100">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-5 w-5 text-purple-600" />
          <h3 className="font-medium text-purple-900">Why This Could Be Perfect for You</h3>
        </div>
        <p className="text-gray-600">{path.why_suitable}</p>
      </div>
    </>
  );
}