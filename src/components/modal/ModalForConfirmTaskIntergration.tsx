import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Divider,
  Table,
  Tbody,
  Tr,
  Td,
  Text,
} from "@chakra-ui/react";
import { IDataForTargetTask } from "../../types/project_progress/project_progress_type";
import { apiForGetTargetTaskInfoForTaskIntergrationByPk } from "../../apis/project_progress_api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TableForTaskListForChecked from "../Table/TableForTaskListForChecked";

interface IProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleConfirm: () => void;
  checkedRowPks: number[];
  taskListForCheckedForIntergration: any[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
  selectedTargetPk: number;
}

const ModalForConfirmTaskIntergration: React.FC<IProps> = ({
  isModalOpen,
  closeModal,
  handleConfirm,
  checkedRowPks,
  setCheckedRowPks,
  selectedTargetPk,
  taskListForCheckedForIntergration,
}: IProps) => {
  const { isLoading, data: dataForTargetTask } = useQuery<IDataForTargetTask>(
    ["getTaskListForCheckedPks", selectedTargetPk],
    apiForGetTargetTaskInfoForTaskIntergrationByPk,
    {
      enabled: true,
    }
  );

  return (
    <Box>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="full">
        <ModalOverlay />
        <ModalContent height={"100%"}>
          <ModalHeader>안내 메세지</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex height={"100%"}>
              <Box flex="1" border={"1px solid gray"} height={"100%"}>
                {/* 1영역 */}
                List of tasks to be converted into additional tasks
                <TableForTaskListForChecked
                  data={taskListForCheckedForIntergration}
                  checkedRowPks={checkedRowPks}
                  setCheckedRowPks={setCheckedRowPks}
                />
              </Box>
              <Divider orientation="vertical" mx="2" />
              <Box flex="1" border={"1px solid gray"} px={2}>
                {/* 2영역 */}
                2영역 ({selectedTargetPk})
                <Table variant="striped" colorScheme="gray" size="sm" px={2}>
                  <Tbody>
                    <Tr>
                      <Td fontWeight="bold" fontSize="xl">
                        Task:
                      </Td>
                      <Td>{dataForTargetTask?.task}</Td>
                    </Tr>
                    <Tr>
                      <Td>Due Date:</Td>
                      <Td>
                        {new Date(
                          dataForTargetTask?.due_date
                        ).toLocaleDateString()}
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
                      <Td>
                        {dataForTargetTask?.task_completed ? "Yes" : "No"}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
                <Box mt={2}>extra tasks:</Box>
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

export default ModalForConfirmTaskIntergration;
