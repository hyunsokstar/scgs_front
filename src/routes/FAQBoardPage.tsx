import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Center, Heading, Spacer } from "@chakra-ui/react"; // Spacer 추가
import { ITypeForDataForFaq } from "../types/board_type";
import { apiForGetFaqListForBoard } from "../apis/board_api";
import ListForFaqForBoard from "../components/List/ListForFaqForBoard";
import ModalButtonForClassRoomListForStudyNote from "../components/modal/ModalButtonForClassRoomListForStudyNote";
import ModalButtonForCreateFaqForBoard from "../components/modal/ModalButtonForCreateFaqForBoard";

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
      <Center>
        <Heading as="h1" size="2xl" mt={8} mb={4}>
          {" "}
          {/* 크기를 2xl로 변경, 간격 추가 */}
          Faq Board
        </Heading>
      </Center>
      <Box display={"flex"} justifyContent={"right"} >
        <ModalButtonForCreateFaqForBoard
          modal_size={"5xl"}
          modal_title={"faq 추가"}
          button_text={"create faq"}
        />
      </Box>
      <Spacer mt={4} /> {/* 리스트 위의 간격 추가 */}
      <ListForFaqForBoard faqList={dataForFaq?.listForFaqBoard || []} />
    </Box>
  );
};

export default FAQBoardPage;
