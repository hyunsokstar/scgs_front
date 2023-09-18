import React, { useState, useEffect } from "react";
import { Switch, useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForUpdateEvaluateResultForChallenge } from "../../apis/challenge_api";
import { IParameterTyperForApiForUpdateForEvaluateResultForChallenge } from "../../types/type_for_challenge";

interface IProps {
  challengeId: number | string;
  userName: string;
  criteria: string;
  option: "undecided" | "fail" | "pass" | string;
}

// 옵션에 따라 색상을 반환하는 함수
const getColorScheme = (option: IProps["option"]) => {
  switch (option) {
    case "undecided":
      return "yellow";
    case "fail":
      return "red";
    case "pass":
      return "green";
    default:
      return undefined;
  }
};

const ToggleButtonForUpdateResultForEvaluationForChallenge: React.FC<
  IProps
> = ({ challengeId, userName, criteria, option }: IProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isChecked, setIsChecked] = useState(false);

  const mutationForEvaluateResultForChallenge = useMutation(
    ({
      challengeId,
      userName,
      criteria,
    }: IParameterTyperForApiForUpdateForEvaluateResultForChallenge) => {
      return apiForUpdateEvaluateResultForChallenge({
        challengeId,
        userName,
        criteria,
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

  const handleChange = () => {
    setIsChecked(!isChecked);
    mutationForEvaluateResultForChallenge.mutate({
      challengeId,
      userName,
      criteria,
    });
  };

  const colorScheme = getColorScheme(option);

  useEffect(() => {
    setIsChecked(option === "pass");
  }, [option]);

  return (
    <Switch
      colorScheme={colorScheme}
      isChecked={isChecked}
      onChange={handleChange}
    >
      {option}
    </Switch>
  );
};

export default ToggleButtonForUpdateResultForEvaluationForChallenge;
