import React, { useState } from "react";
import { Box, Text, Textarea, Button, Flex, Collapse, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForCreateCommentForSuggestionForBoard } from "../../apis/board_api";

interface IProps {
  suggestionId: number | string;
}

const CreateFormForCommentForSuggestionForBoard = ({
  suggestionId,
}: IProps) => {

  const toast = useToast();
  const queryClient = useQueryClient();

  const [isCommentOpen, setIsCommentOpen] = useState(true);
  const [comment, setComment] = useState(""); // 댓글 내용을 저장할 상태

  const toggleComment = () => {
    setIsCommentOpen(!isCommentOpen);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const mutationForAddCommentForSuggestionForBoard = useMutation(
    apiForCreateCommentForSuggestionForBoard,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "comment 추가",
          description: data.message,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["apiForGetCommentListForSuggestionForBoard"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const handleSubmitComment = () => {
    if (comment.trim() === "") {
      alert("댓글 내용을 입력하세요.");
      return;
    }
    mutationForAddCommentForSuggestionForBoard.mutate({
      suggestionId: suggestionId,
      content: comment,
    });
    setComment("");
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} m={2}>
        <Button size="sm" onClick={toggleComment}>
          {isCommentOpen ? "close" : "open"}
        </Button>
      </Box>

      <Collapse in={isCommentOpen} animateOpacity>
        <Flex>
          <Textarea
            placeholder="댓글을 입력하세요"
            size="sm"
            resize="vertical"
            flex="1"
            value={comment}
            onChange={handleCommentChange}
          />
          <Button ml={2} size="sm" onClick={handleSubmitComment}>
            submit
          </Button>
        </Flex>
      </Collapse>
    </Box>
  );
};

export default CreateFormForCommentForSuggestionForBoard;
