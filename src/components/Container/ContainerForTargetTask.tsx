import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex, // 추가: Flex 컴포넌트 import
  Divider, // 추가: Divider 컴포넌트 import
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForGetTaskListForTaskIntegration } from "../../apis/project_progress_api";
import { IDataForTaskListForIntegration } from "../../types/project_progress/project_progress_type";

interface IProps {
  checkedRowPks: number[];
}

const ContainerForTargetTask = ({ checkedRowPks }: IProps) => {
  const [pageNum, setPageNum] = useState(1);
  const [selectedPk, setSelectedPk] = useState(null);
  const [selectedTask, setSelectedTask] = useState(""); // 추가: 선택한 행의 title을 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleRowSelect = (rowId: any, rowTask: string) => {
    setSelectedPk(rowId);

    // 모달 열기
    setIsModalOpen(true);

    // 선택한 행의 title 설정
    setSelectedTask(rowTask);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // 여기에서 선택된 행(row.task)의 부가 업무로 전환하는 작업을 수행할 수 있습니다.
    // 이 부분은 실제로 구현해야 합니다.
    // 작업이 완료되면 모달을 닫을 수 있습니다.
    closeModal();
  };

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
              <Tr
                key={row.id}
                // 선택된 행의 배경색 변경
                bg={row.id === selectedPk ? "blue.50" : "transparent"}
              >
                <Td>{row.task_manager.username}</Td>
                <Td>{row.task}</Td>
                <Td>{row.current_status}</Td>
                <Td>
                  {/* 선택 버튼 클릭 시 해당 행의 id와 title 저장 */}
                  <Button
                    size="sm"
                    onClick={() => handleRowSelect(row.id, row.task)}
                  >
                    선택
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

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
        <ModalOverlay />
        <ModalContent height={"100%"}>
          <ModalHeader>안내 메세지</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex height={"100%"}>
              <Box flex="1" border={"1px solid gray"} height={"100%"}>
                {/* 1영역 */}
                1영역 내용
              </Box>
              <Divider orientation="vertical" mx="2" />
              <Box flex="1" border={"1px solid gray"}>
                {/* 2영역 */}
                {selectedTask ? (
                  <p>{`체크한 업무들을 선택한 행의 "${selectedTask}"의 부가 업무로 전환하시겠습니까?`}</p>
                ) : (
                  <p>선택한 업무가 없습니다.</p>
                )}
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
              확인
            </Button>
            <Button colorScheme="gray" onClick={closeModal}>
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContainerForTargetTask;
