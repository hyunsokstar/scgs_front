import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Box, Button, HStack } from "@chakra-ui/react";
import { PieDataForUncompletedTask } from "../../types/project_progress/project_progress_type";
import { FaUser } from "react-icons/fa";

const COLORS = [
  "#B5EAD7",
  "#FFC5D9",
  "#D4F1F4",
  "#FFDAB9",
  "#C7CEEA",
  "#E8D8B6",
  "#D9C2A9",
  "#F8B195",
  "#F67280",
  "#C06C84",
  "#6C5B7B",
  "#355C7D",
  "#EDBB99",
  "#9BAAAF",
  "#EFECCA",
  "#AAB9B9",
  "#F6D8AE",
  "#F7EFC6",
  "#E2D8B2",
  "#BFD7EA",
];
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

interface IProps {
  data: PieDataForUncompletedTask[];
}

// const dummy_task_manageers = [
//     "terecal1",
//     "terecal2",
//     "terecal3",
//     "terecal4",
//     "terecal5",
// ]

const PieChartForUncompletedTaskCount = ({ data }: IProps) => {
  const dummy_task_manageers = data.map((row) => {
    return row.name;
  });

  return (
    <Box width="100%" height={300}>
      <HStack spacing={3} ml={2}>
        {dummy_task_manageers
          ? dummy_task_manageers.map((manager, index) => {
              return (
                <Box>
                  <Button
                    size="xs"
                    leftIcon={<FaUser />}
                    variant="outline"
                    bgColor={COLORS[index]}
                    _hover={{
                      bg: "transparent",
                      borderColor: "teal.500",
                      color: "teal.500",
                    }}
                  >
                    {manager}
                  </Button>
                </Box>
              );
            })
          : ""}
      </HStack>

      <ResponsiveContainer>
        <Box border={"1px solid green"}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </Box>
      </ResponsiveContainer>
    </Box>
  );
};

export default PieChartForUncompletedTaskCount;
