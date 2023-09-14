import React, { useState } from "react";
import { Box, Heading } from "@chakra-ui/react"; // Heading 컴포넌트 추가
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiForGetChallengeList } from "../apis/challenge_api";
import ListForChallege from "../components/List/ListForChalleges";
import { ITypeForChallengeData } from "../types/type_for_challenge";

interface Props {}

const ChallengesPage = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isLoadingForGetChallenge,
    data: dataForChallenge = { listForChallenge: [] },
    refetch: refetchForGetChallenge,
  } = useQuery<ITypeForChallengeData>(
    ["apiForGetChallengeList", pageNum],
    apiForGetChallengeList,
    {
      enabled: true,
      cacheTime: 0,
    }
  );

  console.log("dataForChallenge : ", dataForChallenge);

  return (
    <Box>
      <Heading as="h1" textAlign="center" fontSize="2xl" mb={4}>
        Challenges
      </Heading>
      <ListForChallege challengeList={dataForChallenge.listForChallenge} />
    </Box>
  );
};

export default ChallengesPage;
