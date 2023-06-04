import {
  Box,
  Divider,
  Flex,
  Text,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import TableForUsersTaskCountInfoForTaskLog from "../Table/TableForUsersTaskCountInfoForTaskLog";
import TableForTaskLogForTasksOfWeekDay from "../Table/TableForTaskLogForTasksOfWeekDay";
import { ResponseDataForTaskLog } from "../../types/project_progress/project_progress_type";

// interface TaskStatusData {
//   total_today_task_count: number;
//   total_today_completed_task_count: number;
//   total_today_uncompleted_task_count: number;
//   average_number_per_hour: number;
//   elapsed_time: string;
//   writers: any;
// }

interface HeaderForTaskStatusForTodayProps {
  data: ResponseDataForTaskLog;
  setUserOptionForList: React.Dispatch<React.SetStateAction<string>>;
  userOptionForList: string;
}

const HeaderForTaskStatusForToday: React.FC<
  HeaderForTaskStatusForTodayProps
> = ({ data, setUserOptionForList, userOptionForList }) => {
  const {
    total_today_task_count,
    total_today_completed_task_count,
    total_today_uncompleted_task_count,
    average_number_per_hour,
    elapsed_time,
    writers,
  } = data;

  const completionRate = Math.round(
    (total_today_completed_task_count / total_today_task_count) * 100
  );

  return (
    <Box
      bg="lightblue"
      py={4}
      px={2}
      gap={2}
      display="flex"
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Box>
          {data.today_info.date} {data.today_info.dayOfWeek}
          <TableForTaskLogForTasksOfWeekDay
            today_info={data.today_info}
            taskCountForWeekdays={data.task_count_for_weekdays}
          />
        </Box>
      </Box>
      <Box>
        Today Task Statics
        <Table
          variant="striped"
          colorScheme="black"
          size="md"
          borderRadius="md"
          border={"1px solid black"}
          mb={1}
        >
          <Tbody>
            <Tr bg={"green.100"}>
              <Th fontSize="md" textAlign={"center"}>
                Total
              </Th>
              <Th fontSize="md" textAlign={"center"}>
                완료
              </Th>
              <Th fontSize="md" textAlign={"center"}>
                비완료
              </Th>
              <Th fontSize="md" textAlign={"center"}>
                완료율
              </Th>
            </Tr>
            <Tr>
              <Td fontSize="md" textAlign={"center"}>
                {total_today_task_count}
              </Td>
              <Td fontSize="md" textAlign={"center"}>
                {total_today_completed_task_count}
              </Td>
              <Td fontSize="md" textAlign={"center"}>
                {total_today_uncompleted_task_count}
              </Td>
              <Td fontSize="md" textAlign={"center"}>
                {completionRate}%
              </Td>
            </Tr>

            <Tr bg={"green.100"}>
              <Th fontSize="md" textAlign={"center"} colSpan={2}>
                업무 시간(from 9:00)
              </Th>
              <Th fontSize="md" textAlign={"center"} colSpan={2}>
                평균 개수(시간당)
              </Th>
            </Tr>
            <Tr>
              <Td fontSize="md" textAlign={"center"} colSpan={2}>
                {elapsed_time}
              </Td>
              <Td fontSize="md" textAlign={"center"} colSpan={2}>
                {average_number_per_hour}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Box>
        <TableForUsersTaskCountInfoForTaskLog
          writers={writers}
          userOptionForList={userOptionForList}
          setUserOptionForList={setUserOptionForList}
        />
      </Box>
    </Box>
  );
};

export default HeaderForTaskStatusForToday;
