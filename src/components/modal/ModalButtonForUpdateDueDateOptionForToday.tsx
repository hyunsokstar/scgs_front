import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateTaskDueDate } from "../../apis/project_progress_api";

type DueDateOption = "until-noon" | "until-evening" | "until-night";

interface IProps {
  button_text: any;
  button_size: string;
  modal_title: string;
  modal_size: string;
  button_width?: string;
  taskId: any;
}

const ModalButtonForUpdateDueDateOptionForToday = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
  taskId,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();

  //   alert(taskId)
  //   console.log("taskId ::", taskId);

  const mutationForUpdateTaskDueDate = useMutation(
    ({ taskPk, duration_option }: any) => {
      return apiForUpdateTaskDueDate({
        taskPk,
        duration_option,
      });
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "Update Task Due Date 성공!",
          status: "success",
          description: data.message,
        });

        queryClient.refetchQueries(["getUncompletedTaskList"]);
        queryClient.refetchQueries(["getInprogressTaskList"]);
        onClose();
      },
    }
  );

  const buttonHandlerForUpdateDueDateOptionForToday = (
    selectedOption: DueDateOption
  ) => {
    console.log("taskId :::::::::::::::::::::::: ", taskId);
    mutationForUpdateTaskDueDate.mutate({
      taskPk: taskId,
      duration_option: selectedOption,
    });
  };

  return (
    <>
      <Button
        aria-label="Confirm"
        variant="outline"
        colorScheme="green"
        rounded="md"
        size={button_size}
        width={button_width}
        onClick={onOpen}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} gap={2}>
              {button_text !== "☀️" && (
                <Button
                  variant="outline"
                  _hover={{ bg: "lightblue" }}
                  size={"sm"}
                  onClick={() =>
                    buttonHandlerForUpdateDueDateOptionForToday("until-noon")
                  }
                >
                  ☀️
                </Button>
              )}
              {button_text !== "🌛" && (
                <Button
                  variant="outline"
                  _hover={{ bg: "lightblue" }}
                  size={"sm"}
                  onClick={() =>
                    buttonHandlerForUpdateDueDateOptionForToday("until-evening")
                  }
                >
                  🌛
                </Button>
              )}
              {button_text !== "🌌" && (
                <Button
                  variant="outline"
                  _hover={{ bg: "lightblue" }}
                  size={"sm"}
                  onClick={() =>
                    buttonHandlerForUpdateDueDateOptionForToday("until-night")
                  }
                >
                  🌌
                </Button>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForUpdateDueDateOptionForToday;
