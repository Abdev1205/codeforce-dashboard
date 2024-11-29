import { Contest } from "@/hooks/useContests";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const generateGoogleCalendarLink = (contest: Contest,contestLink:string) => {
  const startDate = new Date(contest.startTimeSeconds * 1000)
    .toISOString()
    .replace(/-|:|\.\d+/g, "");
  const endDate = new Date(
    contest.startTimeSeconds * 1000 + contest.durationSeconds * 1000
  )
    .toISOString()
    .replace(/-|:|\.\d+/g, "");
  const details = encodeURIComponent("Join the contest on Codeforces!");
  const location = encodeURIComponent(contestLink);

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    contest.name
  )}&dates=${startDate}/${endDate}&details=${details}&location=${location}&sf=true&output=xml`;
};

export const categorizeDuration = (durationSeconds: number) => {
  const durationHours = durationSeconds / 3600;
  if (durationHours < 1) return "< 1 hour";
  if (durationHours < 2) return "1-2 hours";
  if (durationHours < 3) return "2-3 hours";
  if (durationHours < 4) return "3-4 hours";
  return "4+ hours";
};
