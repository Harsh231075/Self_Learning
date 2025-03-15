import React, { useState } from "react";
import { UserType } from "./UserType";
import { AIGuidance } from "./AIGuidance";
import { UserForm } from "./UserForm";
import StudyPlan from "./StudyPlan";

function Decide() {
  const [userChoice, setUserChoice] = useState(null);
  const [studyPlan, setStudyPlan] = useState(null);

  // 🔹 When User Chooses a Path (Confused OR Clear)
  const handleUserChoice = (choice) => {
    setUserChoice(choice);
    setStudyPlan(null); // Reset study plan when user chooses again
  };

  // 🔹 When Study Plan is Generated (From AI Guidance or UserForm)
  const handleStudyPlanGenerated = (generatedPlan) => {
    setStudyPlan(generatedPlan);
    setUserChoice(null); // Hide UserType options
  };

  return (
    <div className="p-6 lg:p-8">
      {/* If Study Plan Exists, Show It */}
      {studyPlan ? (
        <StudyPlan studyPlan={studyPlan} />
      ) : (
        <>
          {/* If User Hasn't Chosen, Show Options */}
          {userChoice === null && <UserType onComplete={handleUserChoice} />}

          {/* If User is Confused, Show AI Guidance */}
          {userChoice === "confused" && <AIGuidance onComplete={handleStudyPlanGenerated} />}

          {/* If User Knows What to Learn, Show UserForm */}
          {userChoice === "clear" && <UserForm onComplete={handleStudyPlanGenerated} />}
        </>
      )}
    </div>
  );
}

export default Decide;
