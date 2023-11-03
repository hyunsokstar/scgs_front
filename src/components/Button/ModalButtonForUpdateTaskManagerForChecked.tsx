import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconButton,
  Select,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { getUserNamesForCreate } from "../../apis/user_api";
import { typeForTaskListForChecked } from "../../types/project_progress/project_progress_type";
import {
  apiForGetTaskListForCheckedPks,
  apiForUpdateTaskManagerForCheckedTasks,
} from "../../apis/project_progress_api";
import TableForTaskListForChecked from "../Table/TableForTaskListForChecked";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface IUserNamesForCreate {
  pk: number;
  username: string;
}

interface IPropTypes {
  button_text: string;
  size: string;
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
}

// 1122
const ModalButtonForUpdateTaskManagerForChecked: React.FC<IPropTypes> = ({
  button_text,
  checkedRowPks,
  setCheckedRowPks,
  size,
}: IPropTypes) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");
  const toast = useToast();

  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskListForCheckedPks,
  } = useQuery<any>(
    ["getTaskListForCheckedPks", checkedRowPks],
    apiForGetTaskListForCheckedPks,
    {
      enabled: true,
    }
  );
  

  // user data 가져 오기
  const {
    isLoading: isLoadingForUserNamesData,
    data: userNamesData,
    error,
  } = useQuery<IUserNamesForCreate[]>(["user_names"], getUserNamesForCreate);

  const handleChangeForSelectedManager = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedManager(event.target.value);
  };


  const onClose = () => setIsOpen(false);
  const onOpen = () => {
    if (dataForTaskListForCheckedPks?.ProjectProgressList.length === 0) {
      toast({
        status: "warning",
        title: "Please select at least one item",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      setIsOpen(true);
    }
  };

  const mutationForUpdateTaskManagerForCheckedTasks = useMutation(
    apiForUpdateTaskManagerForCheckedTasks,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["getTaskListForCheckedPks"]);
        queryClient.refetchQueries(["getUncompletedTaskList"]);

        toast({
          status: "success",
          title: "task manager update for check success",
          description: result.message,
        });
        onClose();
      },
    }
  );

  const updateTaskManagerForCheckedTasks = () => {
    mutationForUpdateTaskManagerForCheckedTasks.mutate({
      checkedRowPks,
      selectedManagerPk: parseInt(selectedManager),
    });
  };

  useEffect(() => {
    if (dataForTaskListForCheckedPks?.ProjectProgressList.length === 0) {
      setIsOpen(false);
    }
  }, [dataForTaskListForCheckedPks, setIsOpen]);

  // 2244
  return (
    <Box>
      <Button
        variant="outline"
        size={size}
        backgroundColor="red.50"
        _hover={{ backgroundColor: "red.100" }}
        width={"100%"}
        onClick={onOpen}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent bg="gray.50">
          <ModalHeader bg="green.100">
            Update Task Manger
            <IconButton
              aria-label="Close modal"
              icon={<CloseIcon />}
              onClick={onClose}
              bg="transparent"
              border="none"
              position="absolute"
              right="1rem"
              top="1rem"
              _hover={{ bg: "purple.300" }}
            />
          </ModalHeader>
          <ModalBody bg="white.200">
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              width={"100%"}
              border={"1px solid green"}
            >
              <Box>
                {dataForTaskListForCheckedPks ? (
                  <TableForTaskListForChecked
                    data={dataForTaskListForCheckedPks?.ProjectProgressList}
                    checkedRowPks={checkedRowPks}
                    setCheckedRowPks={setCheckedRowPks}
                  />
                ) : (
                  "no data"
                )}
              </Box>

              <Box display={"flex"} alignItems={"center"} gap={2}>
                <Select
                  placeholder="Choose a task_manager"
                  w={"50%"}
                  m={2}
                  onChange={handleChangeForSelectedManager}
                >
                  {userNamesData?.map((user) => (
                    <option key={user.pk} value={user.pk}>
                      {user.username}
                    </option>
                  ))}
                </Select>

                <Button
                  name="confirm"
                  onClick={updateTaskManagerForCheckedTasks}
                  variant="outline"
                  borderColor="pastelOutlineColor" // 실제 파스텔 색상 코드로 변경해주세요
                  _hover={{
                    backgroundColor: "#32CD32", // 실제 파스텔 색상 코드로 변경해주세요
                    borderColor: "#008000", // 실제 파스텔 색상 코드로 변경해주세요
                  }}
                  size="md"
                >
                  Confirm
                </Button>
              </Box>
              {/* 업데이트 버튼 추가 */}
            </Box>
          </ModalBody>
          <ModalFooter bg="green.100">Modal Footer</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateTaskManagerForChecked;
