import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateStudyNoteContent } from "../../apis/study_note_api";

interface ModalButtonForSearchStudyNoteContentProps extends ButtonProps {
  pk: number;
  title: string;
  file_name: string;
  content: string;
  button_text: string;
}

// Modal.setAppElement("#root"); // 모달이 렌더링되는 컨테이너를 설정합니다.
interface FormData {
  pk: number;
  title: string;
  file_name: string;
  content: string;
}

const ModalButtonForUpdateStudyNoteContent: React.FC<
  ModalButtonForSearchStudyNoteContentProps
> = ({ pk, title, file_name, content, button_text }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toast = useToast();
  const { handleSubmit, register, formState, getValues } = useForm<FormData>();
  const [note_content_content, set_note_content_content] =
    useState<string>(content);
  const queryClient = useQueryClient();
  const [filePath, setFilePath] = useState(file_name);


  useEffect(() => {
    set_note_content_content(content)
  }, [content])

  const mutationForUpdateStudyNoteContent = useMutation(
    apiForUpdateStudyNoteContent,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          title: "update succes for study note content!",
          status: "success",
        });
        setModalIsOpen(false);
      },
      onError: (error: any) => {
        console.log("error.message : ", error.message);

        toast({
          title: "Error!",
          description: error.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const onSubmit = (formData: FormData) => {
    console.log(formData); // do something with the form data

    mutationForUpdateStudyNoteContent.mutate({
      pk: formData.pk,
      title: formData.title,
      file_name: formData.file_name,
      content: note_content_content,
    });
    setModalIsOpen(false);
    // onClose();
  };

  const handleContentChange = (value: string) => {
    set_note_content_content(value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "48%",
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

  const handleSrcButtonClick = () => {
    const { file_name } = getValues(); // 'title' 인풋의 값을 가져옴

    const srcIndex = file_name.indexOf("src");

    if (srcIndex !== -1) {
      const truncatedPath = file_name.substring(srcIndex);
      // alert("filePathFromInput : " + truncatedPath); // 콘솔에 로그 출력
      setFilePath(truncatedPath)
    }

  }

  // 2244
  return (
    <Box>
      <Button
        variant="outline"
        onClick={openModal}
        _hover={{ bg: "orange.100", color: "black" }}
      >
        {button_text}
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // overlayClassName="modal-overlay"
        style={customStyles}
      >
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <FormControl isInvalid={!!formState.errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>

                <Input
                  type="hidden"
                  id="pk"
                  value={pk}
                  {...register("pk", { required: true })}
                />

                <Input
                  id="title"
                  placeholder="Title"
                  defaultValue={title}
                  {...register("title", { required: true })}
                  // todo 현 인풋에서 엔터 누르면 submit 하도록
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // 기본 엔터 액션 취소
                      handleSubmit(onSubmit)();
                    }
                  }}
                />
                <FormErrorMessage>
                  {formState.errors.title?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors.file_name}>
                <FormLabel htmlFor="file">File
                  <Button
                    variant={"outline"}
                    size={"xs"}
                    ml={2}
                    onClick={handleSrcButtonClick}
                  >src</Button>
                </FormLabel>
                <Input
                  id="file"
                  type="text"
                  defaultValue={file_name}
                  {...register("file_name", { required: true })}
                  value={filePath}
                  onChange={(e) => setFilePath(e.target.value)}

                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault(); // 기본 엔터 액션 취소
                      handleSubmit(onSubmit)();
                    }
                  }}
                />
                <FormErrorMessage>
                  {formState.errors.file_name?.message}
                </FormErrorMessage>
              </FormControl>
            </HStack>

            <FormControl isInvalid={!!formState.errors.content}>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Box zIndex={9999}>
                <TinyMCEEditor
                  initialValue={note_content_content}
                  onChange={handleContentChange}
                  apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
                />
              </Box>
              <FormErrorMessage>
                {formState.errors.content?.message}
              </FormErrorMessage>
            </FormControl>

            <Flex justify="space-between" w="100%" mt={2}>
              <Button
                variant="outline"
                bg="purple.50"
                _hover={{ backgroundColor: "purple.100" }}
                w={"50%"}
                type="submit"
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                bg="purple.50"
                ml={2}
                _hover={{ backgroundColor: "purple.100" }}
                onClick={closeModal}
                w={"50%"}
              >
                Cancel
              </Button>
            </Flex>
          </form>
        </Box>

        {/* <button onClick={closeModal}>Close Modal</button> */}
      </Modal >
    </Box >
  );
};

export default ModalButtonForUpdateStudyNoteContent;
