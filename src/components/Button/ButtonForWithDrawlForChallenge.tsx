import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForRegisterForChallenge, apiForWithDrawlForChallenge } from "../../apis/challenge_api";

interface IProps {
  challengeId: string | number;
}


const ButtonForWithDrawlForChallenge: React.FC<IProps> = ({ challengeId }) => {
  const toast = useToast();

  const queryClient = useQueryClient();

  // mutationForWithDrawlForChallenge
  const mutationForWithDrawlForChallenge = useMutation(
    (challengePk: string | number) => {
      return apiForWithDrawlForChallenge(challengePk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetDetailForChallenge"]);
        toast({
          title: "delete test 성공!",
          status: "success",
        });
      },
    }
  );

  const handleButtonClick = () => {
    // alert(`Clicked on Register for Challenge ${challengeId}`);
    mutationForWithDrawlForChallenge.mutate(challengeId);
  };

  return (
    <Button
      variant="outline" // outlined 스타일
      size="sm" // 작은 크기
      _hover={{ bg: "teal.400" }} // 호버 시 배경색 변경
      onClick={handleButtonClick} // 클릭 이벤트 설정
    >
      WithDrawl for Challenge
      {/* 버튼 텍스트와 기능을 필요에 따라 수정하세요. */}
    </Button>
  );
};

export default ButtonForWithDrawlForChallenge;
