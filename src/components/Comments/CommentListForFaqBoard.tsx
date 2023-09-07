import React from "react";
import {
  Avatar,
  Box,
  Text,
  Flex,
  IconButton,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface Comment {
  writer: {
    username: string;
    profile_image: string | null;
  };
  content: string;
  created_at: string;
}

interface Comment {
    commentList: Comment[];
}

interface CommentListForFaqBoardProps {
    commentList: Comment;
}

const CommentListForFaqBoard: React.FC<CommentListForSuggestionProps> = ({
    commentList,
}) => {
  if (!commentList) {
    return <Box>no comments</Box>;
  }

  return (
    <Box mt={4}>
      {commentList.map((comment, index) => (
        <Flex key={index} alignItems="center">
          <Avatar
            name={comment.writer.username}
            src={comment.writer.profile_image || ""}
            size="md"
          />
          <Box ml={2}>
            <Text fontWeight="bold">{comment.writer.username}</Text>
            <Text>{comment.content}</Text>
            <Text fontSize="sm" color="gray.500">
              {comment.created_at}
            </Text>
          </Box>
          <Spacer />
          {/* 수정 및 삭제 아이콘 */}
          <Tooltip label="수정">
            <IconButton
              icon={<EditIcon />}
              size="sm"
              aria-label="Edit Comment"
              mr={2}
              onClick={() => {
                // 수정 로직을 추가하세요.
              }}
            />
          </Tooltip>
          <Tooltip label="삭제">
            <IconButton
              icon={<DeleteIcon />}
              size="sm"
              aria-label="Delete Comment"
              onClick={() => {
                // 삭제 로직을 추가하세요.
              }}
            />
          </Tooltip>
        </Flex>
      ))}
    </Box>
  );
};

export default CommentListForFaqBoard;
