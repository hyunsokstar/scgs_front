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
import {
  IDataForTargetTask,
  IExtraTaskRow,
} from "../../types/project_progress/project_progress_type";
import { apiForGetTargetTaskInfoForTaskIntergrationByPk } from "../../apis/project_progress_api";

function formatDate(datetimeStr: string): string {
  const options = {
    year: "2-digit" as const,
    month: "2-digit" as const,
    day: "2-digit" as const,
    hour: "2-digit" as const,
    minute: "2-digit" as const,
  };

  const date = new Date(datetimeStr);
  return date.toLocaleString(undefined, options);
}

interface IProps {
  selectedTaskPk: any;
  checkedRowsForConvertForRevert: number[];
  setCheckedRowsForConvertForRevert: React.Dispatch<
    React.SetStateAction<number[]>
  >;
}

const ContainerForSelectedTaskForTaskIntergration = ({
  selectedTaskPk,
  checkedRowsForConvertForRevert,
  setCheckedRowsForConvertForRevert,
}: IProps) => {
  const { isLoading, data: dataForTargetTask } = useQuery<IDataForTargetTask>(
    ["getTaskListForCheckedPks", selectedTaskPk],
    apiForGetTargetTaskInfoForTaskIntergrationByPk,
    {
      enabled: true,
    }
  );

  const handleCheckboxChange = (taskPk: number) => {
    // 체크박스가 체크되었을 때
    if (checkedRowsForConvertForRevert.includes(taskPk)) {
      // 이미 체크되어 있던 항목이면 제거
      setCheckedRowsForConvertForRevert(
        checkedRowsForConvertForRevert.filter((pk) => pk !== taskPk)
      );
    } else {
      // 체크되어 있지 않은 항목이면 추가
      setCheckedRowsForConvertForRevert([
        ...checkedRowsForConvertForRevert,
        taskPk,
      ]);
    }
  };

  // 2244
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
                        <Checkbox
                          // 체크박스의 상태와 연동
                          isChecked={checkedRowsForConvertForRevert.includes(
                            task.pk
                          )}
                          // 체크박스 체크/해제 이벤트 설정
                          onChange={() => handleCheckboxChange(task.pk)}
                        />
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
          선택한 항:
          <div>체크한 번호: {checkedRowsForConvertForRevert.join(", ")}</div>
        </Box>
      </Box>
    </Box>
  );
};

export default ContainerForSelectedTaskForTaskIntergration;
