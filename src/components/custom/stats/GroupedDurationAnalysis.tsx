import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChartIcon } from "lucide-react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GroupedDurationAnalysisProps {}

interface GroupedDurationAnalysisProps {
  durationGroupAnalysis: Array<{
    category: string;
    total: number;
  }>;
}

const GroupedDurationAnalysis: React.FC<GroupedDurationAnalysisProps> = ({
  durationGroupAnalysis,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PieChartIcon className="w-5 h-5 mr-2" />
          Grouped Duration Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={durationGroupAnalysis}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* Total Contests */}
            <Bar dataKey="total" fill="#8884d8" name="Total Contests" />

            {/* Contest Types */}
            <Bar
              dataKey="ICPCType"
              stackId="type"
              fill="#82ca9d"
              name="ICPC Contests"
            />
            <Bar
              dataKey="CFType"
              stackId="type"
              fill="#ffc658"
              name="Codeforces Contests"
            />

            {/* Contest Phases */}
            <Bar
              dataKey="BEFOREPhase"
              stackId="phase"
              fill="#83a6ed"
              name="Before Phase"
            />
            <Bar
              dataKey="CODINGPhase"
              stackId="phase"
              fill="#8dd1e1"
              name="Coding Phase"
            />
            <Bar
              dataKey="FINISHEDPhase"
              stackId="phase"
              fill="#a4de6c"
              name="Finished Phase"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GroupedDurationAnalysis;
