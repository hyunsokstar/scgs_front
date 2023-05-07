import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import PlanCard from "../components/Card/PlanCard";
import PlanCardContainer from "../components/Card/PlanCardContainer";


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
  return (
    <Box border={"1px solid purple"} display={"flex"} flexDirection={"column"} gap={3}>
      <PlanCardContainer topic={"계획 목록"} cardDataArray={cardData} />
    </Box>
  );
};

export default LongTermPlan;
