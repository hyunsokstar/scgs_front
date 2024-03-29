import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react"; // Heading 컴포넌트 추가
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiForGetChallengeList } from "../apis/challenge_api";
import ListForChallege from "../components/List/ListForChalleges";
import { ITypeForChallengeData } from "../types/type_for_challenge";
import PaginationComponent from "../components/PaginationComponent";
import ModalButtonForCreateChallenge from "../components/modal/ModalButtonForCreateChallenge";

interface Props {}

const ChallengesPage = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isLoadingForGetChallenge,
    data: dataForChallenge,
    refetch: refetchForGetChallenge,
  } = useQuery<ITypeForChallengeData>(
    ["apiForGetChallengeList", pageNum],
    apiForGetChallengeList,
    {
      enabled: true,
      cacheTime: 0,
    }
  );

  return (
    <Box>
      <Heading as="h1" textAlign="center" fontSize="5xl" my={3}>
        Challenges
      </Heading>

      <Box display={"flex"} justifyContent={"flex-end"} my={2}>
        <ModalButtonForCreateChallenge />
      </Box>

      <ListForChallege
        challengeList={
          dataForChallenge ? dataForChallenge?.listForChallenge : []
        }
      />

      {dataForChallenge ? (
        <PaginationComponent
          current_page_num={pageNum}
          setCurrentPageNum={setPageNum}
          total_page_num={dataForChallenge.totalCountForChallengeList}
          task_number_for_one_page={dataForChallenge.perPage}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default ChallengesPage;
