import { Flex, Box, Text, HStack } from "@chakra-ui/react";
import BarChartForTaskStatus from "./Chart/BarChartForTaskStatus";
import { TaskStaticsResponse } from "../types/project_progress/project_progress_type";
import { useQuery } from "@tanstack/react-query";
import { getDataForTaskStaticsForIsCompleted } from "../apis/project_progress_api";
import PieChartForUncompletedTaskCount from "./Chart/PieChartForUncompletedTaskCount";
import BarChartForDailyTaskCount from "./Chart/BarChartForDailyTaskCount";

function TaskStaticsPage() {
  const {
    data: dataForTaskStaticsForIsCompleted,
    isLoading: isLoadingForDataForTaskStaticsForIsCompleted,
    isError: isErrorForDataForTaskStaticsForIsCompleted,
    refetch: refetchForDataForTaskStaticsForIsCompleted,
  } = useQuery<TaskStaticsResponse>(
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
    dataForTaskStaticsForIsCompleted.managers.map((row) => {
      return {
        name: row.task_manager,
        value: row.total_count_for_uncompleted_task,
      };
    });

  const data_for_completed_tasks_for_pie_chart =
    dataForTaskStaticsForIsCompleted.managers.map((row) => {
      return {
        name: row.task_manager,
        value: row.total_count_for_completed_task,
      };
    });

  return (
    <Box display="flex" flexDirection={"column"}>
      <Box fontSize={"32px"} mx={"auto"}>
        {" "}
        일별 업무 통계
      </Box>
      <BarChartForDailyTaskCount
        data={dataForTaskStaticsForIsCompleted.task_count_for_month}
      />
      <br />
      <br />
      <br />
      <Box fontSize={"32px"} mx={"auto"}>
        {" "}
        멤버별 업무 통계
      </Box>
      <Box border="1px solid black">
        <BarChartForTaskStatus
          data={dataForTaskStaticsForIsCompleted.managers}
        />
      </Box>
      <br />
      <br />
      <br />
      <Text fontSize={"32px"} mx={"auto"} mt={3}>
        업무 비중 통계
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
        <Box width="50%">업무 비중 (비완료, 완료 모두 포함)</Box>
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
    </Box>
  );
}

export default TaskStaticsPage;
