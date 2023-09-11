import React from "react";
import { Box, Text, Textarea, Button } from "@chakra-ui/react";

interface IProps {
    suggestionId: number | string;
}

const CreateFormForCommentForSuggestionForBoard = ({suggestionId}: IProps) => {
  return (
    <Box>
      id check: {suggestionId}
      <Text fontSize="lg" fontWeight="bold">
        댓글
      </Text>
      <Textarea placeholder="댓글을 입력하세요" size="sm" resize="vertical" />
      <Button mt={2} size="sm">
        댓글 달기
      </Button>
    </Box>
  );
};

export default CreateFormForCommentForSuggestionForBoard;
