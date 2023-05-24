// ui
import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

// data
import { useQuery } from "@tanstack/react-query";
import { apiForGetTaskLogList } from "../../apis/project_progress_api";
import {
  ResponseDataForTaskLog,
  TypeForTaskLog,
} from "../../types/project_progress/project_progress_type";
import TaskLogList from "../../components/List/TaskLogList";
import HeaderForTaskStatusForToday from "../../components/Header/HeaderForTaskStatusForToday";

interface Props {}

const TaskLogPage = (props: Props) => {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    isLoading: loadingForTaskLog,
    data: dataForTaskLogs,
    refetch: refetchForTaskLogs,
  } = useQuery<ResponseDataForTaskLog>(
    ["apiForGetTaskLogList", currentPageNum],
    apiForGetTaskLogList,
    {
      enabled: true,
    }
  );

  console.log("dataForTaskLogs : ", dataForTaskLogs);

  if (!dataForTaskLogs) {
    return <Box>no data</Box>;
  }

  return (
    <Box>
      <HeaderForTaskStatusForToday data={dataForTaskLogs} />

      <TaskLogList dataForTaskLogs={dataForTaskLogs.TaskLog} />
    </Box>
  );
};

export default TaskLogPage;
