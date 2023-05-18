import React from "react";
import { FC } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@chakra-ui/react";
import { ManagerData } from "../../types/project_progress/project_progress_type";

interface Props {
  data: ManagerData[];
}

const BarChartForTaskStatus = ({ data }: Props) => {
  return (
    <Box>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="task_manager" />
          <YAxis />
          <Tooltip active={true} isAnimationActive={true}/>
          <Legend />
          {/* <Bar dataKey="task_manager" stackId="a" fill="#8884d8" /> */}
          <Bar dataKey="completed_count_for_task" stackId="a" fill="#00db2f" />
          <Bar
            dataKey="uncompleted_count_for_task"
            stackId="a"
            fill="#FFC5D9"
          />
          <Bar dataKey="count_for_testing_task" stackId="a" fill="#FFB347" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartForTaskStatus;
