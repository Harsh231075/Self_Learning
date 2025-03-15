import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { useUser } from '../hooks/useUser';

export default function StudyPlansList() {
  const [studyPlans, setStudyPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const filterAvailablePlans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/studyPlan`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();

          // Filter plans using context data
          const completedCourses = new Set(
            user.cartificate?.map(cert => cert.courseName) || []
          );

          const availablePlans = data.filter(plan => {
            const planData = JSON.parse(plan.data.replace(/```json|```/g, "").trim());
            return !completedCourses.has(planData.study_topic);
          });

          setStudyPlans(availablePlans);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user && user.cartificate) {
      filterAvailablePlans();
    }
  }, [user]);


  const handleStartTest = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (!selectedPlan) return;

    const prompt = `I want a quiz on ${selectedPlan.study_topic} and my level is ${selectedPlan.difficulty}.`;


    // Navigate with state containing necessary test info
    navigate("/quize", {
      state: {
        prompt,
        testInfo: {
          courseName: selectedPlan.study_topic,
          userName: user.name
        }
      }
    });

    setShowModal(false);
    setSelectedPlan(null);
  };

  const handleCancel = () => {

    setShowModal(false);

    setSelectedPlan(null);

  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 Your Study Plans</h2>

        {/* If No Study Plans */}
        {studyPlans.length === 0 ? (
          <p className="text-gray-600">No study plans found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Study Plan</th>
                  <th className="p-3 text-left">Difficulty</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {studyPlans.map((plan, index) => {
                  const cleanedText = plan.data.replace(/```json|```/g, "").trim();
                  const parsedData = JSON.parse(cleanedText);

                  return (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-3">{parsedData.study_topic}</td>
                      <td className="p-3">{parsedData.difficulty}</td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleStartTest(parsedData)}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                          Start Test
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ Modal for Test Guidelines */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            {/* Close Button */}
            <button onClick={handleCancel} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <XCircle className="h-6 w-6" />
            </button>

            {/* Modal Content */}
            <h3 className="text-2xl font-bold text-gray-800 mb-4">📢 Test Guidelines</h3>
            <ul className="text-gray-700 space-y-2">
              <li>✔ The test is 10 mint and should be completed in one sitting.</li>
              <li>✔ Do not refresh or switch tabs otherwise, the test will restart.</li>
              <li>✔ Read each question carefully before selecting your answer.</li>
              <li>✔ Once submitted, you cannot change your answers.</li>
              <li>✔ Be honest and give your best effort!</li>
            </ul>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={handleCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400">
                Back
              </button>
              <button onClick={handleConfirm} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Confirm & Start Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
