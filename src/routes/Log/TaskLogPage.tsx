import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
// data
import { useQuery } from "@tanstack/react-query";
import { apiForGetTaskLogList } from "../../apis/project_progress_api";
import { ResponseDataForTaskLog } from "../../types/project_progress/project_progress_type";
import TaskLogList from "../../components/List/TaskLogList";
import HeaderForTaskStatusForToday from "../../components/Header/HeaderForTaskStatusForToday";
import TableForTaskLogForTasksOfWeekDay from "../../components/Table/TableForTaskLogForTasksOfWeekDay";

interface Props {}

const TaskLogPage = (props: Props) => {
  const [
    filterOptionForUserNameForTaskLogList,
    setFilterOptionForUserNameForTaskLogList,
  ] = useState("");

  const [selectedDay, setSelectedDay] = useState(""); // 초기 선택값은 없음

  const {
    isLoading: loadingForTaskLog,
    data: dataForTaskLogs,
    refetch: refetchForTaskLogs,
  } = useQuery<ResponseDataForTaskLog>(
    [
      "apiForGetTaskLogList",
      filterOptionForUserNameForTaskLogList,
      selectedDay,
    ],
    apiForGetTaskLogList,
    {
      enabled: true,
    }
  );

  console.log("dataForTaskLogs : ", dataForTaskLogs);

  useEffect(() => {
    if (selectedDay === "" && dataForTaskLogs && dataForTaskLogs.today_info) {
      setSelectedDay(dataForTaskLogs.today_info.dayOfWeek);
    }
  }, [dataForTaskLogs, setSelectedDay]);

  if (!dataForTaskLogs) {
    return <Box>"...loading"</Box>;
  }

  return (
    <Box py={1}>
      <HeaderForTaskStatusForToday
        data={dataForTaskLogs}
        filterOptionForUserNameForTaskLogList={
          filterOptionForUserNameForTaskLogList
        }
        setFilterOptionForUserNameForTaskLogList={
          setFilterOptionForUserNameForTaskLogList
        }
      />
      {/* <Text my={1}>
        {dataForTaskLogs.today_info.date} {dataForTaskLogs.today_info.dayOfWeek}
      </Text> */}
      <Box mt={1}></Box>
      <TableForTaskLogForTasksOfWeekDay
        today_info={dataForTaskLogs.today_info}
        taskCountForWeekdays={dataForTaskLogs.task_count_for_weekdays}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
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
