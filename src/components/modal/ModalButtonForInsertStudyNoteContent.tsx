import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  useDisclosure,
  CloseButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForCreateStudyNoteContents } from "../../apis/study_note_api";
import { StudyNoteContentFormData } from "../../types/study_note_type";

// type StudyNoteContentFormData = {
//   title: string;
//   file: string;
//   content: string;
// };

type Props = {
  buttonText: string;
  currentPage: number | string | undefined;
  study_note_pk: number | string | undefined;
  //   onSubmit: (formData: StudyNoteContentFormData) => void;
};

// 1122
const ModalButtonForInsertStudyNoteContent = ({
  buttonText,
  currentPage,
  study_note_pk,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudyNoteContentFormData>({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const toast = useToast();

  const queryClient = useQueryClient();

  const mutationForCreateStudyNote = useMutation(
    apiForCreateStudyNoteContents,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "welcome back!",
          status: "success",
        });
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);
        reset();
        onClose();
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleFormSubmit = async (formData: StudyNoteContentFormData) => {
    setIsLoading(true);
    console.log("formData : ", formData);
    mutationForCreateStudyNote.mutate(formData);

    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <Button
        size="sm"
        colorScheme="red"
        variant="outline"
        _hover={{ backgroundColor: "red.50" }}
        onClick={onOpen}
      >
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="white" color="gray.800">
          <ModalHeader>Insert Study Note Content</ModalHeader>
          <ModalBody>
            <FormControl display="none">
              <Input
                type="hidden"
                {...register("study_note_pk")}
                value={study_note_pk}
              />
              <Input
                type="hidden"
                {...register("current_page_number")}
                value={currentPage}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter the title"
                {...register("title", { required: true })}
                isInvalid={errors.title != null}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>File</FormLabel>
              <Input
                type="text"
                placeholder="Enter the file name"
                {...register("file", { required: true })}
                isInvalid={errors.file != null}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                placeholder="Enter the content"
                {...register("content", { required: true })}
                isInvalid={errors.content != null}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex justify="space-between" w="100%">
              <Button
                variant="outline"
                colorScheme="teal"
                mr={2}
                _hover={{ backgroundColor: "teal.100" }}
                onClick={handleSubmit(handleFormSubmit)}
                isLoading={isLoading}
              >
                Submit
              </Button>
              <Button
                variant="outline"
                colorScheme="teal"
                ml={2}
                _hover={{ backgroundColor: "teal.100" }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
          <CloseButton
            size="lg"
            colorScheme="teal"
            position="absolute"
            right="8px"
            top="8px"
            _hover={{ backgroundColor: "teal.100" }}
            onClick={onClose}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForInsertStudyNoteContent;
