import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Container, // Chakra UI Checkbox 추가
} from "@chakra-ui/react";
import { apiForGetTaskListForTaskIntergrationForSelectedOne } from "../../apis/project_progress_api";
import {
  IDataTypeForTaskListForTaskIntergrationForSelectedOne,
  ITask,
} from "../../types/project_progress/project_progress_type";
import PaginationComponent from "../PaginationComponent";

interface IProps {
  selectedTaskPk: any;
  checkedRows: number[]; // checkedRows 상태를 props로 추가
  setCheckedRows: React.Dispatch<React.SetStateAction<number[]>>;
}

const ContainerForTaskIntergrationForSelectedOne = ({
  selectedTaskPk,
  checkedRows, // props로 받은 checkedRows 상태 사용
  setCheckedRows,
}: IProps) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading,
    data: dataForTaskList,
    refetch,
  } = useQuery<IDataTypeForTaskListForTaskIntergrationForSelectedOne>(
    [
      "apiForGetTaskListForSelectedOneForTaskIntergration",
      pageNum,
      selectedTaskPk,
    ],
    apiForGetTaskListForTaskIntergrationForSelectedOne,
    {
      enabled: true,
    }
  );

  const handleCheckboxChange = (taskId: number) => {
    // 체크박스가 체크되었을 때
    if (checkedRows.includes(taskId)) {
      // 이미 체크되어 있던 항목이면 제거
      setCheckedRows(checkedRows.filter((id) => id !== taskId));
    } else {
      // 체크되어 있지 않은 항목이면 추가
      setCheckedRows([...checkedRows, taskId]);
    }
  };

  return (
    <Box>
      {isLoading ? (
        "Loading..."
      ) : dataForTaskList ? (
        <>
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>체크 박스</Th>
                <Th>Username</Th>
                <Th>Task</Th>
                <Th>Current Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataForTaskList.listForTask.map((task: ITask) => (
                <Tr key={task.id}>
                  <Td>
                    <Checkbox
                      // 체크박스의 상태와 연동
                      isChecked={checkedRows.includes(task.id)}
                      // 체크박스 체크/해제 이벤트 설정
                      onChange={() => handleCheckboxChange(task.id)}
                    />
                  </Td>
                  <Td>{task.task_manager.username}</Td>
                  <Td>{task.task}</Td>
                  <Td>{task.current_status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* 페이지네이션 추가 */}
          {dataForTaskList ? (
            <Container maxW="100%" bg="blue.100" color="red.500" mt={1}>
              <PaginationComponent
                current_page_num={pageNum}
                total_page_num={dataForTaskList.totalCountForTaskList}
                task_number_for_one_page={dataForTaskList.perPage}
                setCurrentPageNum={setPageNum}
              />
            </Container>
          ) : (
            ""
          )}

          {/* 체크된 항목의 번호를 출력 */}
          <div>체크한 번호: {checkedRows.join(", ")}</div>
        </>
      ) : (
        "No data"
      )}
    </Box>
  );
};

export default ContainerForTaskIntergrationForSelectedOne;
