import React, { FC } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createApiForTechNoteList,
  createTechNoteForTask,
  updateTechNoteInfoByPk,
} from "../../apis/tech_note_api";
import { IFormTypeForCreateTechNoteList } from "../../types/tech_note_type";

interface IProps {
  taskPk: string | number | undefined;
}

const ModalButtonForCreateTechNoteForTask = ({ taskPk }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { handleSubmit, register } = useForm<IFormTypeForCreateTechNoteList>();
  const queryClient = useQueryClient();

  const createMutationForTechNoteInfo = useMutation(createTechNoteForTask, {
    onSuccess: (result: any) => {
      console.log("result : ", result);
      queryClient.refetchQueries(["getTechNoteList"]);

      toast({
        status: "success",
        title: "task status create success",
        description: result.message,
      });
    },
    onError: (err) => {
      console.log("error : ", err);
    },
  });

  const onSubmit = (data: IFormTypeForCreateTechNoteList) => {
    console.log("data : ", data);
    // category_option,
    // tech_note_description

    createMutationForTechNoteInfo.mutate({
      taskPk: taskPk,
      category_option: data.category_option,
      tech_note_description: data.tech_note_description,
    });
  };

  return (
    <>
      <IconButton
        icon={<AddIcon />}
        aria-label="생성"
        variant="outline"
        borderColor="red.500"
        _hover={{ bg: "red.100" }}
        _active={{ bg: "red.200" }}
        size="xs"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>기술 노트 추가</ModalHeader>
          <ModalBody>
            <FormControl mb={2}>
              <FormLabel>title</FormLabel>
              <Input
                type="text"
                {...register("tech_note_description", {
                  required: true,
                  maxLength: {
                    value: 50,
                    message:
                      "tech_note_description must be 50 characters or less",
                  },
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>카테고리</FormLabel>
              <Select
                defaultValue={"create"}
                {...register("category_option", {
                  required: true,
                })}
              >
                <option value="create">Create</option>
                <option value="read">Read</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="boiler_plate">Boiler Plate</option>
                <option value="library_example">Library Example</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button colorScheme="green" onClick={handleSubmit(onSubmit)}>
              저장
            </Button>
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
    </>
  );
};

export default ModalButtonForCreateTechNoteForTask;
