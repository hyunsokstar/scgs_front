import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import BarChartForTaskStatus from "./Chart/BarChartForTaskStatus";
import { ITypeForTaskStaticsDataForPerson } from "../types/project_progress/project_progress_type";
import { useQuery } from "@tanstack/react-query";
import { getDataForTaskStaticsForIsCompleted } from "../apis/project_progress_api";
import PieChartForUncompletedTaskCount from "./Chart/PieChartForUncompletedTaskCount";

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

  const data_for_uncompleted_tasks_for_pie_chart =
    dataForTaskStaticsForIsCompleted.map((row) => {
      return {
        name: row.task_manager,
        value: row.total_count_for_uncompleted_task,
      };
    });

  const data_for_completed_tasks_for_pie_chart =
    dataForTaskStaticsForIsCompleted.map((row) => {
      return {
        name: row.task_manager,
        value: row.total_count_for_completed_task,
      };
    });

  return (
    <Flex flexDirection={"column"}>
      <Text fontSize={"32px"} mx={"auto"}>
        {" "}
        멤버별 Task Status{" "}
      </Text>
      <Box border="1px solid black">
        <BarChartForTaskStatus data={dataForTaskStaticsForIsCompleted} />
      </Box>
      <Text fontSize={"32px"} mx={"auto"} mt={3}>
        전체 통계{" "}
      </Text>
      <Box
        display={"flex"}
        border="1px solid black"
        borderBottom={0}
        textAlign={"center"}
        py={2}
      >
        <Box width="50%" borderRight="1px solid black">
          업무 비중 (비완료)
        </Box>
        <Box width="50%">업무 비중 (전체)</Box>
      </Box>
      <Box display={"flex"} border="1px solid black">
        <Box width="50%" borderRight="1px solid black">
          <PieChartForUncompletedTaskCount
            data={data_for_uncompleted_tasks_for_pie_chart}
          />{" "}
        </Box>
        <Box width="50%">
          <PieChartForUncompletedTaskCount
            data={data_for_completed_tasks_for_pie_chart}
          />{" "}
        </Box>
      </Box>
    </Flex>
  );
}

export default TaskStaticsPage;
