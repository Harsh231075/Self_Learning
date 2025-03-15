import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../hooks/useUser'; // Import the hook

const StudyPlan = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Use the context

  const handleViewDetails = (id) => {
    navigate(`/study-plan/${id}`);
  };

  return (
    <div className="p-6 lg:p-12 bg-gray-50 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-900">📚 Study Plans</h2>
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
              className="bg-white shadow-xl rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
              onClick={() => handleViewDetails(plan._id)}
            >
              <h3 className="text-2xl font-semibold text-gray-900">{parsedData.study_topic}</h3>
              <p className="text-gray-500 mt-3">
                <strong>Difficulty:</strong> <span className="text-gray-800 font-medium">{parsedData.difficulty}</span>
              </p>
              <p className="text-gray-500 mt-1">
                <strong>Total Weeks:</strong> <span className="text-gray-800 font-medium">{parsedData.total_weeks}</span>
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(plan._id);
                }}
                className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                View Details
              </button>
            </div>
          );
        })}

        {!user?.study_plans?.length && (
          <div className="col-span-full text-center text-gray-600">
            No study plans available yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlan;