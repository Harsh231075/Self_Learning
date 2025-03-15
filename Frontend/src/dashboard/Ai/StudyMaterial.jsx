import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Calendar, Book, Target, RefreshCw, Bookmark, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const StudyMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cleanedStudyPlan, setCleanedStudyPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token is missing from localStorage.");
      setLoading(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/user/study-material/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        try {
          const cleanedText = response.data.data.replace(/```json|```/g, "").trim();
          const parsedData = JSON.parse(cleanedText);
          setCleanedStudyPlan(parsedData);
        } catch (err) {
          setError("Error parsing study plan.");
        } finally {
          setLoading(false);
        }
      })
      .catch(() => {
        setError("Error fetching study plan.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-600 font-medium">Loading your study plan...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <p className="text-red-500 font-medium bg-red-50 px-6 py-3 rounded-lg">{error}</p>
    </div>
  );

  // ... keep imports and functionality the same ...

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-4 px-6 flex justify-between items-center fixed w-full top-0 shadow-lg z-10 backdrop-blur-lg bg-opacity-90">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <h1 className="text-xl md:text-2xl font-bold tracking-wide text-white">
          {cleanedStudyPlan.study_topic}
        </h1>
        <div className="w-20"></div>
      </nav>

      {/* Content */}
      <div className="container mx-auto mt-24 p-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/30 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-10 border border-purple-100"
        >
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
              <Target className="w-5 h-5 text-indigo-600" />
              <span className="text-indigo-900 font-medium">Difficulty: {cleanedStudyPlan.difficulty}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-purple-900 font-medium">Duration: {cleanedStudyPlan.total_weeks} weeks</span>
            </div>
          </div>
        </motion.div>

        {cleanedStudyPlan.weekly_plan.map((week, weekIndex) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: weekIndex * 0.1 }}
            key={week.week}
            className="bg-white/80 rounded-2xl shadow-lg mb-6 overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Week {week.week}: {week.title}
              </h3>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-indigo-900 flex items-center gap-2 mb-3">
                  <Bookmark className="w-5 h-5 text-purple-600" />
                  Topics
                </h4>
                <ul className="grid gap-2 ml-6">
                  {week.topics.map((topic, index) => (
                    <li key={index} className="text-gray-800 flex items-center gap-2 before:content-['•'] before:text-purple-500 before:font-bold before:mr-2">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-indigo-900 flex items-center gap-2 mb-3">
                  <Book className="w-5 h-5 text-purple-600" />
                  Resources
                </h4>
                <ul className="grid gap-2 ml-6">
                  {week.resources.map((resource, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-pink-600 flex items-center gap-2 group"
                      >
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        {resource.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-indigo-900 flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-purple-600" />
                  Project
                </h4>
                <p className="text-gray-800 ml-6">{week.project}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 mx-auto mt-8 px-8 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
        >
          <RefreshCw className="w-5 h-5" />
          Restart Plan
        </motion.button>
      </div>
    </div>
  );
};

export default StudyMaterial;