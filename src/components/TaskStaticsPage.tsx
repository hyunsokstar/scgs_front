import { FC } from "react";
import { Flex, Box } from "@chakra-ui/react";
import BarChartForTaskStatus from "./Chart/BarChartForTaskStatus";
import { ITypeForTaskStaticsDataForPerson } from "../types/project_progress/project_progress_type";

const data: ITypeForTaskStaticsDataForPerson
 = [
  {
    task_manager: "terecal",
    uncompleted_count_for_task: 1,
    completed_count_for_task: 0,
  },
  {
    task_manager: "hyun",
    uncompleted_count_for_task: 3,
    completed_count_for_task: 4,
  }
];

function TaskStaticsPage() {
  return (
    <Flex flexDirection={"column"}>
      <Box border="1px solid black">
        <BarChartForTaskStatus data={data} />
      </Box>
      <Box border="1px solid black">
        2의 영역
      </Box>
    </Flex>
  );
}

export default TaskStaticsPage;
