import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard";
import SignupLogin from "./pages/SignupLogin";
import Dashboard from "./dashboard/Dashboard";
import StudyPlan from "./dashboard/Ai/StudyMaterial";
// import Settings from "./dashboard/Setting";
import ProfilePage from './dashboard/ProfilePage';
import Sidebar from "./dashboard/Sidebar";
import StudyMaterial from "./dashboard/Ai/StudyMaterial";
import CompletionScreen from "./dashboard/AIGuidance/CompletionScreen";
import SelectedCourse from "./dashboard/AIGuidance/SelectedCoure";
import QuizComponent from "./Test/QuizComponent";
import StudyPlansList from "./Test/StudyPlansList";
import QuizSubmitComponent from "./Test/QuizSubmitComponent";
import Certificate from "./Test/Certificate";
import { UserProvider } from './context/UserContext';
import Feedback from "./dashboard/Feedback";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    // Check token on mount and storage changes
    const checkToken = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    };

    window.addEventListener("storage", checkToken);
    // Add custom event listener for token updates
    window.addEventListener("tokenUpdated", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
      window.removeEventListener("tokenUpdated", checkToken);
    };
  }, []);
  console.log(token);

  const RedirectWithReferral = ({ to }) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const refCode = params.get('ref');
    return <Navigate to={refCode ? `${to}?ref=${refCode}` : to} />;
  };

  return (
    <>
      <UserProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/sign-login"
            element={token ? <RedirectWithReferral to="/dashboard" /> : <SignupLogin />}
          />

          {/* Protected Routes */}
          {token ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/study-plan" element={<StudyPlan />} />
              <Route path="/settings" element={<ProfilePage />} />
              <Route path="/my-dashbaord" element={<Sidebar />} />
              <Route path="/study-plan/:id" element={<StudyMaterial />} />
              <Route path="/completion" element={<CompletionScreen />} />
              <Route path="/selected-course" element={<SelectedCourse />} />
              <Route path='/quize' element={<QuizComponent />} />
              <Route path="/test" element={<StudyPlansList />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path='/quiz-submit' element={<QuizSubmitComponent />} />
              <Route path="/certificate" element={<Certificate />} />
            </>
          ) : (
            <>
              {/* Redirect Unauthorized Users */}
              <Route path="/dashboard" element={<Navigate to="/" />} />
              <Route path="/study-plan" element={<Navigate to="/" />} />
              <Route path="/settings" element={<Navigate to="/" />} />
              <Route path="/my-dashbaord" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
