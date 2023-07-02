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
  const [userOptionForList, setUserOptionForList] = useState("");

  const {
    isLoading: loadingForTaskLog,
    data: dataForTaskLogs,
    refetch: refetchForTaskLogs,
  } = useQuery<ResponseDataForTaskLog>(
    ["apiForGetTaskLogList", userOptionForList],
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
    <Box height={"1000px"} overflowY={"scroll"}>
      {/* hi */}
      <HeaderForTaskStatusForToday
        data={dataForTaskLogs}
        userOptionForList={userOptionForList}
        setUserOptionForList={setUserOptionForList}
      />
      <br />
      <TaskLogList
        dataForTaskLogs={dataForTaskLogs.TaskLog}
        userOptionForList={userOptionForList}
      />
    </Box>
  );
};

export default TaskLogPage;
