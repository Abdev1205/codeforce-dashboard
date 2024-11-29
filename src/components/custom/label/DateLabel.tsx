import React from "react";
import { IoCalendarOutline } from "react-icons/io5";

interface DateLabelProps {
  timestamp: number; // Unix timestamp in seconds
  individual?: boolean;
}

const DateLabel: React.FC<DateLabelProps> = ({
  timestamp,
  individual = false,
}) => {
  const date = new Date(timestamp * 1000);

  const formattedDate = date.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {individual ? (
        <div className="flex items-center gap-2">
          <IoCalendarOutline
            className="text-gray-500 hidden text-[2.6rem] "
            aria-hidden="true"
          />
          <div className="flex flex-col gap-[.4rem] mt-[.9rem] text-sm text-gray-800">
            <span className="text-[1.25rem] font-[600] ">{formattedDate}</span>
            <span className="text-[1.06rem] font-[500] text-gray-600">
              {formattedTime}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <IoCalendarOutline
            className="text-gray-500 text-[1.3rem] "
            aria-hidden="true"
          />
          <div className="flex flex-col text-sm text-gray-800">
            <span className="text-[.75rem] font-[500] ">{formattedDate}</span>
            <span className="text-[.6rem] mt-[-.4rem] text-gray-600">
              {formattedTime}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default DateLabel;
