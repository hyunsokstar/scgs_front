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

interface TaskStatusData {
  total_today_task_count: number;
  total_today_completed_task_count: number;
  total_today_uncompleted_task_count: number;
  average_number_per_hour: number;
  elapsed_time: string;
}

interface HeaderForTaskStatusForTodayProps {
  data: TaskStatusData;
}

const HeaderForTaskStatusForToday: React.FC<
  HeaderForTaskStatusForTodayProps
> = ({ data }) => {
  const {
    total_today_task_count,
    total_today_completed_task_count,
    total_today_uncompleted_task_count,
    average_number_per_hour,
    elapsed_time,
  } = data;

  const completionRate = Math.round(
    (total_today_completed_task_count / total_today_task_count) * 100
  );
  //   const formattedCompletionRate = completionRate.toFixed(2).replace(/\.00$/, "");

  return (
    <Box
      bg="lightblue"
      py={4}
      px={6}
      display="flex"
      justifyContent="space-between"
    >
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <Table
          variant="striped"
          colorScheme="black"
          size="md"
          borderRadius="md"
          border={"1px solid black"}
        >
          <Tbody>
            <Tr>
              <Th fontSize="md">Total</Th>
              <Th fontSize="md">완료</Th>
              <Th fontSize="md">비완료</Th>
              <Th fontSize="md">완료율</Th>
            </Tr>
            <Tr>
              <Td fontSize="md">{total_today_task_count}</Td>
              <Td fontSize="md">{total_today_completed_task_count}</Td>
              <Td fontSize="md">{total_today_uncompleted_task_count}</Td>
              <Td fontSize="md">{completionRate}%</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box>
        <Table
          variant="striped"
          colorScheme="black"
          size="md"
          borderRadius="md"
          border={"1px solid black"}
        >
          <Tbody>
            <Tr>
              <Th fontSize="md">업무 시간(from 9:00)</Th>
              <Th fontSize="md">평균 개수(시간당)</Th>
            </Tr>
            <Tr>
              <Td fontSize="md">{elapsed_time}</Td>
              <Td fontSize="md">{average_number_per_hour}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box>3영역</Box>
    </Box>
  );
};

export default HeaderForTaskStatusForToday;
