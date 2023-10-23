import React, { useState } from "react";
import { Box } from "@chakra-ui/react";

// data
import { useQuery } from "@tanstack/react-query";
import { apiForGetTaskLogList } from "../../apis/project_progress_api";
import { ResponseDataForTaskLog } from "../../types/project_progress/project_progress_type";
import TaskLogList from "../../components/List/TaskLogList";
import HeaderForTaskStatusForToday from "../../components/Header/HeaderForTaskStatusForToday";


interface Props {}

const TaskLogPage = (props: Props) => {
  const [
    filterOptionForUserNameForTaskLogList,
    setFilterOptionForUserNameForTaskLogList,
  ] = useState("");

  const {
    isLoading: loadingForTaskLog,
    data: dataForTaskLogs,
    refetch: refetchForTaskLogs,
  } = useQuery<ResponseDataForTaskLog>(
    ["apiForGetTaskLogList", filterOptionForUserNameForTaskLogList],
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
      {/* hi */}
      <HeaderForTaskStatusForToday
        data={dataForTaskLogs}
        filterOptionForUserNameForTaskLogList={filterOptionForUserNameForTaskLogList}
        setFilterOptionForUserNameForTaskLogList={setFilterOptionForUserNameForTaskLogList}
      />
      <br />
      <TaskLogList
        dataForTaskLogs={dataForTaskLogs.TaskLog}
        userOptionForList={filterOptionForUserNameForTaskLogList}
      />
    </Box>
  );
};

export default TaskLogPage;
