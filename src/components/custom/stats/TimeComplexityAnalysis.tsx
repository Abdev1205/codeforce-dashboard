import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChartIcon } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TimeComplexityAnalysisProps {
  timeComplexityAnalysis: Array<{
    category: string;
    totalContests: number;
    avgDuration: number;
  }>;
}

const TimeComplexityAnalysis = ({
  timeComplexityAnalysis,
}: TimeComplexityAnalysisProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChartIcon className="w-5 h-5 mr-2" />
          Time Complexity Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={timeComplexityAnalysis}>
            <XAxis dataKey="category" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar
              yAxisId="left"
              dataKey="totalContests"
              fill="#8884d8"
              name="Number of Contests"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="avgDuration"
              stroke="#ff7300"
              name="Avg Duration (Hours)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TimeComplexityAnalysis;
