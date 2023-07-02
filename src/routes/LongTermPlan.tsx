import { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import PlanCard from "../components/Card/PlanCard";
import PlanCardContainer from "../components/Card/PlanCardContainer";
import { useQuery } from "@tanstack/react-query";
import { api_for_get_long_term_plan_list } from "../apis/api_for_long_term_plan";
import { list_for_long_term_plan } from "../types/type_for_plan_maker";
import ModalButtonForCreatePlan from "../components/modal/ModalButtonForCreatePlan";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {}

const LongTermPlan = (props: Props) => {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const {
    isLoading: loading_for_long_term_plan,
    data: data_for_long_term_plan,
    refetch: refetch_for_long_term_plan,
  } = useQuery<list_for_long_term_plan>(
    ["get_plan_list", currentPageNum],
    api_for_get_long_term_plan_list,
    {
      enabled: true,
    }
  );

  console.log("data_for_long_term_plan : ", data_for_long_term_plan);

  return (
    <Box
      border={"1px solid purple"}
      display={"flex"}
      flexDirection={"column"}
      gap={3}
      px={"auto"}
    >
      <Box textAlign={"right"} m={2}>
        {isLoggedIn ? (
          <ModalButtonForCreatePlan button_text={"계획 추가"} />
        ) : (
          "계획 입력은 로그인 필요"
        )}
      </Box>

      {data_for_long_term_plan ? (
        <PlanCardContainer
          topic={"Medium to long-term plan list"}
          cardDataArray={data_for_long_term_plan}
        />
      ) : (
        ""
      )}
    </Box>
  );
};

export default LongTermPlan;
