import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import { Loader2 } from "lucide-react";

export default function QuizSubmitComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, testInfo } = location.state || {};
  console.log(testInfo.userName, testInfo.courseName);

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const submitQuiz = async () => {
      if (!answers) {
        setLoading(false);
        return;
      }

      try {
        const prompt = Object.entries(answers)
          .map(([question, answer]) => `${question}:\n\"${answer}\"`)
          .join("\n\n");
        console.log(prompt);
        const role = "performance";
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/ai/request`,
          { prompt, role },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response);
        const cleanedText = response.data.finalresponse.replace(/```json|```/g, "").trim();

        // ✅ Step 2: Parse the cleaned JSON
        const jsonData = JSON.parse(cleanedText);
        // console.log(jsonData);
        setResult(jsonData);
      } catch (error) {
        console.error("Error submitting quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    submitQuiz();
  }, [answers]);

  const viewCertificate = () => {
    const certificateData = {
      userName: testInfo.userName,
      courseName: testInfo.courseName
    };

    console.log('Certificate Data:', certificateData); // Debug log

    navigate("/certificate", {
      state: {
        testInfo: certificateData
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <p className="text-gray-600 ml-3">Submitting your quiz...</p>
      </div>
    );
  }

  const proctect = () => {
    localStorage.removeItem("certificate");
    console.log("Remove Data");
    navigate("/my-dashbaord")
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      {result?.status === "success" && <Confetti numberOfPieces={600} recycle={false} />}
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6 text-center">
        {result?.status === "success" ? (
          <>
            <h2 className="text-3xl font-bold text-green-600">🎉 Congratulations!</h2>
            <p className="mt-2 text-gray-700">{result.message}</p>
            <p className="mt-2 text-gray-500 font-semibold">
              Leaderboard Points: <span className="text-purple-600">{result.leaderboard_points}</span>
            </p>
            {result.certificate_eligible && (
              <button
                onClick={viewCertificate}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                View Certificate
              </button>
            )}
            <button
              onClick={() => navigate("/my-dashbaord")}
              className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg font-semibold"
            >
              View Next Challenge
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-orange-600">📉 Keep Improving!</h2>
            <p className="mt-2 text-gray-700">{result.message}</p>
            <div className="mt-4 space-y-3">
              {result.weak_topics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-gray-700 font-medium">{topic}</p>
                  <div className="w-2/3 bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: "40%" }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">📚 Recommended Resources</h3>
              <ul className="mt-2 text-blue-600 underline">
                {result.recommended_resources.map((resource, index) => (
                  <li key={index} className="mt-1">
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      {resource.topic}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={proctect}
              className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 text-lg font-semibold"
            >
              Continue Learning
            </button>
          </>
        )}
      </div>
    </div>
  );
}
