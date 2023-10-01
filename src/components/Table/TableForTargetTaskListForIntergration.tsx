import React, { useState } from "react";
import { Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import { useQuery, QueryClient } from "@tanstack/react-query"; // QueryClient를 import 합니다.

import {
  ITaskRowForIntergration,
  typeForTaskListForChecked,
} from "../../types/project_progress/project_progress_type";
import ModalForConfirmTaskIntergration from "../modal/ModalForConfirmTaskIntergration";
import { apiForGetTaskListForCheckedPks } from "../../apis/project_progress_api";

interface IProps {
  taskListForCheckedForIntergration: ITaskRowForIntergration[];
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
}

const TableForTargetTaskListForIntergration = ({
  taskListForCheckedForIntergration,
  checkedRowPks,
  setCheckedRowPks,
}: IProps) => {
  const queryClient = new QueryClient(); // QueryClient를 생성합니다.

  const [selectedTargetPk, setSelectedrTargetPk] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, data: dataForTaskListForCheckedForIntergrations } =
    useQuery<typeForTaskListForChecked>(
      ["getTaskListForCheckedForIntergrationConfirm", checkedRowPks],
      apiForGetTaskListForCheckedPks,
      {
        enabled: true, // 초기에 비활성화
      }
    );

  const handleRowSelect = (rowId: any, rowTask: string) => {
    console.log("checkedRowPks ?????? ", checkedRowPks);

    setSelectedrTargetPk(rowId);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    closeModal();
  };

  return (
    <>
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
          {taskListForCheckedForIntergration ? (
            taskListForCheckedForIntergration.map((row) => (
              <Tr
                key={row.id}
                bg={row.id === selectedTargetPk ? "blue.50" : "transparent"}
              >
                <Td>{row.task_manager.username}</Td>
                <Td>{row.task}</Td>
                <Td>{row.current_status}</Td>
                <Td>
                  <Button
                    size="sm"
                    onClick={() => handleRowSelect(row.id, row.task)}
                  >
                    선택 ({row.id})
                  </Button>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={4}>no data</Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      <ModalForConfirmTaskIntergration
        isModalOpen={isModalOpen}
        closeModal={handleConfirm}
        handleConfirm={handleConfirm}
        taskListForCheckedForIntergration={
          dataForTaskListForCheckedForIntergrations
            ? dataForTaskListForCheckedForIntergrations?.ProjectProgressList
            : []
        }
        checkedRowPks={checkedRowPks}
        setCheckedRowPks={setCheckedRowPks}
        selectedTargetPk={selectedTargetPk ? selectedTargetPk : 0}
      />
    </>
  );
};

export default TableForTargetTaskListForIntergration;
