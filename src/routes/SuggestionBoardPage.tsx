import React, { useState } from "react";
import ListForSuggestionBoard from "../components/List/ListForSuggestionBoard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiForGetSuggestionListForBoard } from "../apis/board_api";
import { TypeForSuggestionsForBoard } from "../types/board_type";

// const suggestions: Suggestion[] = [
//   {
//     id: 1,
//     title: "첫 번째 제안",
//     author: "사용자1",
//     createdAt: "2023-09-10 10:00",
//   },
//   {
//     id: 2,
//     title: "두 번째 제안",
//     author: "사용자2",
//     createdAt: "2023-09-10 11:30",
//   },
//   {
//     id: 3,
//     title: "세 번째 제안",
//     author: "사용자3",
//     createdAt: "2023-09-10 14:15",
//   },
// ];

// 1122
const SuggestionBoardPage = () => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isLoadingForGetsuggestion,
    data: suggestionData,
    refetch: refetchForGetsuggestion,
  } = useQuery<TypeForSuggestionsForBoard>(
    ["apiForGetSuggestionListForBoard", pageNum],
    apiForGetSuggestionListForBoard,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("suggestionData : ", suggestionData);

  // 2244
  return (
    <div>
      <h1>제안 게시판</h1>
      <ListForSuggestionBoard suggestions={suggestionData} />
    </div>
  );
};

export default SuggestionBoardPage;
