import React from "react";
import {
  List,
  ListItem,
  HStack,
  Box,
  Spacer,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ISurveyDetail } from "../../types/type_for_survey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreateSurveyAnswer } from "../../apis/survey_api";

interface ListForSurveyOptionProps {
  dataForForSurveyDetail: ISurveyDetail;
  surveyId: any;
}

const ListForSurveyOption: React.FC<ListForSurveyOptionProps> = ({
  dataForForSurveyDetail,
  surveyId,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // mutationForCreateSurveyAnswer
  const mutationForCreateSurveyAnswer = useMutation(apiForCreateSurveyAnswer, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);
      queryClient.refetchQueries(["apiForGetDetailForSurvey"]);

      toast({
        title: "challenge register 성공",
        description: data.message,
        status: "success",
        duration: 1800,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      console.log("error.response : ", error);
      console.log("mutation has an error", error.response.data.message);

      // 에러 메시지를 토스트로 표시
      toast({
        title: "에러 발생",
        description: error.response.data.message, // 에러 메시지를 사용
        status: "error",
        duration: 1800,
        isClosable: true,
      });
    },
  });

  const handleOptionSelect = (optionId: any) => {
    // 여기에서 optionId를 사용하여 선택 옵션에 대한 작업을 수행할 수 있습니다.
    console.log(`Option ${optionId}가 선택되었습니다.`);
    mutationForCreateSurveyAnswer.mutate({
      surveyId,
      surveyOptionId: optionId,
    });
  };

  return (
    <List spacing={2}>
      {dataForForSurveyDetail.survey_options.map((option, index) => (
        <ListItem key={option.id}>
          <HStack justifyContent="space-between" p={1}>
            <Box fontSize="sm" color="gray.500" marginRight="1">
              {index + 1}
            </Box>
            <Box>{option.content}</Box>
            <Spacer />
            {/* 선택 버튼에 핸들러 함수 연결 */}
            <Button
              size="sm"
              variant="outline"
              borderWidth="1px"
              onClick={() => handleOptionSelect(option.id)} // option.id를 파라미터로 전달
            >
              선택
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default ListForSurveyOption;
