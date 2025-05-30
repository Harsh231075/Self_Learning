import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home/Home";
import About from "./pages/About";
import Leaderboard from "./pages/Leaderboard";
import SignupLogin from "./pages/SignupLogin";
import Dashboard from "./Dashboard/Dashboard";
import StudyPlan from "./Ai/StudyMaterial";
import ProfilePage from './Dashboard/ProfilePage';
import Sidebar from "./Dashboard/Sidebar";
import StudyMaterial from "./Ai/StudyMaterial";
import CompletionScreen from "./Career/CompletionScreen";
import SelectedCourse from "./AIGuidance/SelectedCoure";
import QuizComponent from "./test/Quiz";
import StudyPlansList from "./test/StudyPlansList";
import QuizSubmit from "./test/QuizSubmit";
import Certificate from "./test/Certificate";
import { UserProvider } from './context/UserContext';
import Feedback from "./Dashboard/Feedback";



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
              <Route path='/quiz-submit' element={<QuizSubmit />} />
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
