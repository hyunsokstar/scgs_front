import { Box } from "@chakra-ui/react";
import React from "react";
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

const BarChartForDailyTaskCountForPersonalUser = ({ data }: any) => {
  return (
    <Box width="100%" height="300px">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="myCompletedCount" stackId="a" fill="#800080" />
          <Bar dataKey="totalCompletedCount" stackId="a" fill="#E6E6FA" />

          {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartForDailyTaskCountForPersonalUser;
