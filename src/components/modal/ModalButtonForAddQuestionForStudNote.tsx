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
} from "@tanstack/react-query";
import { apiForCreateQuestionForNote } from "../../apis/study_note_api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IProps {
  button_text: string;
  button_size: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | number | undefined;
  refetchForGetQnABoardList: () => void;
}

const ModalButtonForClassRoomListForStudyNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  study_note_pk,
  refetchForGetQnABoardList,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = new QueryClient();

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutationForCreateTaskUrlForTask = useMutation(
    apiForCreateQuestionForNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        refetchForGetQnABoardList();
        reset();
        // queryClient.refetchQueries(["apiForGetQnABoardList"]);

        toast({
          title: "question 추가",
          description: "question 을 추가하였습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        onClose();
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const onSubmit = (data: any) => {
    console.log(data);

    if (isLoggedIn) {
      mutationForCreateTaskUrlForTask.mutate({
        study_note_pk,
        title: data.title,
        content: data.content,
        page: data.page,
      });
    } else {
      toast({
        title: "로그인 필요",
        description: "question 을 추가 하려면 로그인 필요",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
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

            <FormControl marginBottom="1rem">
              <Input
                {...register("page", {
                  required: true,
                  pattern: {
                    value: /^[1-9][0-9]?$|^50$/, // Accepts values between 1 and 50
                    message: "Please enter a number between 1 and 50",
                  },
                })}
                width={"20%"}
                placeholder="Todo Page"
                type="number"
              />
              {errors.page && (
                <Box style={{ color: "red" }}>
                  {typeof errors.page === "string" && errors.page}
                </Box>
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