import React, { useEffect, useState } from "react";
import {
  useDisclosure,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { EditIcon } from "@chakra-ui/icons";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";
import { apiForUpdateSuggestionForBoard } from "../../apis/board_api";

interface Props {
  modal_title: string;
  modal_size: string;
  button_text: string;
  button_size: string;
  pk: string | number;
  title: string;
  content: string;
}

const ModalButtonForUpdateSuggestionForBoard = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  pk,
  title,
  content,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { handleSubmit, register, formState } = useForm();
  const [suggestion_content, set_suggestion_content] =
    useState<string>(content); // 변경: note_content -> suggestion_content

  const handleContentChange = (value: string) => {
    set_suggestion_content(value); // 변경: note_content -> suggestion_content
  };

  // mutationForUpdateSuggestionForBoard
  const mutationForUpdateSuggestionForBoard = useMutation(
    apiForUpdateSuggestionForBoard,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetSuggestionListForBoard"]);
        toast({
          title: "Update successful for suggestion content!",
          status: "success",
        });
        onClose();
        // 추가: 업데이트 후 실행할 콜백 함수 호출
      },
      onError: (error: any) => {
        console.log("error.message : ", error.message);
        toast({
          title: "Error!",
          description: error.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = (data: any) => {
    console.log(data); // Form 입력 data 확인

    mutationForUpdateSuggestionForBoard.mutate({
      pk,
      title: data.title,
      content: suggestion_content, // 변경: note_content -> suggestion_content
    });
  };

  useEffect(() => {
    set_suggestion_content(content); // 변경: note_content -> suggestion_content
  }, [content]);

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
              </Stack>

              <FormControl isInvalid={!!formState.errors.content}>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Box zIndex={9999}>
                  <TinyMCEEditor
                    initialValue={suggestion_content} // 변경: note_content -> suggestion_content
                    onChange={handleContentChange}
                    apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
                  />
                </Box>
              </FormControl>
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

export default ModalButtonForUpdateSuggestionForBoard;
