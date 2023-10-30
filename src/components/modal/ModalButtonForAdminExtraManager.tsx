import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Avatar,
  Text,
  Spacer,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  IExtraManager,
  ITaskManager,
  IdataForUserListWitoutOwnerUser,
} from "../../types/project_progress/project_progress_type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiForCreateExtraManagerForTask,
  apiForDeleteExtraManagerForTask,
  apiForGetUserListWithoutOwnerUser,
} from "../../apis/project_progress_api";
import { FaTrash, FaPlus } from "react-icons/fa"; // 삭제 아이콘을 사용하기 위해 react-icons 패키지를 설치해야 합니다.
import PaginationComponent from "../PaginationComponent";

interface ModalButtonProps {
  buttonText: string;
  task: string;
  extra_managers: IExtraManager[];
  ownerUser: any;
  targetTaskId: any;
}

const ModalButtonForAdminExtraManager: React.FC<ModalButtonProps> = ({
  buttonText,
  task,
  extra_managers,
  ownerUser,
  targetTaskId,
}) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading,
    data: dataForUserListWitoutOwnerUser,
    refetch: projectTaskListRefatch,
  } = useQuery<IdataForUserListWitoutOwnerUser>(
    [
      "apiForGetUserListWithoutOwnerUser",
      ownerUser.username,
      extra_managers,
      pageNum,
    ],
    apiForGetUserListWithoutOwnerUser,
    {
      enabled: true,
    }
  );

  // 삭제 구현
  const mutationForDeleteExtraManagerForTask = useMutation(
    (extraManagerId: string | number) => {
      return apiForDeleteExtraManagerForTask(extraManagerId);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["getUncompletedTaskList"]);
        queryClient.refetchQueries(["apiForGetUserListWithoutOwnerUser"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
      onError: (error: any) => {
        console.error("에러 발생: ", error);

        toast({
          title: "에러 발생!",
          description: error.response.data.message,
          status: "error",
        });
      },
    }
  );

  const handleDeleteForExtraManager = (extraManagerId: number) => {
    // alert(extraManagerId);
    mutationForDeleteExtraManagerForTask.mutate(extraManagerId);
  };

  // mutationForAddExtraManagerForTargetTask
  // apiForCreateExtraManagerForTask
  const mutationForAddExtraManagerForTargetTask = useMutation(
    apiForCreateExtraManagerForTask,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "Add Extra Manager",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["apiForExtraTaskDetail"]);
        queryClient.refetchQueries(["getUncompletedTaskList"]);
        queryClient.refetchQueries(["apiForGetUserListWithoutOwnerUser"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const buttonHandlerForRegisterExtraManager = (
    userNameForRegister: string
  ) => {
    // alert(userNameForRegister + targetTaskId);
    mutationForAddExtraManagerForTargetTask.mutateAsync({
      targetTaskId,
      userNameForRegister,
    });
  };

  return (
    <>
      <Button
        size="xs"
        variant="outline"
        borderColor="blue"
        _hover={{ bg: "blue.100" }}
        onClick={onOpen}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent height={"80%"}>
          <ModalHeader>Admin Extra Manager</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              mb={2}
              border="1px solid blue"
              p={4} // 패딩을 추가하여 요소를 좀 더 간결하게 만듭니다.
              borderRadius="md" // 테두리를 둥글게 만듭니다.
              boxShadow="md" // 그림자 효과를 추가합니다.
            >
              <Text fontSize={"2xl"} fontWeight="bold">Task Info</Text>
              <Text>담당: {ownerUser.username}</Text>
              <Text>업무: {task}</Text>
            </Box>

            <Box display="flex" justifyContent="space-between">
              <Box flex="1" borderRight="1px dashed" pr="4">
                {/* 왼쪽 내용 */}

                {/* <Text>current extra managers</Text> */}
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  bg={"lightblue"}
                  p={1}
                  mb={2}
                >
                  Current Extra Managers
                </Text>

                {extra_managers
                  ? extra_managers.map((extra_manager) => {
                      return (
                        <Box display={"flex"} gap={2} my={1}>
                          <Avatar
                            name={extra_manager.task_manager.username} // 이름 설정
                            src={extra_manager.task_manager.profile_image} // 프로필 이미지 URL (선택 사항)
                            size="sm" // Avatar 크기 설정 (xs, sm, md, lg, xl 중 선택)
                          />
                          <Text>{extra_manager.task_manager.username}</Text>
                          <Spacer />
                          {/* 삭제 아이콘 버튼 추가 */}
                          <IconButton
                            icon={<FaTrash />} // 삭제 아이콘 사용
                            aria-label="Delete"
                            colorScheme="red" // 아이콘 색상 설정
                            size="xs" // 아이콘 크기 설정
                            onClick={() =>
                              handleDeleteForExtraManager(extra_manager.id)
                            } // 클릭 핸들러 설정
                          />
                        </Box>
                      );
                    })
                  : "no assistant managers"}
              </Box>

              <Box flex="1" pl="4">
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  bg={"lightblue"}
                  p={1}
                  mb={2}
                >
                  All Managers
                </Text>

                {dataForUserListWitoutOwnerUser
                  ? dataForUserListWitoutOwnerUser.listForExtraManager.map(
                      (row: ITaskManager) => {
                        return (
                          <Box display={"flex"} gap={2} my={1}>
                            <Avatar
                              name={row.username} // 이름 설정
                              src={row.profile_image} // 프로필 이미지 URL (선택 사항)
                              size="sm" // Avatar 크기 설정 (xs, sm, md, lg, xl 중 선택)
                            />
                            <Text>{row.username}</Text>
                            <Spacer />
                            <IconButton
                              icon={<FaPlus />} // 삭제 아이콘 사용
                              variant={"outline"}
                              aria-label="추가"
                              colorScheme="green" // 아이콘 색상 설정
                              size="xs" // 아이콘 크기 설정
                              onClick={() =>
                                buttonHandlerForRegisterExtraManager(
                                  row.username
                                )
                              }
                            />
                          </Box>
                        );
                      }
                    )
                  : "no users"}

                <PaginationComponent
                  current_page_num={pageNum}
                  setCurrentPageNum={setPageNum}
                  total_page_num={
                    dataForUserListWitoutOwnerUser?.totalCountForExtraManagerList
                  }
                  task_number_for_one_page={
                    dataForUserListWitoutOwnerUser?.perPage
                  }
                />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            {/* 모달 하단 버튼 등을 이 부분에 추가하세요 */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForAdminExtraManager;
