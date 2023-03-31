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
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IUpdateFormTypeForTechNoteInfo } from "../../types/tech_note_type";
import { updateTechNoteInfoByPk } from "../../apis/tech_note_api";

// IUpdateFormTypeForTechNoteInfo
// type FormData = {
//   tech_note_description: string;
//   category_option: string;
// };

type IProps = {
  techNotePk: number;
};

const ModalButonForModofyTechNoteTitle = ({ techNotePk }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { handleSubmit, register } = useForm<IUpdateFormTypeForTechNoteInfo>();
  const queryClient = useQueryClient();


  const updateMutationForTechNoteInfo = useMutation(updateTechNoteInfoByPk, {
    onSuccess: (result: any) => {
      console.log("result : ", result);
      queryClient.refetchQueries(["getTechNoteList"]);

      toast({
        status: "success",
        title: "task status update success",
        description: result.message,
      });
    },
    onError: (err) => {
      console.log("error : ", err);
    },
  });

  const onSubmit = (data: IUpdateFormTypeForTechNoteInfo) => {
    console.log("data : ", data);
    // category_option,
    // tech_note_description

    updateMutationForTechNoteInfo.mutate({
      techNotePk: data.techNotePk,
      category_option: data.category_option,
      tech_note_description: data.tech_note_description,
    });
  };

  return (
    <>
      <IconButton
        icon={<EditIcon />}
        aria-label="수정"
        variant="outline"
        borderColor="green.500"
        _hover={{ bg: "green.100" }}
        _active={{ bg: "green.200" }}
        size="xs"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>기술 노트 수정</ModalHeader>
          <ModalBody>
            <FormControl>
              <Input
                type="hidden"
                value={techNotePk}
                {...register("techNotePk")}
              />
            </FormControl>

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

export default ModalButonForModofyTechNoteTitle;