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
  IconButton,
  Input,
  Textarea,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { EditIcon } from "@chakra-ui/icons";
import { apiForUpdateQuestionForNote } from "../../apis/study_note_api";

interface IProps {
  button_text: string;
  button_size: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | number | undefined;
  pk: string;
  title: string;
  content: string;
  page: number;
}

// 1122
const ModalButtonForUpdateQuestionForNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  study_note_pk,
  pk,
  title,
  content,
  page,
}: IProps) => {

  // alert(pk)

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { handleSubmit, register } = useForm();
  const queryClient = useQueryClient();

  const mutationForUpdateQuestionForNote = useMutation(
    apiForUpdateQuestionForNote,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["apiForGetQnABoardList"]);
        toast({
          status: "success",
          title: "question update success",
          description: result.message,
        });
        onClose();
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  // const onEditConfirmHandler = (commentPk: number | string) => {
  //   mutationForUpdateCommentForExtraTask.mutate({
  //     commentPk,
  //     commentText: commentTextForUpdate,
  //   });
  // };

  const onSubmit = (data: any) => {
    // alert("이거 실행 되나?")
    console.log(data); // Form 데이터 처리 예시
    mutationForUpdateQuestionForNote.mutate({
      question_pk: data.pk,
      title: data.title,
      content: data.content,
      page: data.page,
    });
  };

  return (
    <Box>
      <IconButton
        aria-label={button_text}
        onClick={onOpen}
        icon={<EditIcon />}
        size={button_size}
        _hover={{ bgColor: "yellow.100" }}
        variant="ghost"
      />
      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody>
              <Stack spacing={4}>
                <input type="hidden" value={pk} {...register("pk")} />
                <Input
                  defaultValue={title}
                  {...register("title")}
                  placeholder="Title"
                />
                <Textarea
                  defaultValue={content}
                  {...register("content")}
                  placeholder="Content"
                />
                <Input
                  width={"20%"}
                  defaultValue={page}
                  {...register("page")}
                  placeholder="Page"
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForUpdateQuestionForNote;
