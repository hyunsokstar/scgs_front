import {
  Box,
  Table,
  Tr,
  Th,
  Td,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import TableForUsersTaskCountInfoForTaskLog from "../Table/TableForUsersTaskCountInfoForTaskLog";
import TableForTaskLogForTasksOfWeekDay from "../Table/TableForTaskLogForTasksOfWeekDay";
import { ResponseDataForTaskLog } from "../../types/project_progress/project_progress_type";

interface HeaderForTaskStatusForTodayProps {
  data: ResponseDataForTaskLog;
  filterOptionForUserNameForTaskLogList: string;
  setFilterOptionForUserNameForTaskLogList: React.Dispatch<
    React.SetStateAction<string>
  >;
}

const HeaderForTaskStatusForToday: React.FC<
  HeaderForTaskStatusForTodayProps
> = ({
  data,
  setFilterOptionForUserNameForTaskLogList,
  filterOptionForUserNameForTaskLogList,
}) => {
  const {
    total_today_task_count,
    total_today_completed_task_count,
    total_today_uncompleted_task_count,
    average_number_per_hour,
    elapsed_time,
    writers,
  } = data;

  let completionRate =
    (total_today_completed_task_count / total_today_task_count) * 100;
  completionRate = isNaN(completionRate) ? 0 : Math.round(completionRate);

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
      gridTemplateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(3, 1fr)",
        "repeat(3, 1fr)",
      ]} // 1 column for mobile, 3 columns for others
    >
      {/* Box 1 */}
      <Box mb={[4, 4, 0]}>
        <Table
          variant="striped"
          colorScheme="black"
          size="sm"
          borderRadius="md"
          border={"1px solid black"}
          mb={1}
        >
          <Tr bg={"green.100"}>
            <Th
              fontSize="sm"
              textAlign={"center"}
              colSpan={is_show_for_mobile ? 2 : 3}
            >
              <Text>근무 시간 ( 9:00 ~ 19:00 )</Text>
            </Th>
            {is_show_for_mobile && (
              <Th fontSize="md" textAlign={"center"} colSpan={2}>
                시간당 평균 처리 건수
              </Th>
            )}
          </Tr>
          <Tr>
            <Td
              fontSize="md"
              textAlign={"center"}
              colSpan={is_show_for_mobile ? 2 : 3}
            >
              <Text>
                {elapsed_time}
              </Text>
            </Td>
            {is_show_for_mobile && (
              <Td fontSize="md" textAlign={"center"} colSpan={2}>
                {average_number_per_hour}
              </Td>
            )}
          </Tr>
        </Table>
      </Box>

      {/* Box 2 */}
      <Box>
        {/* {is_show_for_mobile && <Box>Today Task Statistics</Box>} */}
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
                {completionRate} %
              </Td>
            )}
          </Tr>
        </Table>
      </Box>
      {/* Box 3 */}
      <Box>
        <TableForUsersTaskCountInfoForTaskLog
          writers={writers}
          filterOptionForUserNameForTaskLogList={
            filterOptionForUserNameForTaskLogList
          }
          setFilterOptionForUserNameForTaskLogList={
            setFilterOptionForUserNameForTaskLogList
          }
        />
      </Box>
    </Box>
  );
};

export default HeaderForTaskStatusForToday;
