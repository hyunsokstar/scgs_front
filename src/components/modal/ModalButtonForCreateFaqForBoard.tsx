import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  Input,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import TinyMCEEditor from "../RichEditor/TinyMCEEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreateFaqForBoard } from "../../apis/board_api";

type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "5xl" | "full"; // ModalSize 타입 정의

interface ModalButtonProps {
  modal_size: ModalSize;
  modal_title: string;
  button_text: string;
}

function ModalButtonForCreateFaqForBoard({
  modal_size,
  modal_title,
  button_text,
}: ModalButtonProps) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // ChangeEvent<HTMLInputElement>를 사용하여 타입 설정
    setTitle(e.target.value);
  };

  const handleContentChange = (newContent: string) => {
    // 타입을 문자열로 설정
    setContent(newContent);
  };

  const mutationForCreateSuggestionForBoard = useMutation(
    apiForCreateFaqForBoard,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetSuggestionListForFaq"]);

        toast({
          title: "건의 사항 추가 성공",
          description: data.message,
          status: "success",
          duration: 1800,
          isClosable: true,          
        });
        setTitle("");
        setContent("");

        setIsOpen(false);
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleSubmit = () => {
    console.log(title, content);

    mutationForCreateSuggestionForBoard.mutate({
      title: title,
      content: content,
    });
  };

  return (
    <>
      <Button variant="outline" borderColor="black" onClick={handleOpenModal}>
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalBody>
            <Input
              placeholder="제목"
              value={title}
              onChange={handleTitleChange}
              mb={2}
            />
            <Box marginBottom="1">
              <Box style={{ zIndex: 9999 }}>
                <TinyMCEEditor
                  onChange={handleContentChange}
                  apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
                />
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              제출
            </Button>
            <IconButton
              icon={<CloseIcon />}
              onClick={handleCloseModal}
              aria-label={""}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalButtonForCreateFaqForBoard;
