import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";

interface ModalButtonForAddCommentForTaskProps {
  onAddComment: (comment: string) => void;
}

const ModalButtonForAddCommentForTask: React.FC<
  ModalButtonForAddCommentForTaskProps
> = ({ onAddComment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, reset } = useForm<{ comment: string }>();

  const onSubmit = (data: { comment: string }) => {
    onAddComment(data.comment);
    reset();
    onClose();
  };

  return (
    <>
      {/* <Button
          size="md"
          variant="outline"
          colorScheme="pink"
          borderRadius="full"
          _hover={{ bg: "pink.100" }}
          onClick={onOpen}
        >
          Add Comment
        </Button> */}

      <Button
        leftIcon={<FaPlus />}
        size="sm"
        colorScheme="purple"
        variant="outline"
        _hover={{ bg: "purple.50" }}
        borderRadius="full"
        onClick={onOpen}
      >
        Create
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Comment</ModalHeader>
          <ModalBody>
            <Input
              name="comment"
              placeholder="Enter your comment here"
              mb={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              size="md"
              variant="outline"
              colorScheme="pink"
              borderRadius="full"
              _hover={{ bg: "pink.100" }}
              mr={3}
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
            <Button
              size="md"
              variant="outline"
              colorScheme="gray"
              borderRadius="full"
              _hover={{ bg: "gray.100" }}
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForAddCommentForTask;
