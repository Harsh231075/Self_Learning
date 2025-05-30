import React from "react";

export default function StatCard({ title, value, bgColor }) {
  return (
    <div className={`overflow-hidden p-6 rounded-lg shadow-sm ${bgColor}`}>
      <div className="text-center">
        <p className="text-4xl font-bold">{value}</p>
        <p className="mt-1 text-gray-500">{title}</p>
      </div>
    </div>
  );
}