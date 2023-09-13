import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import { apiForCreateCommentForFaqForBoard } from "../../apis/board_api";
interface TextAreaProps {
  faqId: string | number;
}

const TextAreaForCreateCommentForFaqForBoard: React.FC<TextAreaProps> = ({
  faqId,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitComment();
    }
  };

  // mutationForCreateCommentForFaqForBoard
  const mutationForCreateCommentForFaqForBoard = useMutation(
    apiForCreateCommentForFaqForBoard,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "comment 추가 for faq",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["apiForGetCommentListForFaqForBoard"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleSubmitComment = () => {
    console.log(`Add comment for FAQ ID: ${faqId}, Comment: ${comment}`);
    mutationForCreateCommentForFaqForBoard.mutate({
      faqId: faqId,
      content: comment,
    });
    setComment("");
  };

  return (
    <InputGroup mt={4}>
      <Input
        placeholder="댓글을 입력하세요..."
        value={comment}
        onChange={handleCommentChange}
        onKeyDown={handleKeyPress}
      />
      <InputRightElement width="auto" mr={1}>
        <Button colorScheme="blue" size="sm" onClick={handleSubmitComment}>
          댓글 추가
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default TextAreaForCreateCommentForFaqForBoard;
