import React, { useState } from "react";
import axios from "axios";

export function UserForm() {
  const [formData, setFormData] = useState({
    studyTopic: "",
    experience: "",
    timeCommitment: "",
    learningStyle: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const role = "study_plan";
    const prompt = `User wants to learn **${formData.studyTopic}**.
      Experience Level: **${formData.experience}**.
      Time Commitment: **${formData.timeCommitment}**.
      Preferred Learning Style: **${formData.learningStyle}**.`;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/ai/request`,
        { prompt, role },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      console.log(response);
      setMessage("🎉 Your study plan is ready! Visit the StudyPlan section and start your learning journey! 🚀");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching study plan:", error);
      setMessage("❌ Sorry! We couldn't generate your study plan. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto w-full">
      <h2 className="text-xl font-semibold mb-4">Create Your Study Plan</h2>
      {!message ? (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input type="text" name="studyTopic" placeholder="What do you want to learn?" onChange={handleChange} required className="border p-2 rounded" />
          <select name="experience" onChange={handleChange} required className="border p-2 rounded">
            <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <select name="timeCommitment" onChange={handleChange} required className="border p-2 rounded">
            <option value="">Select Time Commitment</option>
            <option value="1-2 hours/week">1-2 hours/week</option>
            <option value="3-5 hours/week">3-5 hours/week</option>
            <option value="5-10 hours/week">5-10 hours/week</option>
          </select>
          <select name="learningStyle" onChange={handleChange} required className="border p-2 rounded">
            <option value="">Select Learning Style</option>
            <option value="Hands-on Projects">Hands-on Projects</option>
            <option value="Videos">Videos</option>
            <option value="Books & Articles">Books & Articles</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg">
            {loading ? "Generating Plan..." : "Get Study Plan"}
          </button>
        </form>
      ) : (
        <div className="text-center text-lg font-semibold text-green-600 mt-4">{message}</div>
      )}
    </div>
  );
}
