import React, { useState, ChangeEvent } from "react";
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
  VStack,
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
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
}

// 1122
const ModalButtonForUpdateTaskManagerForChecked: React.FC<IPropTypes> = ({
  button_text,
  checkedRowPks,
  setCheckedRowPks,
}: IPropTypes) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");
  const toast = useToast();

  const handleChangeForSelectedManager = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedManager(event.target.value);
  };

  const {
    isLoading,
    data: dataForTaskListForCheckedPks,
    refetch: refatchForTaskListForCheckedPks,
  } = useQuery<typeForTaskListForChecked>(
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

  // console.log("checkedRowPks : ", checkedRowPks);
  // console.log("dataForTaskListForCheckedPks : ", dataForTaskListForCheckedPks);
  const queryClient = useQueryClient();

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  
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
      },
    }
  );

  const updateTaskManagerForCheckedTasks = () => {
    // console.log("checkedRowPks : ", checkedRowPks);
    console.log("selectedManager : ", selectedManager);

    mutationForUpdateTaskManagerForCheckedTasks.mutate({
      checkedRowPks,
      selectedManagerPk: parseInt(selectedManager),
    });
  };

  // 2244
  return (
    <Box>
      <Button
        variant="outline"
        size="sm"
        backgroundColor="red.50"
        _hover={{ backgroundColor: "red.100" }}
        mr={2}
        onClick={onOpen}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent bg="gray.100">
          <ModalHeader bg="red.200">
            Modal For Update Task Manger For Checked
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
          <ModalFooter bg="blue.200">Modal Footer</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateTaskManagerForChecked;
