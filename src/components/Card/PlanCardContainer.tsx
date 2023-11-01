import { Box } from "@chakra-ui/react";
import React from "react";
import PlanCard from "./PlanCard";
import { list_for_long_term_plan } from "../../types/type_for_plan_maker";

interface Props {
  topic: string;
  cardDataArray: list_for_long_term_plan;
}

const PlanCardContainer = ({ topic, cardDataArray }: Props) => {
  console.log("cardDataArray: ", cardDataArray);

  return (
    <Box border="0px solid blue">
      <Box textAlign="center">
        <Box
          fontSize={["20px", "30px"]} // Font size for mobile and larger screens
          fontFamily="sans-serif"
          fontWeight="bold"
          color="blue.500"
          bg="gray.200" // Background color
          height={["40px", "50px"]} // Height of the panel for mobile and larger screens
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={2} // Horizontal padding for mobile and larger screens
        >
          {topic}
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="center" // Center align the cards horizontally
        flexWrap="wrap"
        width="100%"
        my={2}
        gap={3}
        // border="1px solid green"
      >
        {cardDataArray.map((row, index) => (
          <Box
            key={row.pk}
            mb={1}
            width={["90%", "90%", "100%", "100%"]}
          >
            <PlanCard
              pk={row.pk}
              title={row.title}
              description={row.description}
              category={row.category}
              writer={row.writer}
              created_at={row.created_at}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PlanCardContainer;
