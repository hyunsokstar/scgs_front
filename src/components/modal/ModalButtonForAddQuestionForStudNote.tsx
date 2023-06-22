import { useState } from "react";

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
  Input,
  Textarea,
  FormErrorMessage,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { apiForCreateQuestionForNote } from "../../apis/study_note_api";

interface IProps {
  button_text: string;
  button_size: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | number | undefined;
}

const ModalButtonForClassRoomListForStudyNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  study_note_pk,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = new QueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutationForCreateTaskUrlForTask = useMutation(
    apiForCreateQuestionForNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "Task URL 추가",
          description: "Task URL을 추가하였습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["apiForExtraTaskDetail"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const onSubmit = (data: any) => {
    console.log(data);
    mutationForCreateTaskUrlForTask.mutate({
      study_note_pk,
      title: data.title,
      content: data.content,
    });
    onClose();
  };

  return (
    <>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
      >
        {button_text}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl marginBottom="1rem">
              <Input
                {...register("title", { required: true })}
                placeholder="Title"
              />
              {errors.title && (
                <FormErrorMessage>This field is required</FormErrorMessage>
              )}
            </FormControl>
            <FormControl marginBottom="1rem">
              <Textarea
                {...register("content", { required: true })}
                placeholder="Content"
              />
              {errors.content && (
                <FormErrorMessage>This field is required</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Box display={"flex"} gap={2} width={"100%"}>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                onClick={handleSubmit(onSubmit)}
                width={"50%"}
              >
                Submit
              </Button>
              <Button onClick={onClose} width={"50%"}>
                Cancel
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForClassRoomListForStudyNote;
