import { FC } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Box } from "@chakra-ui/react";
import { PieDataForUncompletedTask } from "../../types/project_progress/project_progress_type";
import PieChartForUncompletedTaskCount from "../../components/Chart/PieChartForUncompletedTaskCount";

const data: PieDataForUncompletedTask[] = [
  { name: "Group A", value: 500 },
  { name: "Group B", value: 500 },
  { name: "Group C", value: 500 },
  { name: "Group D", value: 500 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartExample: FC = () => {
  return (
    <Box width="100%" height={300}>
      <PieChartForUncompletedTaskCount data={data} />
    </Box>
  );
};

export default PieChartExample;
