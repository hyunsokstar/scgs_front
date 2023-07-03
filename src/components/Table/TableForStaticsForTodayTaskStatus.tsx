import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

type TableProps = {
  toal_task_count_for_today: number;
  task_count_for_ready: number;
  task_count_for_in_progress: number;
  task_count_for_testing: number;
  task_count_for_completed: number;
  progress_rate: number;
};

const TableForStaticsForTodayTaskStatus: React.FC<TableProps> = ({
  toal_task_count_for_today,
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
        size={["xs","sm","sm"]}
        borderRadius="xs"
        bg={"blue.100"}
        border={"1px solid black"}
        width={["100%","100%","100%","100%"]}
      >
        {" "}
        {/* 내부 영역 배경색을 white로 설정 */}
        <Thead>
          <Tr>
            <Th>전체</Th>
            <Th>⚪</Th>
            <Th>🟡</Th>
            <Th>🟠</Th>
            <Th>✔️</Th>
            <Th>진행</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{toal_task_count_for_today}</Td>
            <Td>{task_count_for_ready}</Td>
            <Td>{task_count_for_in_progress}</Td>
            <Td>{task_count_for_testing}</Td>
            <Td>{task_count_for_completed}</Td>
            <Td>{progress_rate} %</Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForStaticsForTodayTaskStatus;
