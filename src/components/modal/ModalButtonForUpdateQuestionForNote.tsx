import { useState } from "react";
import {
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { EditIcon } from "@chakra-ui/icons";

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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Form 데이터 처리 예시
    onClose();
  };

  return (
    <>
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
                <input type="hidden" defaultValue={pk} {...register("pk")} />
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
    </>
  );
};

export default ModalButtonForUpdateQuestionForNote;
