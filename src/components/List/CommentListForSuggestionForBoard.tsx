import React, { useState } from "react";
import {
  List,
  ListItem,
  Flex,
  Avatar,
  Text,
  IconButton,
  Spacer,
  Box,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  apiForDeleteCommentForSuggestionForBoard,
  apiForUpdateCommentForSuggestionForBoard,
} from "../../apis/board_api";

interface Comment {
  id: number;
  writer: {
    pk: number;
    username: string;
    profile_image: any;
  };
  content: string;
  created_at: string;
}

interface CommentListProps {
  commentList: Comment[];
}

const CommentListForSuggestionForBoard: React.FC<CommentListProps> = ({
  commentList,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const handleEditClick = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditedContent(content);
  };

  const mutationForUpdateCommentForSuggestinForBoard = useMutation(
    apiForUpdateCommentForSuggestionForBoard,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries([
          "apiForGetCommentListForSuggestionForBoard",
        ]);

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

  const handleConfirmClick = (commentId: number) => {
    // 여기에서 수정 내용을 서버로 보내고 업데이트 로직을 추가해야 합니다.
    // 서버 요청을 보내는 코드를 작성해주세요.
    mutationForUpdateCommentForSuggestinForBoard.mutate({
      id: commentId,
      editedContent,
    });

    setEditedContent("");
    setEditingCommentId(null);
  };

  const handleCancelClick = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  // mutationForDeleteCommentForSuggestionForBoard
  const mutationForDeleteCommentForSuggestionForBoard = useMutation(
    (id: string | number) => {
      return apiForDeleteCommentForSuggestionForBoard(id);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries([
          "apiForGetCommentListForSuggestionForBoard",
        ]);

        toast({
          // title: "delete comment 성공!",
          status: "success",
          description: data.message,
          duration: 1800,
          isClosable: true,
        });
      },
      onError: (error: any) => {
        console.log("error : ", error.response.data.message);
        
        toast({
          status: "error",
          description: error.response.data.message, // 에러 메시지 출력
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  const handleDelete = (id: number) => {
    mutationForDeleteCommentForSuggestionForBoard.mutate(id);
  };

  return (
    <Box>
      {commentList.length === 0 ? (
        <Text>댓글이 없습니다</Text>
      ) : (
        <List spacing={2}>
          {commentList.map((comment) => (
            <ListItem
              key={comment.id}
              // borderWidth="1px"
              borderRadius="lg"
              p={2}
            >
              <Flex alignItems="center">
                <Box>
                  <Avatar
                    name={comment.writer.username}
                    src={comment.writer.profile_image}
                    size="sm"
                  />
                </Box>
                {editingCommentId === comment.id ? (
                  <Textarea
                    flex="3"
                    pl={2}
                    fontSize="lg"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    mx={2}
                  />
                ) : (
                  <Text flex="3" pl={2} fontSize="lg" textAlign={"center"}>
                    {comment.content}
                  </Text>
                )}
                {editingCommentId === comment.id ? "" : <Spacer />}
                <Text fontSize="sm">{comment.created_at}</Text>
                {editingCommentId === comment.id ? (
                  <>
                    <IconButton
                      aria-label="Confirm"
                      icon={<CheckIcon />}
                      ml={2}
                      onClick={() => handleConfirmClick(comment.id)}
                    />
                    <IconButton
                      aria-label="Cancel"
                      icon={<CloseIcon />}
                      ml={2}
                      onClick={handleCancelClick}
                    />
                  </>
                ) : (
                  <>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      ml={2}
                      onClick={() =>
                        handleEditClick(comment.id, comment.content)
                      }
                    />
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      ml={2}
                      onClick={() => handleDelete(comment.id)} // 이 부분에 삭제 핸들러 함수 호출
                    />
                  </>
                )}
              </Flex>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CommentListForSuggestionForBoard;
