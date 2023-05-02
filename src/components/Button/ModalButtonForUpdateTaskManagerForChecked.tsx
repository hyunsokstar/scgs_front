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
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { getUserNamesForCreate } from "../../apis/user_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { typeForTaskListForChecked } from "../../types/project_progress/project_progress_type";
import { apiForGetTaskListForCheckedPks } from "../../apis/project_progress_api";
import TableForTaskListForChecked from "../Table/TableForTaskListForChecked";

interface IUserNamesForCreate {
  pk: number;
  username: string;
}

interface IPropTypes {
  button_text: string;
  checkedRowPks: number[];
  setCheckedRowPks: React.Dispatch<React.SetStateAction<number[]>>;
}

const ModalButtonForUpdateTaskManagerForChecked: React.FC<IPropTypes> = ({
  button_text,
  checkedRowPks,
  setCheckedRowPks,
}: IPropTypes) => {
  const [isOpen, setIsOpen] = useState(false);

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

  console.log("checkedRowPks : ", checkedRowPks);
  console.log("dataForTaskListForCheckedPks : ", dataForTaskListForCheckedPks);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

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
            Modal Header
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

              <Box>
                <Select placeholder="Choose a task_manager" w={"50%"} m={2}>
                  {userNamesData?.map((user) => (
                    <option key={user.pk} value={user.pk}>
                      {user.username}
                    </option>
                  ))}
                </Select>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter bg="blue.200">Modal Footer</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateTaskManagerForChecked;
