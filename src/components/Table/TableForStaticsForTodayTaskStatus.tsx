import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

type TableProps = {
  total_task_count_for_today: number;
  task_count_for_ready: number;
  task_count_for_in_progress: number;
  task_count_for_testing: number;
  task_count_for_completed: number;
  progress_rate: number;
};

const TableForStaticsForTodayTaskStatus: React.FC<TableProps> = ({
  total_task_count_for_today,
  task_count_for_ready,
  task_count_for_in_progress,
  task_count_for_testing,
  task_count_for_completed,
  progress_rate,
}) => {
  return (
    <Box width={"100%"}>
      <Table
        variant="striped"
        colorScheme="black"
        size={["xs", "sm", "sm"]}
        borderRadius="xs"
        bg="blue.100"
        border="1px solid black"
        width={["100%", "100%", "100%", "100%"]}
      >
        <Thead>
          <Tr>
            <Th textAlign="center">전체</Th>
            <Th textAlign="center">⚪</Th>
            <Th textAlign="center">🟡</Th>
            <Th textAlign="center">🟠</Th>
            <Th textAlign="center">✔️</Th>
            <Th textAlign="center">진행</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td textAlign="center">{total_task_count_for_today}</Td>
            <Td textAlign="center">{task_count_for_ready}</Td>
            <Td textAlign="center">{task_count_for_in_progress}</Td>
            <Td textAlign="center">{task_count_for_testing}</Td>
            <Td textAlign="center">{task_count_for_completed}</Td>
            <Td textAlign="center">{progress_rate} %</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForStaticsForTodayTaskStatus;
