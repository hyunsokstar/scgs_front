import React from "react";
import {
  Box,
  Checkbox,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
  Thead,
  Th,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IDataForTargetTask } from "../../types/project_progress/project_progress_type";
import { apiForGetTargetTaskInfoForTaskIntergrationByPk } from "../../apis/project_progress_api";

function formatDate(datetimeStr: string): string {
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const date = new Date(datetimeStr);
  return date.toLocaleString(undefined, options);
}

interface IProps {
  selectedTaskPk: any;
}

const ContainerForSelectedTaskForTaskIntergration = ({
  selectedTaskPk,
}: IProps) => {
  const { isLoading, data: dataForTargetTask } = useQuery<IDataForTargetTask>(
    ["getTaskListForCheckedPks", selectedTaskPk],
    apiForGetTargetTaskInfoForTaskIntergrationByPk,
    {
      enabled: true,
    }
  );

  return (
    <Box>
      <Box flex="1" border={"1px solid gray"} px={2}>
        <Text fontSize={"25px"} mx={2}>
          {dataForTargetTask?.task}
        </Text>
        <Table variant="striped" colorScheme="gray" size="sm" px={2}>
          <Tbody>
            <Tr>
              <Td>Due Date:</Td>
              <Td>
                {new Date(dataForTargetTask?.due_date).toLocaleDateString()}
              </Td>
            </Tr>
            <Tr>
              <Td>Task Manager:</Td>
              <Td>{dataForTargetTask?.task_manager.username}</Td>
            </Tr>
            <Tr>
              <Td>Importance:</Td>
              <Td>{dataForTargetTask?.importance}</Td>
            </Tr>
            <Tr>
              <Td>Task Completed:</Td>
              <Td>{dataForTargetTask?.task_completed ? "Yes" : "No"}</Td>
            </Tr>
          </Tbody>
        </Table>
        <Box mt={5}>
          <Text>extra tasks:</Text>
          <Table variant="simple" size={"sm"}>
            <Thead>
              <Tr>
                <Th>체크</Th>
                <Th>Task</Th>
                <Th>Status</Th>
                <Th>Importance</Th>
                <Th>Started At</Th>
                <Th>Completed At</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataForTargetTask && dataForTargetTask.extra_tasks
                ? dataForTargetTask.extra_tasks.map((task: IExtraTaskRow) => (
                    <Tr key={task.pk}>
                      <Td>
                        <Checkbox />
                      </Td>
                      <Td>{task.task}</Td>
                      <Td>{task.task_status}</Td>
                      <Td>{task.importance}</Td>
                      <Td>{formatDate(task.started_at)}</Td>
                      <Td>{formatDate(task.completed_at)}</Td>
                    </Tr>
                  ))
                : "no data"}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default ContainerForSelectedTaskForTaskIntergration;
