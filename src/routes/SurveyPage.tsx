import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Text,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiForGetSurveyList, apiForSearchSurveyListBySearchWords } from "../apis/survey_api";
import ListForSurvey from "../components/List/ListForSurvey";
import ModalButtonForCreateSurvey from "../components/modal/ModalButtonForCreateSurvey";
import {
  ISurveyRow,
  ITypeForDataForSurveyList,
} from "../types/type_for_survey";
import PaginationComponent from "../components/PaginationComponent";

interface Props {}

const SurveyPage = (props: Props) => {
  const toast = useToast();
  const [pageNum, setPageNum] = useState(1);
  // step 11
  const [surveyList, setSurveyList] = useState<ISurveyRow[]>();
  const [searchWords, setsearchWords] = useState("");

  const {
    isLoading: loadingForSuveryList,
    data: dataForSurveyList,
    refetch: refetchForSurveyListData,
  } = useQuery<ITypeForDataForSurveyList>(
    ["apiForGetSurveyList", pageNum],
    apiForGetSurveyList,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  if (dataForSurveyList) {
    console.log("dataForSurveyList : ", dataForSurveyList);
  }

  const mutationForSurveyListBySearchWords = useMutation(
    apiForSearchSurveyListBySearchWords,
    {
      onSuccess: (result: any) => {
        console.log("result for search: ", result);
        setSurveyList(result.data);

        toast({
          status: "success",
          title: "search faq list !!",
          description: result.message,
        });
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const handleSearch = () => {
    console.log("handleSearch check : ", searchWords);
    mutationForSurveyListBySearchWords.mutate({
      searchWords,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearchWord = (searchWords: string) => {
    // console.log("handleSearchWord searchWords : ", searchWords);
    setsearchWords(searchWords);
  };

  
  // step 22
  useEffect(() => {
    if (dataForSurveyList) {
      setSurveyList(dataForSurveyList?.listForSurvey);
    }
  }, [dataForSurveyList]);

  // 2244
  return (
    <Box p={4}>
      <Center>
        <Box textAlign="center" p={3}>
          <Text fontSize="4xl" fontWeight="bold" mb={3}>
            Survey
          </Text>
        </Box>
      </Center>

      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        flexDirection={"column"}
        gap={2}
        mb={2}
      >
        <ModalButtonForCreateSurvey />

        <InputGroup>
          <Input
            placeholder="Search..."
            value={searchWords}
            onChange={(e) => handleSearchWord(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <InputRightElement width="auto" mr={1}>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => {
                handleSearch();
              }}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>

      {/* step 33 */}
      <VStack spacing={4}>
        {dataForSurveyList ? (
          <ListForSurvey surveys={surveyList ? surveyList : []} />
        ) : (
          "no data"
        )}

        {dataForSurveyList ? (
          <PaginationComponent
            current_page_num={pageNum}
            setCurrentPageNum={setPageNum}
            total_page_num={dataForSurveyList?.totalCountForSurveyList}
            task_number_for_one_page={dataForSurveyList.perPage}
          />
        ) : (
          ""
        )}
      </VStack>
    </Box>
  );
};

export default SurveyPage;
