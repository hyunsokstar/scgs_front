import React, { useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  useToast,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForCreateStudyNoteFaq } from "../../apis/study_note_api";

interface Props {
  button_text: string;
  button_size: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | number | undefined;
}

const ModalButtonForAddFaqForStudyNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  study_note_pk,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();
  const [note_content, set_note_content] = useState<string>("");

  const mutationForCreateFaq = useMutation(apiForCreateStudyNoteFaq, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      queryClient.refetchQueries(["apiForGetFAQBoardList"]);

      toast({
        title: "create faq success",
        status: "success",
      });

      reset();
      onClose();
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);
    },
  });

  const onSubmit = (data: any) => {
    // 데이터 처리 로직
    console.log("title :", data.title);
    console.log("note_content : ", note_content);
    // mutationForCreateStudyNote
    mutationForCreateFaq.mutate({
      study_note_pk: study_note_pk,
      title: data.title,
      content: note_content,
    });
  };

  const handleContentChange = (value: string) => {
    set_note_content(value);
  };

  // 2244
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box marginBottom="1rem">
                <Input
                  {...register("title", { required: true })}
                  placeholder="Title"
                />

                {errors.title && (
                  <span style={{ color: "red" }}>This field is required</span>
                )}
              </Box>

              <Box marginBottom="1">
                <Box style={{ zIndex: 9999 }}>
                  <TinyMCEEditor
                    onChange={handleContentChange}
                    apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
                  />
                </Box>
              </Box>

              <Button type="submit" colorScheme="blue" marginRight="10px">
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForAddFaqForStudyNote;
