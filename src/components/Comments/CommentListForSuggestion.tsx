import React, { useState } from "react";
import {
  Avatar,
  Box,
  Text,
  Flex,
  IconButton,
  Tooltip,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteCommentForSuggestion, apiForUpdateCommentForSuggestion } from "../../apis/study_note_api";

interface Comment {
  writer: {
    username: string;
    profile_image: string | null;
  };
  content: string;
  created_at: string;
}

interface CommentListForSuggestionProps {
  commentList: Comment[];
}

const CommentListForSuggestion: React.FC<CommentListForSuggestionProps> = ({
  commentList,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const handleEditClick = (index: number, content: string) => {
    if (editingIndex === null) {
      setEditingIndex(index);
      setEditedContent(content);
    } else {
      // Add logic to handle when there's already an editing comment.
    }
  };

  // mutationForUpdateChallengeRef
  const mutationForUpdateCommentForSuggestion = useMutation(
    // apiForUpdateChallengeRef
    apiForUpdateCommentForSuggestion,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        // apiForGetChallengeRefsList
        queryClient.refetchQueries(["apiForGetCommentListForSuggestion"]);

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

  const handleSaveClick = (index: number, commentId: string | number) => {
    // Add logic to save the comment here, using editedContent.
    setEditingIndex(null);

    // mutationForUpdateCommentForSuggestion
    mutationForUpdateCommentForSuggestion.mutate({
      commentPk: commentId,
      editedContent,
    });
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    // Add logic to handle canceling the edit, such as resetting editedContent.
  };

  // mutationForDeleteCommentForSuggestion
  const mutationForDeleteCommentForSuggestion = useMutation(
    (pk: string | number) => {
      // return deleteOneCommentForTaskByPkApi(pk);
      return apiForDeleteCommentForSuggestion(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetCommentListForSuggestion"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
          description: data.message,
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  const handlerForCommentDeleteButton = (commentPk: string | number) => {
    alert(commentPk);
    mutationForDeleteCommentForSuggestion.mutate(commentPk);
  };

  // 1122
  return (
    <Box mt={4}>
      {commentList ? (
        commentList.map((comment, index) => (
          <Flex key={index} alignItems="center" mb={4}>
            <Avatar
              name={comment.writer.username}
              src={comment.writer.profile_image || ""}
              size="md"
            />
            <Box ml={4} width="100%" flexGrow={1}>
              <Flex alignItems="center" justifyContent="space-between">
                <Box flexBasis="85%">
                  {editingIndex === index ? (
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      size="sm"
                      flex="1"
                      minH="70px" // Adjust the minimum height as needed
                    />
                  ) : (
                    <Text>{comment.content}</Text>
                  )}
                </Box>
                <Box>
                  {editingIndex === index ? (
                    <Tooltip label="저장">
                      <IconButton
                        icon={<CheckIcon boxSize={6} color="green.500" />}
                        size="sm"
                        aria-label="Save Comment"
                        onClick={() => handleSaveClick(index, comment.id)}
                        mr={2}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip label="수정">
                      <IconButton
                        icon={<EditIcon boxSize={6} color="green.500" />}
                        size="sm"
                        aria-label="Edit Comment"
                        onClick={() => handleEditClick(index, comment.content)}
                        mr={2}
                      />
                    </Tooltip>
                  )}

                  {editingIndex === null ? (
                    <Tooltip label="삭제">
                      <IconButton
                        icon={<DeleteIcon boxSize={6} color="red.500" />}
                        size="sm"
                        aria-label="Delete Comment"
                        onClick={() => handlerForCommentDeleteButton(comment.id)}
                      />
                    </Tooltip>
                  ) : null}

                  {editingIndex === index ? (
                    <Tooltip label="취소">
                      <IconButton
                        icon={<CloseIcon boxSize={6} color="orange.500" />}
                        size="sm"
                        aria-label="Cancel Edit"
                        onClick={handleCancelClick}
                      />
                    </Tooltip>
                  ) : null}
                </Box>
              </Flex>
              <Text fontSize="sm" color="gray.500" mt={2}>
                {comment.created_at}
              </Text>
            </Box>
          </Flex>
        ))
      ) : (
        <Text>댓글이 없습니다.</Text>
      )}
    </Box>
  );
};

export default CommentListForSuggestion;
