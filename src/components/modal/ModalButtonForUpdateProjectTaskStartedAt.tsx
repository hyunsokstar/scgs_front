import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단

import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
// import Calendar from "react-calendar";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import {
  updateProjectDueDate,
  updateProjectStartedAt,
} from "../../apis/project_progress_api";

interface IProps {
  taskPk: string;
  original_due_date: string;
  started_at: string;
  projectTaskListRefetch: any;
}

function ModalButtonForUpdateProjectTaskCompleteDate({
  taskPk,
  original_due_date,
  started_at,
  projectTaskListRefetch,
}: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const [started_at_for_update, set_started_at_for_update] = useState<Date>();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // updateDueDateByPkMutation
  const updateStratedAtByPkMutation = useMutation(updateProjectStartedAt, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("success : ", data);
      toast({
        title: data.message,
        status: "success",
      });
      projectTaskListRefetch();
      setIsOpen(false);
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });

  const handleUpdateDueDate = () => {
    updateStratedAtByPkMutation.mutate({ taskPk, started_at_for_update });
  };

  const handleChange = (newDate: any) => {
    set_started_at_for_update(newDate);
  };

  const invalidDate = (current: {
    isBefore: (arg0: Date, arg1: string) => any;
  }) => {
    // 현재 날짜 이전의 모든 날짜를 선택 불가능하도록 설정

    if (original_due_date !== "") {
      return current.isBefore(new Date(original_due_date), "day");
    } else {
        return true
    }
  };

  return (
    <>
      <IconButton
        icon={<CalendarIcon />}
        onClick={handleOpen}
        size={"xs"}
        aria-label="달력"
      />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            시작 날짜 선택 (선택 날짜: {started_at_for_update?.toString()}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>
              <Datetime
                // minDate={new Date(started_at)}// 시작 시점 이후 선택 가능
                isValidDate={invalidDate}
                onChange={handleChange}
                initialValue={new Date(started_at)}
              />
              {/* <p>Selected date and time: {due_date.toString()}</p> */}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdateDueDate}>
              확인
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalButtonForUpdateProjectTaskCompleteDate;
