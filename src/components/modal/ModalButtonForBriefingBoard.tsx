import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ITaskComment } from "../../types/project_progress/project_progress_type";
import ChatStyleBoard from "../ChatStyleBoard";

interface User {
  pk: number;
  username: string;
  profile_image: string;
}

interface IProps {
  button_text: string;
  button_size: string;
  modal_title: string;
  modal_size: string;
  taskPk: number | string;
  task_manager: User | undefined;
  task_comments: ITaskComment[];
  refetch: any;
  button_width?: string;
}

// 1122
const ModalButtonForBriefingBoard = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
  taskPk,
  task_manager,
  task_comments,
  refetch,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 2244
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
            모달 바디
            <ChatStyleBoard
              taskPk={taskPk}
              task_manager={task_manager}
              task_comments={task_comments}
              refetch={refetch}
            />
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

export default ModalButtonForBriefingBoard;
