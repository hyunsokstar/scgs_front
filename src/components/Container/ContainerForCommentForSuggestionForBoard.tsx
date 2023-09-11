import React from "react";
import { Box, Text, Textarea, Button, Divider } from "@chakra-ui/react";
import CreateFormForCommentForSuggestionForBoard from "../Form/CreateFormForCommentForSuggestionForBoard";
import { apiForGetCommentListForSuggestionForBoard } from "../../apis/board_api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITypeForCommentListForSuggestionForBoard } from "../../types/board_type";
import CommentListForSuggestionForBoard from "../List/CommentListForSuggestionForBoard";

interface IProps {
  suggestionId: string | number;
}

const ContainerForCommentForSuggestionForBoard = ({ suggestionId }: IProps) => {
  const {
    isLoading: isLoadingForGetComment,
    data: commentData,
    refetch: refetchForGetCommentData,
  } = useQuery<ITypeForCommentListForSuggestionForBoard>(
    ["apiForGetCommentListForSuggestionForBoard", suggestionId],
    apiForGetCommentListForSuggestionForBoard,
    {
      enabled: !!suggestionId, // suggestionPk가 존재할 때만 쿼리를 활성화
      // cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("commentData : ", commentData);

  return (
    <Box>
      <CreateFormForCommentForSuggestionForBoard suggestionId={suggestionId} />
      <Divider my={1} /> {/* 여기서 my는 위아래 마진을 지정합니다. */}
      {commentData ? (
        <CommentListForSuggestionForBoard commentList={commentData.comments} />
      ) : (
        "no data"
      )}
    </Box>
  );
};

export default ContainerForCommentForSuggestionForBoard;
