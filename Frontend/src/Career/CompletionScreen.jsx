import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import the new components
import LoadingIndicator from "./LoadingIndicator"; // Adjust path as needed
import ErrorDisplay from "./ErrorDisplay";         // Adjust path as needed
import SelectedPathView from "./SelectedPathView"; // Adjust path as needed
import CareerPathBrowser from "./CareerPathBrowser"; // Adjust path as needed

export default function CompletionScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  // 'aiResponse' from location.state is the raw string needing parsing
  const rawAiResponseString = location.state?.aiResponse || null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPathName, setSelectedPathName] = useState(null); // Store name/title of the selected path
  const [paths, setPaths] = useState([]);
  const [userGoal, setUserGoal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rawAiResponseString) {
      console.log("No AI response data found in location state.");
      setLoading(false);
      return;
    }

    try {
      // Clean and parse the JSON string from AI response
      const cleanedText = rawAiResponseString.replace(/```json|```|\n/g, "").trim();
      const parsedData = JSON.parse(cleanedText);

      if (parsedData.recommended_paths && parsedData.recommended_paths.length > 0) {
        setPaths(parsedData.recommended_paths);
        setUserGoal(parsedData.user_goal || "your career development"); // Set user goal
      } else {
        console.error("Invalid AI response structure: No recommended_paths found or they are empty.");
        setPaths([]); // Ensure paths is empty on error to trigger error display
      }
    } catch (error) {
      console.error("Error parsing AI response:", error, "Raw response:", rawAiResponseString);
      setPaths([]); // Ensure paths is empty on parsing error
    } finally {
      setLoading(false);
    }
  }, [rawAiResponseString]);

  if (loading) {
    return <LoadingIndicator />;
  }

  // After loading, if paths array is empty, show error.
  // This covers cases where aiResponseData was null or parsing failed or recommended_paths was empty.
  if (!paths.length) {
    return <ErrorDisplay />;
  }

  const currentPath = paths[currentIndex]; // Will be valid if paths.length > 0

  const handleNext = () => {
    if (currentIndex < paths.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSelect = () => {
    // currentPath should be valid here because paths.length > 0
    if (currentPath) {
      setSelectedPathName(currentPath.title);
    }
  };

  const handleConfirm = () => {
    // Navigate to the next screen with the selected path information
    navigate("/selected-course", { // Or your relevant next route
      state: {
        selectedPathName // The title of the selected path
        //   The full object for the selected path
      },
    });
  };

  const handleBackToChoices = () => {
    setSelectedPathName(null); // Clear the selected path to go back to browser view
  };

  if (selectedPathName) {
    const selectedPathData = paths.find((path) => path.title === selectedPathName);
    return (
      <SelectedPathView
        selectedPathData={selectedPathData}
        onBackToChoices={handleBackToChoices}
        onConfirm={handleConfirm}
      />
    );
  }

  // This check is important, currentPath might be undefined if paths array is empty,
  // but we already handle empty paths array with ErrorDisplay.
  // So if we reach here, paths array and currentPath should be valid.
  if (!currentPath) {
    // This case should ideally not be reached if paths.length > 0 and currentIndex is within bounds.
    // However, as a fallback, show error display.
    console.error("currentPath is undefined, but paths array is not empty. This should not happen.");
    return <ErrorDisplay />;
  }

  return (
    <CareerPathBrowser
      currentPath={currentPath}
      userGoal={userGoal}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onSelect={handleSelect}
      isPreviousDisabled={currentIndex === 0}
      isNextDisabled={currentIndex === paths.length - 1}
    />
  );
}