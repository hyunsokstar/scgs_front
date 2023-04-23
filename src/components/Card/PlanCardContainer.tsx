import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PlanCard from "./PlanCard";

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

interface ITypeForPlanCard {
  title: string;
  description: string;
  writer: string;
}

interface Props {
  topic: string;
  cardDataArray: ITypeForPlanCard[];
}

const PlanCardContainer = ({ topic, cardDataArray }: Props) => {
  return (
    <Box border={"2px solid red"}>
      <Box px={"auto"}>
        <Text align={"center"}>{topic}</Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        border={"1px solid green"}
        flexWrap={"wrap"}
        width={"92%"}
        gap={3}
        mx={"auto"}
      >
        {cardDataArray.map((card, index) => (
          <Box key={index} mb={1}>
            <PlanCard {...card} />
          </Box>
        ))}{" "}
      </Box>
    </Box>
  );
};

export default PlanCardContainer;
