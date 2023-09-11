import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Table,
  Tr,
  Td,
  useToast,
} from "@chakra-ui/react";
import {
  apiForAddCommentForFaqBoardForNote,
  apiForGetCommentListForFaqBoardForNote,
} from "../../apis/study_note_api";
import CommentListForFaqBoard from "../Comments/CommentListForFaqBoard";

interface ModalForFAQDetailForNoteProps {
  isOpen: boolean;
  closeModal: () => void;
  faqData: FAQRow;
  refetchForGetQnABoardList: () => void;
}

const ModalForFAQDetailForNote: React.FC<ModalForFAQDetailForNoteProps> = ({
  isOpen,
  closeModal,
  faqData,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState(""); // 댓글 내용을 저장할 상태

  const {
    isLoading: isLoadingForGetComment,
    data: commentData,
    refetch: refetchForGetCommentData,
  } = useQuery<any>(
    ["apiForGetCommentListForFaqBoard", faqData.pk],
    apiForGetCommentListForFaqBoardForNote,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  // console.log("faqData.pk : ", faqData.pk);
  // console.log("commentData :::::::::: ", commentData);

  const mutationForAddCommentForFaqBoardForNote = useMutation(
    apiForAddCommentForFaqBoardForNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "comment 추가",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["apiForGetCommentListForFaqBoard"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (comment.trim() === "") {
      alert("댓글 내용을 입력하세요.");
      return;
    }
    mutationForAddCommentForFaqBoardForNote.mutate({
      faqPk: faqData.pk,
      content: comment,
    });
    setComment("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터 키를 눌렀을 때만 처리
    if (e.key === "Enter") {
      handleSubmitComment();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="7xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>FAQDetail</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box>
            <Table>
              <Tr>
                <Td>
                  <strong>Title:</strong>
                </Td>
                <Td>{faqData.title}</Td>
              </Tr>
              <Tr>
                <Td>
                  <strong>Content:</strong>
                </Td>
                <Td dangerouslySetInnerHTML={{ __html: faqData.content }}></Td>
              </Tr>
            </Table>
          </Box>

          <InputGroup mt={4}>
            <Input
              placeholder="댓글을 입력하세요..."
              value={comment}
              onChange={handleCommentChange}
              onKeyDown={handleKeyPress}
            />
            <InputRightElement width="auto" mr={1}>
              <Button
                colorScheme="blue"
                size="sm"
                onClick={handleSubmitComment}
              >
                댓글 추가
              </Button>
            </InputRightElement>
          </InputGroup>

          <CommentListForFaqBoard commentList={commentData?.comments} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForFAQDetailForNote;
