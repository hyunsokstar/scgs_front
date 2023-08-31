import React, { useEffect, useState } from "react";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";
import {
  useDisclosure,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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

interface Props {
  button_text: string;
  button_size: string;
  modal_title: string;
  modal_size: string;
  pk: string;
  title: string;
  content: string;
}

const ModalButtonForUpdateFaqForNote = ({
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
  const [note_content, set_note_content] = useState<string>(content);

  const handleContentChange = (value: string) => {
    set_note_content(value);
  };

  const onSubmit = (data: any) => {
    console.log(data); // Form 입력 data 확인
  };

  useEffect(() => {
    set_note_content(content)
  }, [content])

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
                    initialValue={note_content}
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

export default ModalButtonForUpdateFaqForNote;
