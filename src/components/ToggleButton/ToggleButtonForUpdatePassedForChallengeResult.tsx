import React, { useState } from "react";
import { Box, Switch, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateForPassedForChallegeResult } from "../../apis/challenge_api";

interface ToggleButtonForChallengeResultProps {
  challengeResultId: number | string;
  passed: boolean;
}

// apiForUpdatePassedForChallengeResult
const ToggleButtonForUpdatePassedForChallengeResult: React.FC<
  ToggleButtonForChallengeResultProps
> = ({ challengeResultId, passed }: ToggleButtonForChallengeResultProps) => {
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(passed);
  const toast = useToast();

  const mutationForUpdatePassedForChallengeResult = useMutation(
    ({ challengeResultId }: any) => {
      return apiForUpdateForPassedForChallegeResult({
        challengeResultId,
      });
    },
    {
      onSettled: () => {},
      onSuccess: (data: any) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["apiForGetDetailForChallenge"]);

        toast({
          title: "Update Task Due Date For Checked 성공!",
          status: "success",
          description: data.message,
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
          duration: 3000,
          isClosable: true,
        });
      },
    }
  );

  const handleToggle = () => {
    // 여기에서 스위치 버튼의 상태를 변경하고 필요한 작업을 수행할 수 있습니다.
    setIsChecked(!isChecked);
    mutationForUpdatePassedForChallengeResult.mutate({ challengeResultId });
    // TODO: 서버에 상태 업데이트 요청 등의 작업을 수행할 수 있습니다.
  };

  return (
    <Box>
      <Switch
        isChecked={isChecked}
        onChange={handleToggle}
        colorScheme="teal"
      />
    </Box>
  );
};

export default ToggleButtonForUpdatePassedForChallengeResult;
