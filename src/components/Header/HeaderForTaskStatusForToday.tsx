import { Box, Table, Tr, Th, Td, useBreakpointValue } from "@chakra-ui/react";
import TableForUsersTaskCountInfoForTaskLog from "../Table/TableForUsersTaskCountInfoForTaskLog";
import TableForTaskLogForTasksOfWeekDay from "../Table/TableForTaskLogForTasksOfWeekDay";
import { ResponseDataForTaskLog } from "../../types/project_progress/project_progress_type";

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

  const is_show_for_mobile = useBreakpointValue({
    base: true, // for mobile and small screens
    md: true, // for medium-sized screens and up
    lg: true, // for large screens and up
    sm: false,
  });

  return (
    <Box
      bg="lightblue"
      py={4}
      px={2}
      gap={2}
      display="grid"
      gridTemplateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(3, 1fr)", "repeat(3, 1fr)"]} // 1 column for mobile, 3 columns for others
    >
      {/* Box 1 */}
      <Box mb={[4, 4, 0]}>
        <Box>
          {data.today_info.date} {data.today_info.dayOfWeek}
          <TableForTaskLogForTasksOfWeekDay
            today_info={data.today_info}
            taskCountForWeekdays={data.task_count_for_weekdays}
          />
        </Box>
      </Box>

      {/* Box 2 */}
      <Box>
        {is_show_for_mobile && <Box>Today Task Statistics</Box>}
        <Table
          variant="striped"
          colorScheme="black"
          size="sm"
          borderRadius="md"
          border={"1px solid black"}
          mb={1}
        >
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
            {is_show_for_mobile && (
              <Th fontSize="md" textAlign={"center"}>
                완료율
              </Th>
            )}
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
            {is_show_for_mobile && (
              <Td fontSize="md" textAlign={"center"}>
                {completionRate}%
              </Td>
            )}
          </Tr>
          <Tr bg={"green.100"}>
            <Th
              fontSize="sm"
              textAlign={"center"}
              colSpan={is_show_for_mobile ? 2 : 3}
            >
              9:00 ~ 19:00
            </Th>
            {is_show_for_mobile && (
              <Th fontSize="md" textAlign={"center"} colSpan={2}>
                average
              </Th>
            )}
          </Tr>
          <Tr>
            <Td
              fontSize="md"
              textAlign={"center"}
              colSpan={is_show_for_mobile ? 2 : 3}
            >
              {elapsed_time}
            </Td>
            {is_show_for_mobile && (
              <Td fontSize="md" textAlign={"center"} colSpan={2}>
                {average_number_per_hour}
              </Td>
            )}
          </Tr>
        </Table>
      </Box>
      {/* Box 3 */}
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
