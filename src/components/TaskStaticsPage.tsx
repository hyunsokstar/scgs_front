import { FC } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import BarChartForTaskStatus from "./Chart/BarChartForTaskStatus";
import { ITypeForTaskStaticsDataForPerson } from "../types/project_progress/project_progress_type";

import { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { getDataForTaskStaticsForIsCompleted } from "../apis/project_progress_api";

// const data: ITypeForTaskStaticsDataForPerson = [
//   {
//     task_manager: "terecal",
//     uncompleted_count_for_task: 1,
//     completed_count_for_task: 0,
//   },
//   {
//     task_manager: "hyun",
//     uncompleted_count_for_task: 3,
//     completed_count_for_task: 4,
//   },
// ];

function TaskStaticsPage() {
  const {
    data: dataForTaskStaticsForIsCompleted,
    isLoading: isLoadingForDataForTaskStaticsForIsCompleted,
    isError: isErrorForDataForTaskStaticsForIsCompleted,
    refetch: refetchForDataForTaskStaticsForIsCompleted,
  } = useQuery<ITypeForTaskStaticsDataForPerson>(
    ["getDataForTaskStaticsForIsCompleted"],
    () => getDataForTaskStaticsForIsCompleted()
  );
  console.log(
    "dataForTaskStaticsForIsCompleted : ",
    dataForTaskStaticsForIsCompleted
  );

  if (isLoadingForDataForTaskStaticsForIsCompleted) {
    return <Box>Loading..</Box>;
  }
  if (!dataForTaskStaticsForIsCompleted) {
    return <Box>Loading..</Box>;
  }
  // dataForTaskStaticsForIsCompleted

  return (
    <Flex flexDirection={"column"}>
      <Text fontSize={"32px"} mx={"auto"}>
        {" "}
        멤버별 Task Status{" "}
      </Text>
      <Box border="1px solid black">
        <BarChartForTaskStatus data={dataForTaskStaticsForIsCompleted} />
      </Box>
      <Text fontSize={"32px"} mx={"auto"}>
        {" "}
        전체 통계{" "}
      </Text>
      <Box border="1px solid black">전체 통계 그래프1, 전체 통계 그래프2</Box>
    </Flex>
  );
}

export default TaskStaticsPage;
