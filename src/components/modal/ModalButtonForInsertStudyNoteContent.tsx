import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  useToast,
  Box,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForCreateStudyNoteContents } from "../../apis/study_note_api";
import { StudyNoteContentFormData } from "../../types/study_note_type";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";

type Props = {
  button_text: string;
  currentPage: number | string | undefined;
  study_note_pk: number | string | undefined;
  button_size?: string;
  button_width?: string;
  refetch?: () => void;
};

// 1122
function ModalButtonForInsertStudyNoteContent({
  button_text,
  currentPage,
  study_note_pk,
  button_size,
  refetch,
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

        if (refetch) {
          refetch();
        } else {
          queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);
        }

        reset();
        setModalIsOpen(false);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  // submit
  const handleFormSubmit = async (formData: StudyNoteContentFormData) => {
    setIsLoading(true);
    console.log("formData : ", formData);

    mutationForCreateStudyNote.mutate({
      title: formData.title,
      file: formData.file,
      content: note_content_content,
      study_note_pk: formData.study_note_pk,
      current_page_number: formData.current_page_number,
      content_option: formData.content_option,
    });

    setIsLoading(false);
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "49%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#A6D8F0", // 배경색 설정
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

  const handleContentChange = (value: string) => {
    set_note_content_content(value);
  };

  // 단축키 1 설정 for study note
  const handleKeyPress = (e: any) => {
    // Ctrl + Enter를 눌렀을 때 버튼 클릭
    if (e.altKey && e.key === "2") {
      openModal();
    }

    if (e.shiftKey && e.key === "Enter") {
      // handleSubmit(handleFormSubmit)();
      document.getElementById("submitBtn")?.click(); // Submit 버튼 클릭
      closeModal();
    }

    if (e.ctrlKey && e.key === "ArrowRight") {
      let currentUrl: string = window.location.href; // 현재 URL 가져오기
      let urlParts: string[] = currentUrl.split("/"); // URL을 '/'로 분할하여 배열로 변환
      let lastSegment: string = urlParts[urlParts.length - 1]; // URL에서 마지막 세그먼트(숫자) 가져오기
      let incrementedSegment: number = parseInt(lastSegment) + 1; // 숫자에 1 더하기
      urlParts[urlParts.length - 1] = String(incrementedSegment); // 증가된 숫자를 문자열로 변환하여 배열 업데이트

      let newUrl: string = urlParts.join("/"); // 배열을 다시 URL로 조합
      window.location.href = newUrl; // 새로운 URL로 페이지 요청
    }

    if (e.ctrlKey && e.key === "ArrowLeft") {
      const currentURL = window.location.href;
      const lastSlashIndex = currentURL.lastIndexOf("/");
      const lastPart = currentURL.substring(lastSlashIndex + 1);
      const currentNumber = parseInt(lastPart, 10);

      if (!isNaN(currentNumber)) {
        const nextNumber = currentNumber - 1;
        const newURL = currentURL.replace(`/${lastPart}`, `/${nextNumber}`);
        // alert(`이동할 URL은 ${newURL} 입니다.`);

        window.location.href = newURL;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // 2244
  return (
    <Box pr={1}>
      <Button
        variant="outline"
        onClick={openModal}
        _hover={{ bg: "yellow.100", color: "black" }}
        border={"1px solid black"}
        size={button_size}
        width={"100%"}
        onKeyDownCapture={handleKeyPress}
      >
        {button_text}
      </Button>{" "}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button
            variant="outline"
            bg="pink.100"
            border={"1px solid black"}
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
              {...register("content_option")}
              value={"note_content"}
            />
          </FormControl>

          <FormControl>
            <Input
              type="hidden"
              {...register("study_note_pk")}
              value={study_note_pk}
            />
          </FormControl>

          <FormControl>
            <Input
              type="hidden"
              {...register("current_page_number")}
              value={currentPage}
            />
          </FormControl>

          <HStack>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter the title"
                {...register("title", { required: true })}
                isInvalid={errors.title != null}
                autoFocus
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>File2</FormLabel>
              <Input
                type="text"
                placeholder="Enter the file name"
                {...register("file", { required: false })}
                isInvalid={errors.file != null}
              />
            </FormControl>
          </HStack>

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
        <Box mt={5}>
          <Flex justify="space-between" w="100%">
            <Button
              variant="outline"
              colorScheme="teal"
              mr={2}
              _hover={{ backgroundColor: "teal.100" }}
              onClick={handleSubmit(handleFormSubmit)}
              isLoading={isLoading}
              w={"50%"}
              id="submitBtn" // Submit 버튼에 ID 부여
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
