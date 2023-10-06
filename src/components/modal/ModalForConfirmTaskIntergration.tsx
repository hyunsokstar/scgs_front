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
  Thead,
  Th,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { IDataForTargetTask } from "../../types/project_progress/project_progress_type";
import {
  apiForGetTargetTaskInfoForTaskIntergrationByPk,
  apiForTransformCheckedTasksToSupplementTaskForSelected,
} from "../../apis/project_progress_api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TableForTaskListForChecked from "../Table/TableForTaskListForChecked";
import { useNavigate } from 'react-router-dom';

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
  isModalOpen: boolean;
  closeModal: () => void;
  handleConfirm: () => void;
  checkedRowPks: number[];
  taskListForCheckedForIntergration: any[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
  selectedTargetPk: number;
}

// 관련 api
// http://127.0.0.1:8000/api/v1/project_progress/target-task/200
// 1122
const ModalForConfirmTaskIntergration: React.FC<IProps> = ({
  isModalOpen,
  closeModal,
  handleConfirm,
  checkedRowPks,
  setCheckedRowPks,
  selectedTargetPk,
  taskListForCheckedForIntergration,
}: IProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const { isLoading, data: dataForTargetTask } = useQuery<IDataForTargetTask>(
    ["getTaskListForCheckedPks", selectedTargetPk],
    apiForGetTargetTaskInfoForTaskIntergrationByPk,
    {
      enabled: true,
    }
  );

  // 선택된 업무들을 선택된 업무의 부가 업무로 전환(post)
  const mutationForTransformCheckedTasksToSupplementTaskForSelected =
    useMutation(apiForTransformCheckedTasksToSupplementTaskForSelected, {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries([
          "apiForGetTargetTaskListForTaskIntegration",
        ]);
        queryClient.refetchQueries(["getTaskListForCheckedPks"]);
        queryClient.refetchQueries(["getUncompletedTaskList"]);

        // todo
        // react에서 http://127.0.0.1:3000/project_admin/{selectedTargetPk} 로 페이지 이동        

        const targetUrl = `/project_admin/${selectedTargetPk}`;

        // 해당 URL로 페이지 이동
        navigate(targetUrl);

        toast({
          title: "transform checked tasks success!",
          description: data.message,
          status: "success",
        });
      },
      onError: (error: any) => {
        console.log("error.message : ", error.message);

        toast({
          title: "Error!",
          description: error.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    });

  const convertTaskHandler = () => {
    // alert("옮길 대상 : " + checkedRowPks);
    // alert("옮길 타겟 : " + selectedTargetPk);
    mutationForTransformCheckedTasksToSupplementTaskForSelected.mutate({
      checkedRowPks,
      selectedTargetPk,
    });
  };

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
                <TableForTaskListForChecked
                  data={taskListForCheckedForIntergration}
                  checkedRowPks={checkedRowPks}
                  setCheckedRowPks={setCheckedRowPks}
                />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                border={"2px solid red"}
                flexDirection={"column"}
                gap={2}
                px={2}
              >
                <Button
                  size="sm"
                  variant={"ouline"}
                  border={"1px solid gray"}
                  _hover={{ bgColor: "blue" }}
                  onClick={convertTaskHandler}
                >
                  convert
                </Button>
                <Button
                  size="sm"
                  variant={"ouline"}
                  border={"1px solid gray"}
                  _hover={{ bgColor: "blue" }}
                >
                  revert
                </Button>
              </Box>
              {/* <Divider orientation="vertical" mx="2" /> */}
              <Box flex="1" border={"1px solid gray"} px={2}>
                Target Task:
                <Text fontSize={"25px"} mx={2}>
                  {dataForTargetTask?.task}
                </Text>
                <Table variant="striped" colorScheme="gray" size="sm" px={2}>
                  <Tbody>
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
                        ? dataForTargetTask.extra_tasks.map(
                            (task: IExtraTaskRow) => (
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
                            )
                          )
                        : "no data"}
                    </Tbody>
                  </Table>
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
