import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForRegisterForChallenge } from "../../apis/challenge_api";

interface IProps {
  challengeId: string;
}

const ButtonForRegisterChallenge: React.FC<IProps> = ({ challengeId }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // apiForCreateRoadMap
  const mutationForCreateSuggestionForBoard = useMutation(
    apiForRegisterForChallenge,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetDetailForChallenge"]);

        toast({
          title: "challenge register 성공",
          description: data.message,
          status: "success",
          duration: 1800,
          isClosable: true,
        });
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

  const handleButtonClick = () => {
    mutationForCreateSuggestionForBoard.mutate({ challengeId });
  };

  return (
    <Button
      variant="outline" // outlined 스타일
      size="sm" // 작은 크기
      _hover={{ bg: "teal.400" }} // 호버 시 배경색 변경
      onClick={handleButtonClick} // 클릭 이벤트 설정
    >
      Register for Challenge
    </Button>
  );
};

export default ButtonForRegisterChallenge;
