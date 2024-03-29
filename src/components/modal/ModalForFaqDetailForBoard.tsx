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
import CommentListForFaqBoardForBoard from "../Comments/CommentListForFaqBoardForBoard";
import { apiForGetCommentListForFaqForBoard } from "../../apis/board_api";
import TextAreaForCreateCommentForFaqForBoard from "../TextArea/TextAreaForCreateCommentForFaqForBoard";

interface Suggestion {
  pk: number;
  title: string;
  writer: {
    username: string;
    profile_image: any;
  };
  created_at_formatted: string;
  content: string | ""; // 내용 추가
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  faqId: string | number;
}

// 1122
const ModalForFaqDetailForBoard: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  faqId,
  title,
  content,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const {
    isLoading: isLoadingForGetComment,
    data: commentData,
    refetch: refetchForGetCommentData,
  } = useQuery<any>(
    ["apiForGetCommentListForFaqForBoard", faqId],
    apiForGetCommentListForFaqForBoard,
    {
      enabled: !!faqId, // suggestionPk가 존재할 때만 쿼리를 활성화
      // cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("commentData : ", commentData);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 댓글 내용이 변경될 때 상태 업데이트
    setComment(e.target.value);
  };

  // mutationForUpdateForCommentForSuggestionForBoard
  //   const mutationForAddCommentForSuggestionForNote = useMutation(
  //     apiForAddCommentForSuggestionForNote,
  //     {
  //       onMutate: () => {
  //         console.log("mutation starting");
  //       },
  //       onSuccess: (data) => {
  //         console.log("data : ", data);

  //         toast({
  //           title: "comment 추가 !!",
  //           description: data.message,
  //           status: "success",
  //           duration: 2000,
  //           isClosable: true,
  //         });
  //         queryClient.refetchQueries(["apiForGetCommentListForSuggestion"]);
  //       },
  //       onError: (error: any) => {
  //         console.log("error.response : ", error);
  //         console.log("mutation has an error", error.response.data);
  //       },
  //     }
  //   );

  const handleSubmitComment = () => {
    // 댓글을 제출하는 함수
    if (comment.trim() === "") {
      alert("댓글 내용을 입력하세요.");
      return;
    }
    // alert(comment)
    // mutationForAddCommentForSuggestionForNote.mutate({
    //   suggestionPk: suggestion.pk,
    //   content: comment,
    // });
    setComment("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody style={{ height: "40%" }}>
          <Box>
            <Box
              dangerouslySetInnerHTML={{ __html: content }}
              style={{ minHeight: "200px", border: "1px solid gray" }}
            ></Box>
            {/* 댓글 추가용 인풋 */}
            <TextAreaForCreateCommentForFaqForBoard faqId={faqId} />
            
            <CommentListForFaqBoardForBoard
              commentList={commentData?.comments}
            />
          </Box>
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

export default ModalForFaqDetailForBoard;
