import React from "react";

interface PhaseLabelProps {
  phase: "BEFORE" | "CODING" | "FINISHED"; // The possible values for the phase
}

const PhaseLabel: React.FC<PhaseLabelProps> = ({ phase }) => {
  // Define the label and styles for each phase
  const phaseConfig = {
    BEFORE: { label: "Upcoming", color: "text-blue-400 bg-blue-50" },
    CODING: { label: "Ongoing", color: "text-green-500 bg-green-50" },
    FINISHED: { label: "Completed", color: "text-gray-400 bg-gray-100" },
  };

  const { label, color } = phaseConfig[phase] || {
    label: "Unknown",
    color: "text-red-500 bg-red-100",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[.8rem] ${color}`}>
      {label}
    </span>
  );
};

export default PhaseLabel;
