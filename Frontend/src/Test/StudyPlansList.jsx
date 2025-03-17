import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, XCircle, PlayCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">📚 Your Study Plans</h2>
          <Link to="/my-dashbaord">
            <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* If No Study Plans */}
          {studyPlans.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-blue-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Study Plans Yet</h3>
              <p className="text-gray-600 mb-6">Start your learning journey by creating a personalized study plan.</p>
              <Link to="/my-dashbaord">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 mx-auto">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Dashboard</span>
                </button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-700 border-b">
                    <th className="p-4 text-left">Study Plan</th>
                    <th className="p-4 text-left">Difficulty</th>
                    <th className="p-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studyPlans.map((plan, index) => {
                    const cleanedText = plan.data.replace(/```json|```/g, "").trim();
                    const parsedData = JSON.parse(cleanedText);

                    return (
                      <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4">
                          <div className="font-medium text-gray-800">{parsedData.study_topic}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${parsedData.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            parsedData.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                            {parsedData.difficulty}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleStartTest(parsedData)}
                            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 mx-auto"
                          >
                            <PlayCircle className="w-5 h-5" />
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

        {/* Modal - Same as before */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
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
    </div>
  );
}
