import { Box, Divider, Flex, Text } from "@chakra-ui/react";

interface TaskStatusData {
  total_today_task_count: number;
  total_today_completed_task_count: number;
  total_today_uncompleted_task_count: number;
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
      <Box>
        <Text fontSize="xl">Today Task Count: {total_today_task_count}</Text>
        <Text fontSize="xl">
          Completed Task: {total_today_completed_task_count}
        </Text>
        <Text fontSize="xl">
          Uncompleted Task: {total_today_uncompleted_task_count}
        </Text>
        <Text fontSize="xl">완료율: {completionRate}%</Text>
      </Box>
      <Box>2영역</Box>
      <Box>3영역</Box>
    </Box>
  );
};

export default HeaderForTaskStatusForToday;
