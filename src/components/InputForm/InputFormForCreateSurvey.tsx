import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreateSurveyOptionForSurvey } from "../../apis/survey_api";
import { ISurveyDetail } from "../../types/type_for_survey";

interface InputFormForCreateSurveyOptionProps {
  dataForForSurveyDetail: ISurveyDetail;
  selectedSurveyId: any;
  loginUserName: string | null | undefined;
  writerUserName: string | null | undefined;
}

const InputFormForCreateSurveyOption: React.FC<
  InputFormForCreateSurveyOptionProps
> = ({
  dataForForSurveyDetail, // dataForForSurveyDetail
  selectedSurveyId, // selectedSurveyId
  loginUserName, // loginUser.username
  writerUserName, // dataForForSurveyDetail.writer.username
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [newOption, setNewOption] = useState<string>("");

  const mutationForCreateSurveyOptionForSurvey = useMutation(
    apiForCreateSurveyOptionForSurvey,
    {
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
        setNewOption("");
      },
      onError: (error: any) => {
        console.log("error.response : ", error.response);
        console.log("mutation has an error", error.response.data);

        // 에러 메시지를 토스트로 표시
        toast({
          title: "에러 발생",
          description: error.response.data.message, // 에러 메시지를 사용
          status: "error",
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  // todo 0920: 옵션 추가 구현 for SurveyOption by selectedSurveyId
  const handleAddView = () => {
    console.log("새로운 옵션:", newOption);

    if (newOption.length === 0) {
      // 글자수가 0이면 Toast 메시지 표시
      toast({
        title: "추가할 보기를 입력해주세요",
        status: "error",
        duration: 3000, // 메시지 자동 닫힘 시간 (3초)
        isClosable: true,
        position: "top", // 화면 상단에 표시
      });
      return;
    }

    if (dataForForSurveyDetail?.survey_options.length >= 5) {
      alert("보기를 5개 이상 입력 할수 없습니다");
      return;
    }

    mutationForCreateSurveyOptionForSurvey.mutate({
      surveyId: selectedSurveyId,
      newOption,
    });

    // newOption 초기화
  };

  return (
    <Box>
      {loginUserName === writerUserName ? (
        <InputGroup my={1}>
          <Input
            placeholder="addone"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddView();
              }
            }}
          />
          <InputRightElement width="auto">
            <Button
              colorScheme="teal"
              size="sm"
              _hover={{ bg: "teal.500" }}
              m={1}
              onClick={handleAddView}
            >
              보기 추가
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        ""
      )}
    </Box>
  );
};

export default InputFormForCreateSurveyOption;
