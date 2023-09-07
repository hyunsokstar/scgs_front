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

  const handleSaveClick = (index: number) => {
    // Add logic to save the comment here, using editedContent.
    setEditingIndex(null);
    // You can perform any necessary cleanup or actions after saving.
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    // Add logic to handle canceling the edit, such as resetting editedContent.
  };

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
                  <Tooltip label={editingIndex === index ? "저장" : "수정"}>
                    <IconButton
                      icon={
                        editingIndex === index ? (
                          <CheckIcon boxSize={6} />
                        ) : (
                          <EditIcon boxSize={6} />
                        )
                      }
                      size="sm"
                      aria-label={
                        editingIndex === index ? "Save Comment" : "Edit Comment"
                      }
                      onClick={() => {
                        if (editingIndex === index) {
                          handleSaveClick(index);
                        } else {
                          handleEditClick(index, comment.content);
                        }
                      }}
                      mr={2} // Increase spacing between icons
                    />
                  </Tooltip>

                  {editingIndex === null ? (
                    <Tooltip label="삭제">
                      <IconButton
                        icon={<DeleteIcon boxSize={6} />}
                        size="sm"
                        aria-label="Delete Comment"
                        onClick={() => {
                          // Add logic to delete the comment here.
                        }}
                      />
                    </Tooltip>
                  ) : null}

                  {editingIndex === index ? (
                    <Tooltip label="취소">
                      <IconButton
                        icon={<CloseIcon boxSize={6} />}
                        size="sm"
                        aria-label="Cancel Edit"
                        onClick={handleCancelClick}
                      />
                    </Tooltip>
                  ) : null}
                </Box>
              </Flex>
              <Text fontSize="sm" color="gray.500" mt={2}> {/* Add margin to separate comments */}
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
