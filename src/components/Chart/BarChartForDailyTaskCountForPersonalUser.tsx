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
  ComposedChart,
  Line,
} from "recharts";

const BarChartForDailyTaskCountForPersonalUser = ({ data }: any) => {
  return (
    <Box width="100%" height="300px">
      <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* <Area
            type="monotone"
            dataKey="amt"
            fill="#8884d8"
            stroke="#8884d8"
          /> */}
          {/* <Bar dataKey="myCompletedCount" stackId="a" fill="#800080" />
          <Bar dataKey="totalCompletedCount" stackId="a" fill="#E6E6FA" /> */}

          <Bar dataKey="myCompletedCount" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="totalCompletedCount" stroke="#ff7300" />
          {/* <Scatter dataKey="cnt" fill="red" /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartForDailyTaskCountForPersonalUser;
