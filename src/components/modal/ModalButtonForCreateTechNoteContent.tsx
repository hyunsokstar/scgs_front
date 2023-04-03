import React, { FC, useState } from "react";
import {
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  HStack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNoteContent } from "../../apis/tech_note_api";
import { ITypeForCreateTechNoteContent } from "../../types/tech_note_type";

interface IPropsType {
    note_content_fk: string | number | undefined;
}

const ModalButtonForCreateTechNoteContent = ({ note_content_fk }: IPropsType) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm<ITypeForCreateTechNoteContent>();

  const queryClient = useQueryClient();


  const [note_content_content, set_note_content_content] = useState<string>("");

  const handleContentChange = (value: string) => {
    set_note_content_content(value);
  };

  const toast = useToast();

  const createMutationForTechNoteContent = useMutation(createNoteContent, {
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
      queryClient.refetchQueries(["getTechNoteContentListByPk"]);
      onClose();
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);
    },
  });

  const onSubmit = (data: ITypeForCreateTechNoteContent) => {
    console.log("data : ", data);
    createMutationForTechNoteContent.mutate({
        note_content_fk: note_content_fk,
        note_content_title:data.note_content_title,
        note_content_file: data.note_content_file,
        note_content_content: note_content_content,
    });

    // onClose();
  };

  return (
    <Box>
      <Box border="0px solid orange">
        <Button
          variant="outline"
          colorScheme="purple"
          _hover={{ bg: "purple.100" }}
          onClick={onOpen}
        >
          Create
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay zIndex={10}/ >
        <ModalContent>
          <ModalHeader>기술 노트 Content 추가</ModalHeader>
          <Box>
            <VStack gap={2}>
              <FormControl>
                <FormLabel>title</FormLabel>
                <Input
                  type="text"
                  {...register("note_content_title", {
                    required: "content_title is required",
                    maxLength: {
                      value: 50,
                      message: "content_title must be 50 characters or less",
                    },
                  })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>file</FormLabel>
                <Input
                  type="text"
                  {...register("note_content_file", {
                    required: "content_file is required",
                    maxLength: {
                      value: 50,
                      message: "content_title must be 50 characters or less",
                    },
                  })}
                />
              </FormControl>
              <Box width={"100%"}>
                <TinyMCEEditor
                  initialValue={note_content_content}
                  onChange={handleContentChange}
                  apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
                />
              </Box>
            </VStack>
          </Box>

          <ModalFooter>
            <Box width={"100%"}>
              <Button
                colorScheme="green"
                width={"79%"}
                onClick={handleSubmit(onSubmit)}
                mr={1}
              >
                저장
              </Button>
              <Button width={"20%"} colorScheme="yellow" onClick={onClose}>
                취소
              </Button>
            </Box>
          </ModalFooter>

          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            onClick={onClose}
            position="absolute"
            right="8px"
            top="8px"
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForCreateTechNoteContent;
