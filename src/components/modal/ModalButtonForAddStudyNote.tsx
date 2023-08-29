import { AddIcon } from "@chakra-ui/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useToast,
  Select,
  
} from "@chakra-ui/react";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { type_for_insert_study_note } from "../../types/study_note_type";
import { apiForCreateStudyNote } from "../../apis/study_note_api";


interface IProps {
  button_text: string;
  button_size: string;
}

function ModalButtonForAddStudyNote({ button_text, button_size }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<type_for_insert_study_note>();

  const mutationForCreateStudyNote = useMutation(apiForCreateStudyNote, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);

      toast({
        title: "welcome back!",
        status: "success",
      });
      queryClient.refetchQueries(["apiForgetStudyNoteList"]);
      reset();
      setIsOpen(false);
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);
    },
  });

  const onSubmit = (data: type_for_insert_study_note) => {
    console.log(data);

    mutationForCreateStudyNote.mutate(data);
  };

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  return (
    <Box>
      <Box display="flex">
        <Button
          variant="outline"
          colorScheme="purple"
          // size="md"
          size={button_size}
          _hover={{ bg: "purple.100" }}
          rightIcon={<AddIcon />}
          onClick={onOpen}
          w={"100%"}
        >
          {button_text}
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent borderRadius="20px" border={"0px solid black"}>
          <ModalHeader bg="purple.100" color="white">
            Modal Title
          </ModalHeader>
          <ModalCloseButton variant="outline" colorScheme="purple" />
          <ModalBody height="80%" overflowY="auto" bg="purple.50">
            {/* 내용을 여기에 작성 */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  placeholder="Enter title"
                  {...register("title", { required: true })}
                />
                <FormErrorMessage>Please enter a title</FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Enter description"
                  {...register("description", { required: true })}
                />
                <FormErrorMessage>Please enter a description</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.first_category}>
                <FormLabel htmlFor="first_category">First Category</FormLabel>
                <Select
                  id="first_category"
                  {...register("first_category", { required: true })}
                  placeholder="Select a category"
                >
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                </Select>
                {errors.first_category && (
                  <FormErrorMessage>
                    {errors.first_category.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt={4} isInvalid={!!errors.second_category}>
                <FormLabel htmlFor="second_category">Second Category</FormLabel>
                <Select
                  id="second_category"
                  {...register("second_category", { required: true })}
                  placeholder="Select a category"
                >
                  <option value="tutorial">Tutorial</option>
                  <option value="framework">Framework</option>
                  <option value="library">Library</option>
                  <option value="boiler-plate">Boiler Plate</option>
                  <option value="sample-code">Sample Code</option>
                  <option value="code-review">Code Review</option>
                  <option value="programming-language">
                    Programming Language
                  </option>
                  <option value="challenge">Challenge</option>
                </Select>
                {errors.second_category && (
                  <FormErrorMessage>
                    {errors.second_category.message}
                  </FormErrorMessage>
                )}
              </FormControl>

              <Box display="flex" justifyContent="flex-end" mt={4}>
                <Button
                  mr={4}
                  variant="outline"
                  colorScheme="purple"
                  _hover={{ bg: "purple.100" }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  colorScheme="purple"
                  _hover={{ bg: "purple.100" }}
                >
                  Submit
                </Button>
              </Box>
            </form>

            {/* 내용을 여기에 작성 */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ModalButtonForAddStudyNote;
