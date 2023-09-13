import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box } from "@chakra-ui/react";
import { ITypeForDataForFaq } from "../types/board_type";
import { apiForGetFaqListForBoard } from "../apis/board_api";
import ListForFaqForBoard from "../components/List/ListForFaqForBoard";

interface Props {}

const FAQBoardPage = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isLoadingForFaqData,
    data: dataForFaq,
    refetch: refetchForGetsuggestion,
  } = useQuery<ITypeForDataForFaq>(
    ["apiForGetSuggestionListForFaq", pageNum],
    apiForGetFaqListForBoard,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("dataForFaq : ", dataForFaq);

  return (
    <Box>
      <ListForFaqForBoard faqList={dataForFaq?.listForFaqBoard || []} />
    </Box>
  );
};

export default FAQBoardPage;
