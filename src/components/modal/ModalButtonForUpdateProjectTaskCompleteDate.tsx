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
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

import { updateProjectDueDate } from "../../apis/project_progress_api";

interface IProps {
  taskPk: string;
  original_due_date: string;
  started_at: string;
  projectTaskListRefetch : any;
}

function ModalButtonForUpdateProjectTaskCompleteDate({
  taskPk,
  original_due_date,
  started_at,
  projectTaskListRefetch
  
}: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const [due_date, set_due_date] = useState<Date>();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // updateDueDateByPkMutation
  const updateDueDateByPkMutation = useMutation(updateProjectDueDate, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("success : ", data);
      toast({
        title: "project due_date update success",
        status: "success",
      });
      projectTaskListRefetch()
      setIsOpen(false);
    },
    onError: (error) => {
      console.log("mutation has an error");
    },
  });

  const handleUpdateDueDate = () => {
    updateDueDateByPkMutation.mutate({ taskPk, due_date });
  };

  const handleChange = (newDate: any) => {
    set_due_date(newDate);
  };

  const invalidDate = (current: { isSameOrAfter: (arg0: Date, arg1: string) => any; }) => {
    return current.isSameOrAfter(new Date(started_at), 'day');
  }
  
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
            update due_date (선택한 날짜: {due_date?.toString()})
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={4}>

              <Datetime
                // minDate={new Date(started_at)}// 시작 시점 이후 선택 가능
                isValidDate={invalidDate}
                onChange={handleChange}
                initialValue={original_due_date ? new Date(original_due_date) : new Date()}
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
