import React, { useState } from "react";
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
  Flex, // 추가: Flex 컴포넌트 import
  Divider, // 추가: Divider 컴포넌트 import
} from "@chakra-ui/react";
import { useQuery, QueryClient } from "@tanstack/react-query"; // QueryClient를 import 합니다.
import {
    IDataForTargetTask,
  IOneTaskForProjectTaskType,
  typeForTaskListForChecked,
} from "../../types/project_progress/project_progress_type";
import { apiForGetTargetTaskInfoForTaskIntergrationByPk, apiForGetTaskListForCheckedPks } from "../../apis/project_progress_api";
import TableForTargetTaskListForIntergration from "../Table/TableForTargetTaskListForIntergration";
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

const ModalForConfirmTaskIntergration = ({
  isModalOpen,
  closeModal,
  handleConfirm,
  checkedRowPks,
  setCheckedRowPks,
  selectedTargetPk,
  taskListForCheckedForIntergration,
}: IProps) => {
    
  const { isLoading, data: dataForTargetTask } =
  useQuery<IDataForTargetTask>(
    ["getTaskListForCheckedPks", selectedTargetPk],
    apiForGetTargetTaskInfoForTaskIntergrationByPk,
    {
      enabled: true, // 초기에 비활성화
    }
  ); 

  console.log("dataForTargetTask : ", dataForTargetTask)

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
                1영역
                <TableForTaskListForChecked
                  data={taskListForCheckedForIntergration}
                  checkedRowPks={checkedRowPks}
                  setCheckedRowPks={setCheckedRowPks}
                />
              </Box>
              <Divider orientation="vertical" mx="2" />
              <Box flex="1" border={"1px solid gray"}>
                {/* 2영역 */}
                2영역 ({selectedTargetPk})

                <Box>
                    task:
                    {dataForTargetTask?.task}
                </Box>

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
