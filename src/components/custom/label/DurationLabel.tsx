import React from "react";
import { LuClock } from "react-icons/lu";

interface DurationLabelProps {
  durationSeconds: number; // Contest duration in seconds
}

const DurationLabel: React.FC<DurationLabelProps> = ({ durationSeconds }) => {
  // Convert seconds into hours and minutes
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = Math.floor((durationSeconds % 3600) / 60);

  return (
    <div className="flex items-center gap-2">
      <LuClock className="text-gray-800" aria-hidden="true" />
      <span className="text-sm font-[400] text-gray-800">
        {hours > 0 ? `${hours} hr${hours > 1 ? "s" : ""} ` : ""}
        {minutes > 0 ? `${minutes} min${minutes > 1 ? "s" : ""}` : "0 min"}
      </span>
    </div>
  );
};

export default DurationLabel;
