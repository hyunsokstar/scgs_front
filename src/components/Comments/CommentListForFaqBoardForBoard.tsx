import React, { useState } from "react";
import {
  Avatar,
  Box,
  Text,
  Flex,
  IconButton,
  Spacer,
  Tooltip,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { apiForDeleteForCommentForFaqForBoard, apiForUpdateCommentForFaqForBoard } from "../../apis/board_api";

interface Comment {
  id:number;
  writer: {
    username: string;
    profile_image: any;
  };
  content: string;
  created_at: string;
}

interface IProps {
  commentList: Comment[];
}

const CommentListForFaqBoardForBoard: React.FC<IProps> = ({ commentList }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const handleEditClick = (index: number, content: string) => {
    if (editingIndex === null) {
      setEditingIndex(index);
      setEditedContent(content);
    } else {
      // 이미 수정 중인 댓글이 있으면 그것을 먼저 완료하도록 합니다.
      // 여기에 필요한 로직을 추가하세요.
    }
  };

  // mutationForUpdateCommentForFaqForBoard
  const mutationForUpdateCommentForFaqForBoard = useMutation(
    apiForUpdateCommentForFaqForBoard,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["apiForGetCommentListForFaqForBoard"]);

        toast({
          status: "success",
          title: "check result update success",
          description: result.message,
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  const handleSaveClick = (index: number, commentId: any) => {
    // alert(commentId);

    // mutationForUpdateCommentForSuggestion
    mutationForUpdateCommentForFaqForBoard.mutate({
      commentId: commentId,
      editedContent,
    });

    setEditingIndex(null);
    setEditedContent("");
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditedContent("");
  };

  // mutationForDeleteCommentForFaqForBoard
  const mutationForDeleteCommentForFaqForBoard = useMutation(
    (faqId: string | number) => {
      // apiForDeleteForCommentForFaqForBoard
      return apiForDeleteForCommentForFaqForBoard(faqId);
    },
    {
      onSettled: () => {
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetCommentListForFaqForBoard"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
          description: data.message,
          duration: 1800,
          isClosable: true,
        });
      },
      onError: (error: any) => {
        console.log("error : ", error);

        toast({
          title: "Error!",
          description: error.response.data.message || "An error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const handlerForCommentDeleteButton = (commentId: string | number) => {
    // alert(commentId);
    mutationForDeleteCommentForFaqForBoard.mutate(commentId);
  };

  // 2244
  return (
    <Box mt={4}>
      {commentList ? (
        commentList.map((comment, index) => (
          <Flex key={index} alignItems="center">
            <Avatar
              name={comment.writer.username}
              src={comment.writer.profile_image || ""}
              size="md"
            />
            <Box ml={2} width="100%">
              {editingIndex === index ? (
                <Flex alignItems="center">
                  <Textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    size="sm"
                    flex="1"
                    marginRight="4px" // 수정 버튼과의 간격
                  />
                  <IconButton
                    icon={<CheckIcon color="green.500" boxSize={6} />} // 체크 아이콘의 색상을 초록색으로, 크기를 조절합니다.
                    size="sm"
                    aria-label="Save Comment"
                    onClick={() => handleSaveClick(index, comment.id)}
                    marginRight="4px"
                  />
                  <IconButton
                    icon={<CloseIcon color="orange.500" boxSize={6} />} // 취소 아이콘의 색상을 주황색으로, 크기를 조절합니다.
                    size="sm"
                    aria-label="Cancel Edit"
                    onClick={handleCancelClick}
                  />
                </Flex>
              ) : (
                <>
                  <Text>{comment.content}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {comment.created_at}
                  </Text>
                </>
              )}
            </Box>
            <Spacer />
            {editingIndex === index ? null : ( // 수정 중일 때는 삭제 버튼 숨기기
              <Tooltip label="수정">
                <IconButton
                  icon={<EditIcon />}
                  size="sm"
                  aria-label="Edit Comment"
                  marginRight="4px" // 수정 버튼과의 간격
                  onClick={() => handleEditClick(index, comment.content)}
                />
              </Tooltip>
            )}
            {editingIndex === index ? null : ( // 수정 중일 때는 삭제 버튼 숨기기
              <Tooltip label="삭제">
                <IconButton
                  icon={<DeleteIcon />}
                  size="sm"
                  aria-label="Delete Comment"
                  onClick={() => handlerForCommentDeleteButton(comment.id)}
                />
              </Tooltip>
            )}
          </Flex>
        ))
      ) : (
        <Text>FAQ에 대한 댓글이 없습니다.</Text>
      )}
    </Box>
  );
};

export default CommentListForFaqBoardForBoard;
