import React, { useState } from "react";
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForGetTaskListForTaskIntegration } from "../../apis/project_progress_api";
import { IDataForTaskListForIntegration } from "../../types/project_progress/project_progress_type";

interface Props {}

const ContainerForTargetTask = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskListForCheckedPks,
  } = useQuery<IDataForTaskListForIntegration>(
    ["apiForGetTaskListForTaskIntegration", pageNum],
    apiForGetTaskListForTaskIntegration,
    {
      enabled: true,
    }
  );

  console.log("dataForTaskListForCheckedPks : ", dataForTaskListForCheckedPks);

  return (
    <Box>
      <Box fontSize={"2xl"} textAlign={"center"}>
        Target Tasks
      </Box>

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>task_manager</Th>
            <Th>task</Th>
            <Th>current_status</Th>
            <Th>선택</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataForTaskListForCheckedPks ? (
            dataForTaskListForCheckedPks.listForTask.map((row) => (
              <Tr key={row.id}>
                <Td>{row.task_manager.username}</Td>
                <Td>{row.task}</Td>
                <Td>{row.current_status}</Td>
                <Td>선택</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4}>no data</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ContainerForTargetTask;
