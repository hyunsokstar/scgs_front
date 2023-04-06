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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCommentForTaskApi } from "../../apis/project_progress_api";

interface ModalButtonForAddCommentForTaskProps {
  //   onAddComment: (comment: string) => void;
  taskPk: string | number;
}

const ModalButtonForAddCommentForTask: React.FC<
  ModalButtonForAddCommentForTaskProps
> = ({ taskPk }: ModalButtonForAddCommentForTaskProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { handleSubmit, register, reset } = useForm<{ comment: string }>();

  const createMutationForTaskComment = useMutation(createCommentForTaskApi, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);

      toast({
        title: "welcome back!",
        status: "success",
      });
      //   requery getOneProjectTask
      queryClient.refetchQueries(["getOneProjectTask"]);
      onClose();
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);
    },
  });

  // submit go
  const onSubmit = (data: { comment: string }) => {
    const comment = data.comment;
    console.log("taskPk : ", taskPk);
    console.log("comment : ", data.comment);
    createMutationForTaskComment.mutate({ taskPk, comment });
    // onAddComment(data.comment);
    reset();
    // onClose();
  };

  return (
    <>
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
              placeholder="Enter your comment here"
              mb={4}
              {...register("comment", {
                required: false,
                maxLength: 50,
              })}
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
