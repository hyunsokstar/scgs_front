import { useEffect, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import PlanCard from "../components/Card/PlanCard";
import PlanCardContainer from "../components/Card/PlanCardContainer";
import { useQuery } from "@tanstack/react-query";
import { api_for_get_long_term_plan_list } from "../apis/api_for_long_term_plan";
import { list_for_long_term_plan } from "../types/type_for_plan_maker";
import ModalButtonForCreatePlan from "../components/modal/ModalButtonForCreatePlan";

const cardData = [
  {
    title: "Card 1",
    description: "This is the description of card 1.",
    writer: "John Doe",
  },
  {
    title: "Card 2",
    description: "This is the description of card 2.",
    writer: "Jane Smith",
  },
  {
    title: "Card 3",
    description: "This is the description of card 3.",
    writer: "Bob Johnson",
  },
  {
    title: "Card 4",
    description: "This is the description of card 1.",
    writer: "John Doe",
  },
  {
    title: "Card 5",
    description: "This is the description of card 2.",
    writer: "Jane Smith",
  },
  {
    title: "Card 6",
    description: "This is the description of card 3.",
    writer: "Bob Johnson",
  },
  {
    title: "Card 7",
    description: "This is the description of card 1.",
    writer: "John Doe",
  },
  {
    title: "Card 8",
    description: "This is the description of card 2.",
    writer: "Jane Smith",
  },
  {
    title: "Card 9",
    description: "This is the description of card 3.",
    writer: "Bob Johnson",
  },
  {
    title: "Card 10",
    description: "This is the description of card 3.",
    writer: "Bob Johnson",
  },
];

interface Props {}

const LongTermPlan = (props: Props) => {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    isLoading: loading_for_long_term_plan,
    data: data_for_long_term_plan,
    refetch: refetch_for_long_term_plan,
  } = useQuery<list_for_long_term_plan>(
    ["get_shortcut_list", currentPageNum],
    api_for_get_long_term_plan_list,
    {
      enabled: true,
    }
  );

  console.log("data_for_long_term_plan : ", data_for_long_term_plan);

  const buttonHandlerForCratePlan = () => {
    console.log("계획 추가 버튼 클릭");
  };

  if (!data_for_long_term_plan) {
    return "no data";
  }

  return (
    <Box
      border={"1px solid purple"}
      display={"flex"}
      flexDirection={"column"}
      gap={3}
    >
      <Box textAlign={"right"} mt={2}>
        <ModalButtonForCreatePlan button_text={"계획 추가"} />
      </Box>

      <PlanCardContainer
        topic={"계획 목록"}
        cardDataArray={data_for_long_term_plan}
      />
    </Box>
  );
};

export default LongTermPlan;
