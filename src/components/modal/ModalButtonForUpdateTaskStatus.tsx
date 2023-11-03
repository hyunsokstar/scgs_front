import * as React from "react";
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TaskForTaskStatusForToday } from "../../types/project_progress/project_progress_type";
import SlideToggleButtonForInProgress from "../SlideToggleButton/SlideToggleButtonForInProgress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProjectInProgress,
  updateProjectIsTesting,
  updateProjectTaskCompleted,
} from "../../apis/project_progress_api";
import SlideToggleButtonForIsTesting from "../SlideToggleButton/SlideToggleButtonForIsTesting";
import SlideToggleButton from "../SlideToggleButton";

interface IProps {
  modal_text: string;
  current_status: any;
  task: any;
  refetch?: () => void;
}

const ModalButtonForUpdateTaskStatus: React.FC<IProps> = ({
  modal_text,
  current_status,
  task,
  refetch,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();

  // console.log("task : ", task);

  const getButtonContent = (status: string) => {
    switch (status) {
      case "ready":
        return "⚪";
      case "in_progress":
        return "🟡";
      case "testing":
        return "🟠";
      case "completed":
        return "✔️";
      default:
        return "⚪";
    }
  };

  const updateProjectTaskInProgressMutations = useMutation(
    updateProjectInProgress,
    {
      onSuccess: (result: any) => {
        if (refetch) {
          refetch();
          queryClient.refetchQueries(["getTaskStatusForToday"]);
        } else {
          queryClient.refetchQueries(["getTaskStatusForToday"]);
        }
        // queryClient.refetchQueries(["getCompletedTaskList"]);
        // projectTaskListRefatch()
        toast({
          status: "success",
          title: "task status update success2",
          description: result.message,
        });
        // onClose();
      },
      onError: (err: any) => {
        console.log("error : ", err);
      },
    }
  );

  const updateHandlerForTaskInProgress = (taskId: any) => {
    updateProjectTaskInProgressMutations.mutate(taskId);
    console.log("update 핸들러 for task_status check pk : ", taskId);
  };

  const updateProjectTaskIsTestingMutations = useMutation(
    updateProjectIsTesting,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        if (refetch) {
          refetch();
          queryClient.refetchQueries(["getTaskStatusForToday"]);
          console.log("refetch is excuted !");
        } else {
          queryClient.refetchQueries(["getTaskStatusForToday"]);
        }

        toast({
          status: "success",
          title: "task status update success",
          description: result.message,
        });
      },
    }
  );

  const updateHandlerForTaskIsTesting = (taskPk: string) => {
    updateProjectTaskIsTestingMutations.mutate(taskPk);
    console.log("update for testing : ", taskPk);
  };

  const updateProjectTaskMutations = useMutation(updateProjectTaskCompleted, {
    onSuccess: (result: any) => {
      console.log("result : ", result);

      if (refetch) {
        console.log("refetch is excuted !");
        queryClient.refetchQueries(["getUncompletedTaskList"]);
        queryClient.refetchQueries(["getCompletedTaskList"]);
        queryClient.refetchQueries(["getTaskStatusForToday"]);
      } else {
        queryClient.refetchQueries(["getTaskStatusForToday"]);
      }

      toast({
        status: "success",
        title: "task status update success",
        description: result.message,
      });
      onClose();
    },
  });

  const updateHandlerForTaskStatus = (taskPk: string) => {
    updateProjectTaskMutations.mutate(taskPk);
    console.log("update 핸들러 for task_status check pk : ", taskPk);
  };

  return (
    <Box>
      <Button
        onClick={onOpen}
        variant="outline"
        size="sm"
        _hover={{ bg: "lightblue" }}
      >
        {getButtonContent(current_status)}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="gray.100">{modal_text}</ModalHeader>
          <ModalCloseButton
            colorScheme="blackAlpha"
            bg="pastel"
            _hover={{ bg: "pastel" }}
          />
          <ModalBody bg="gray.100">
            {/* Place your modal body content here */}
            {/* task.pk, task.in_progress, task.is_testing */}
            <Box
              display={"flex"}
              width="300px"
              border="0px solid green"
              justifyContent={"flex-start"}
              gap={10}
            >
              <Box border={"0px solid green"} width={"50"}>
                <SlideToggleButtonForInProgress
                  onChange={() => {
                    updateHandlerForTaskInProgress(task.id);
                  }}
                  checked={task.in_progress}
                  is_disabled={task.is_testing}
                />
              </Box>

              <Box border={"0px solid green"} width={"50"}>
                <SlideToggleButtonForIsTesting
                  onChange={() => {
                    updateHandlerForTaskIsTesting(task.id);
                  }}
                  checked={task.is_testing}
                  is_disabled={!task.in_progress}
                />
              </Box>

              <Box border={"0px solid green"} width={"50"}>
                <SlideToggleButton
                  onChange={() => {
                    updateHandlerForTaskStatus(task.id);
                  }}
                  checked={task.task_completed}
                  in_progress={!task.in_progress}
                  is_testing={!task.is_testing}
                />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter bg="gray.100">
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateTaskStatus;
