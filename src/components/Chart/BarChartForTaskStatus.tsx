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

interface Data {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

interface Props {
  data: Data[];
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" stackId="a" fill="#8884d8" />
          <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          <Bar dataKey="amt" stackId="a" fill="#FF0000" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BarChartForTaskStatus;
