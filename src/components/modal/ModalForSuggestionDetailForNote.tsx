import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CommentListForSuggestion from "../Comments/CommentListForSuggestion";
import { apiForAddCommentForSuggestionForNote, apiForGetCommentListForSuggestionForNote } from "../../apis/study_note_api";


interface Suggestion {
  pk: number;
  title: string;
  writer: {
    username: string;
    profile_image: string | null;
  };
  created_at_formatted: string;
  content: string | ""; // 내용 추가
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestion: Suggestion | "";
  title: string;
  content: string;
  suggestionPk: string | number;
}

// 1122
const ModalForSuggestionDetailForNote: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  suggestion,
  suggestionPk,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState(""); // 댓글 내용을 저장할 상태

  const {
    isLoading: isLoadingForGetComment,
    data: commentData,
    refetch: refetchForGetCommentData,
  } = useQuery<any>(
    ["apiForGetCommentListForSuggestion", suggestionPk],
    apiForGetCommentListForSuggestionForNote,
    {
      enabled: !!suggestionPk, // suggestionPk가 존재할 때만 쿼리를 활성화
      // cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("commentData : ", commentData);


  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 댓글 내용이 변경될 때 상태 업데이트
    setComment(e.target.value);
  };

  // mutationForUpdateCommentForFaq
  const mutationForAddCommentForSuggestionForNote = useMutation(
    apiForAddCommentForSuggestionForNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "comment 추가 !!",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["apiForGetCommentListForSuggestion"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleSubmitComment = () => {
    // 댓글을 제출하는 함수
    if (comment.trim() === "") {
      alert("댓글 내용을 입력하세요.");
      return;
    }
    // alert(comment)
    mutationForAddCommentForSuggestionForNote.mutate({
      suggestionPk: suggestion.pk,
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
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{suggestion.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ height: "40%" }}>
          {/* 내용 */}
          <Box
            dangerouslySetInnerHTML={{ __html: suggestion.content }}
            style={{ minHeight: "200px", border: "1px solid gray" }}
          ></Box>
          {/* 댓글 추가 인풋 */}
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

          <CommentListForSuggestion commentList={commentData?.comments} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForSuggestionDetailForNote;
