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
import { ITaskRowForIntergration } from "../../types/project_progress/project_progress_type";

interface IProps {
  taskListForCheckedForIntergration: ITaskRowForIntergration[];
}

const TableForTargetTaskListForIntergration = ({
  taskListForCheckedForIntergration,
}: IProps) => {
  const [selectedPk, setSelectedPk] = useState(null);
  const [selectedTask, setSelectedTask] = useState(""); // 추가: 선택한 행의 title을 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowSelect = (rowId: any, rowTask: string) => {
    setSelectedPk(rowId);
    setIsModalOpen(true);
    setSelectedTask(rowTask);
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
                bg={row.id === selectedPk ? "blue.50" : "transparent"}
              >
                <Td>{row.task_manager.username}</Td>
                <Td>{row.task}</Td>
                <Td>{row.current_status}</Td>
                <Td>
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
    </>
  );
};

export default TableForTargetTaskListForIntergration;
