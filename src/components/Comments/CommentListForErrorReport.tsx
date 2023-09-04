import React, { useState } from "react";
import {
  VStack,
  HStack,
  Input,
  Button,
  Box,
  Avatar,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";

function CommentListForErrorReport({ report }) {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    alert(newComment);
  };

  return (
    <VStack p={0} bgColor={"blue.50"}>
      <HStack mt={0} width={"100%"}>
        <Input
          placeholder="댓글 추가"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleCommentSubmit}>
          추가
        </Button>
      </HStack>

      {report.comments && report.comments.length > 0 ? (
        <Box width="100%">
          {report.comments.map((comment) => (
            <HStack
              key={comment.pk}
              p={2}
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              align="center"
              justify="space-between"
            >
              <Avatar
                size="md"
                name={comment.writer.username}
                src={comment.writer.profile_image}
              />
              <Text>{comment.content}</Text>
              <Text>{comment.created_at_formatted}</Text>
              <IconButton
                size="sm"
                colorScheme="red"
                aria-label="삭제"
                icon={<DeleteIcon />}
              />
            </HStack>
          ))}
        </Box>
      ) : (
        <Text>No comments</Text>
      )}
    </VStack>
  );
}

export default CommentListForErrorReport;
