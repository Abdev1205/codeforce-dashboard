import React from "react";
import { FaGlobe } from "react-icons/fa";

interface ContestTypeLabelProps {
  type: string; // Contest type, e.g., "ICPC", "CF", etc.
}

const ContestTypeLabel: React.FC<ContestTypeLabelProps> = ({ type }) => {
  const typeInfo: Record<
    string,
    { label: string; icon: JSX.Element; color: string }
  > = {
    ICPC: {
      label: "ICPC",
      icon: <FaGlobe className="text-gray-500" />,
      color: "text-gray-500",
    },
    CF: {
      label: "CF",
      icon: <FaGlobe className="text-gray-500" />,
      color: "text-gray-500",
    },
    default: {
      label: "Contest",
      icon: <FaGlobe className="text-gray-500" />,
      color: "text-gray-500",
    },
  };

  const { label, icon, color } = typeInfo[type] || typeInfo.default;

  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className={`text-sm font-medium ${color}`}>{label}</span>
    </div>
  );
};

export default ContestTypeLabel;
