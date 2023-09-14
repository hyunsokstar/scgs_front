import React, { useState } from "react";
import ListForSuggestionForBoard from "../components/List/ListForSuggestionForBoard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiForGetSuggestionListForBoard } from "../apis/board_api";
import { ITypeForDataForSuggestions } from "../types/board_type";
import PaginationComponent from "../components/PaginationComponent";
import ModalButtonForCreateSuggestionForBoard from "../components/modal/ModalButtonForCreateSuggestionForBoard";
import { Box } from "@chakra-ui/react";

// 1122
const SuggestionBoardPage = () => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isLoadingForGetsuggestion,
    data: dataForSuggestions,
    refetch: refetchForGetsuggestion,
  } = useQuery<ITypeForDataForSuggestions>(
    ["apiForGetSuggestionListForBoard", pageNum],
    apiForGetSuggestionListForBoard,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );


  console.log("dataForSuggestions : ", dataForSuggestions);

  // 2244
  return (
    <div>
      <h1>제안 게시판</h1>

      {/* 건의사항 추가 버튼 추가 , 모달 컴퍼넌트로 추가 해야 됨 컴퍼넌트 이름 ModalButtonForCreateSuggestionForBoard */}
      <Box display="flex" justifyContent="right" m={2}>
        <ModalButtonForCreateSuggestionForBoard
          modal_title={"건의 사항"}
          modal_size={"5xl"}
          button_text="건의 추가"
        />
      </Box>

      {dataForSuggestions ? (
        <ListForSuggestionForBoard
          suggestions={
            dataForSuggestions ? dataForSuggestions.listForSuggestion : []
          }
        />
      ) : (
        "no suggestions"
      )}

      {dataForSuggestions ? (
        <PaginationComponent
          current_page_num={pageNum}
          setCurrentPageNum={setPageNum}
          total_page_num={dataForSuggestions.totalCountForSuggestionList}
          task_number_for_one_page={dataForSuggestions.perPage}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SuggestionBoardPage;
