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
} from "@chakra-ui/react";
import { EditIcon, CloseIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

type FormData = {
  tech_note_description: string;
  category_option: string;
};

const ModalButonForModofyTechNoteTitle: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("data : ", data);
    // onClose();
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
              <FormLabel>title</FormLabel>
              <Input
                type="text"
                {...register("tech_note_description", {
                  required: "tech_note_description is required",
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
                  required: "category_option is required",
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
