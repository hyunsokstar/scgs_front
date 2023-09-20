import React, { useState } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Button,
  Stack,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiForGetSurveyList } from "../apis/survey_api";
import ListForSurvey from "../components/List/ListForSurvey";

interface Props {}

const SurveyPage = (props: Props) => {
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: loadingForSuveryList,
    data: dataForSurveyList,
    refetch: refetchForSurveyListData,
  } = useQuery<any>(["apiForGetSurveyList", pageNum], apiForGetSurveyList, {
    enabled: true,
    cacheTime: 0, // 캐싱 비활성화
  });

  if (dataForSurveyList) {
    console.log("dataForSurveyList : ", dataForSurveyList);
  }

  return (
    <Box p={4}>
      <Center>
        <Box textAlign="center" p={3}>
          <Text fontSize="4xl" fontWeight="bold" mb={3}>
            Survey
          </Text>
        </Box>
      </Center>

      <VStack spacing={4}>
        {dataForSurveyList ? (
          <ListForSurvey surveys={dataForSurveyList} />
        ) : (
          "no data"
        )}
      </VStack>
    </Box>
  );
};

export default SurveyPage;
