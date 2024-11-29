import React, { useState, useMemo } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Clock, Filter, BarChart as BarChartIcon } from "lucide-react";
import ContestTypeDistrubution from "@/components/custom/stats/ContestTypeDistrubution";
import TimeComplexityAnalysis from "@/components/custom/stats/TimeComplexityAnalysis";
import GroupedDurationAnalysis from "@/components/custom/stats/GroupedDurationAnalysis";
import { Contest } from "@/hooks/useContests";
import { categorizeDuration } from "@/lib/utils";

const StatsPage: React.FC = () => {
  const contests: Contest[] = JSON.parse(
    localStorage.getItem("cachedContests") || "[]"
  );

  // State for filtering
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  // Memoized filtered data
  const filteredContests = useMemo(() => {
    return contests.filter(
      (contest) =>
        (!selectedType || contest.type === selectedType) &&
        (!selectedPhase || contest.phase === selectedPhase)
    );
  }, [contests, selectedType, selectedPhase]);

  // Grouped Duration Analysis
  const durationGroupAnalysis = useMemo(() => {
    const groups = filteredContests.reduce(
      (acc, contest) => {
        const durationCategory = categorizeDuration(contest.durationSeconds);
        const typeCategory = contest.type;
        const phaseCategory = contest.phase;

        // Create nested grouping
        if (!acc[durationCategory]) {
          acc[durationCategory] = {
            total: 0,
            byType: {},
            byPhase: {},
          };
        }

        acc[durationCategory].total++;

        // Group by type
        acc[durationCategory].byType[typeCategory] =
          (acc[durationCategory].byType[typeCategory] || 0) + 1;

        // Group by phase
        acc[durationCategory].byPhase[phaseCategory] =
          (acc[durationCategory].byPhase[phaseCategory] || 0) + 1;

        return acc;
      },
      {} as Record<
        string,
        {
          total: number;
          byType: Record<string, number>;
          byPhase: Record<string, number>;
        }
      >
    );

    // Transform for chart
    return Object.entries(groups).map(([category, data]) => ({
      category,
      total: data.total,
      ...Object.fromEntries(
        Object.entries(data.byType).map(([type, count]) => [
          `${type}Type`,
          count,
        ])
      ),
      ...Object.fromEntries(
        Object.entries(data.byPhase).map(([phase, count]) => [
          `${phase}Phase`,
          count,
        ])
      ),
    }));
  }, [filteredContests]);

  // Time Complexity Analysis
  const timeComplexityAnalysis = useMemo(() => {
    // Analyze contest frequencies and durations
    const complexityMap = filteredContests.reduce((acc, contest) => {
      const durationCategory = categorizeDuration(contest.durationSeconds);

      if (!acc[durationCategory]) {
        acc[durationCategory] = {
          totalContests: 0,
          totalDuration: 0,
        };
      }

      acc[durationCategory].totalContests++;
      acc[durationCategory].totalDuration += contest.durationSeconds;

      return acc;
    }, {} as Record<string, { totalContests: number; totalDuration: number }>);

    return Object.entries(complexityMap).map(([category, data]) => ({
      category,
      avgDuration: data.totalDuration / data.totalContests / 3600,
      totalContests: data.totalContests,
    }));
  }, [filteredContests]);

  const contestTypeDistribution = useMemo(() => {
    return filteredContests.reduce((acc, contest) => {
      acc[contest.type] = (acc[contest.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [filteredContests]);

  return (
    <div className=" px-[2.5rem] ">
      <div>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <BarChartIcon className="w-6 h-6" /> Contest Statistics
          </CardTitle>
          <div className="flex space-x-4">
            <Select
              value={selectedType || "all"}
              onValueChange={(value) =>
                setSelectedType(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Contest Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ICPC">ICPC</SelectItem>
                <SelectItem value="CF">Codeforces</SelectItem>
                <SelectItem value="all">All Types</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedPhase || "all"}
              onValueChange={(value) =>
                setSelectedPhase(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Contest Phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEFORE">Before</SelectItem>
                <SelectItem value="CODING">Coding</SelectItem>
                <SelectItem value="FINISHED">Finished</SelectItem>
                <SelectItem value="all">All Phases</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-[3rem] ">
          {/* Grouped Duration Analysis */}
          <div className=" flex w-full gap-[1rem] ">
            <div className=" w-[70%] ">
              <GroupedDurationAnalysis
                durationGroupAnalysis={durationGroupAnalysis}
              />
            </div>

            <div className=" w-[30%] ">
              <ContestTypeDistrubution
                contestTypeDistribution={contestTypeDistribution}
              />
            </div>
          </div>

          {/* Time Complexity Analysis */}
          <TimeComplexityAnalysis
            timeComplexityAnalysis={timeComplexityAnalysis}
          />
        </CardContent>
      </div>
    </div>
  );
};

export default StatsPage;
