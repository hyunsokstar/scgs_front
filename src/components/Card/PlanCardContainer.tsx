import { Box, Text } from "@chakra-ui/react";
import React from "react";
import PlanCard from "./PlanCard";
import { list_for_long_term_plan } from "../../types/type_for_plan_maker";

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

interface Props {
  topic: string;
  cardDataArray: list_for_long_term_plan;
}

const PlanCardContainer = ({ topic, cardDataArray }: Props) => {

  console.log("cardDataArray : ", cardDataArray);
  

  return (
    <Box border={"2px solid red"}>
      <Box px={"auto"}>
        <Text align={"center"}>{topic}</Text>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        border={"1px solid green"}
        flexWrap={"wrap"}
        width={"92%"}
        gap={3}
        mx={"auto"}
      >
        {cardDataArray.map((row, index) => (
          <Box key={row.pk} mb={1} width={"30%"} mx={3}>
            <PlanCard  
                pk = {row.pk}
                title = {row.title}
                description = {row.description}
                category= {row.category}
                writer = {row.writer}
                created_at = {row.created_at}
            />
          </Box>
        ))}{" "}
      </Box>
    </Box>
  );
};

export default PlanCardContainer;
