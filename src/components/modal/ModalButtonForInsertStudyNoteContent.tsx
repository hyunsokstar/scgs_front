import React, { useState } from "react";
import Modal from "react-modal";
import {
  Button,
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
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForCreateStudyNoteContents } from "../../apis/study_note_api";
import { StudyNoteContentFormData } from "../../types/study_note_type";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";

type Props = {
  buttonText: string;
  currentPage: number | string | undefined;
  study_note_pk: number | string | undefined;
  //   onSubmit: (formData: StudyNoteContentFormData) => void;
};

function ModalButtonForInsertStudyNoteContent({
  buttonText,
  currentPage,
  study_note_pk,
}: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
  const [note_content_content, set_note_content_content] = useState<string>("");

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
        setModalIsOpen(false);
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
    mutationForCreateStudyNote.mutate({
      title: formData.title,
      file: formData.file,
      content: note_content_content,
      study_note_pk: formData.study_note_pk,
      current_page_number: formData.current_page_number,
    });

    setIsLoading(false);
    setModalIsOpen(false);
  };

  const handleContentChange = (value: string) => {
    set_note_content_content(value);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(255, 204, 153)", // 배경색 설정
      zIndex: 100000, // z-index 설정
      border: "none", // 테두리 제거
      borderRadius: "10px", // 모서리 둥글게
      padding: "20px", // 내부 여백 추가
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // 그림자 효과 추가
      width: "80%",
    },
    overlay: {
      zIndex: 500, // 모달보다 작은 z-index 값을 지정합니다.
    },
  };

  return (
    <Box pr={1}>
      <Button
        variant="outline"
        onClick={openModal}
        _hover={{ bg: "teal.500", color: "white" }}
      >
        Add Note Content
      </Button>{" "}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2>modal for insert study note content</h2>
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="outline"
            bg="pink.100"
            color="gray.700"
            size="sm"
            _hover={{
              bg: "pink.200",
              color: "gray.900",
            }}
            onClick={closeModal}
          >
            X
          </Button>{" "}
        </Box>

        <Box>
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
            <Box zIndex={9999}>
              <TinyMCEEditor
                onChange={handleContentChange}
                apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
              />
            </Box>
          </FormControl>
        </Box>
        <Box mt={2}>
          <Flex justify="space-between" w="100%">
            <Button
              variant="outline"
              colorScheme="teal"
              mr={2}
              _hover={{ backgroundColor: "teal.100" }}
              onClick={handleSubmit(handleFormSubmit)}
              isLoading={isLoading}
              w={"50%"}
            >
              Submit
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              ml={2}
              _hover={{ backgroundColor: "teal.100" }}
              onClick={closeModal}
              w={"50%"}
            >
              Cancel
            </Button>
          </Flex>
        </Box>
      </Modal>
    </Box>
  );
}

export default ModalButtonForInsertStudyNoteContent;
