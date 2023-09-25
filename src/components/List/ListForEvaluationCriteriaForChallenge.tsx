import React from "react";
import { Text, List, ListItem, Box } from "@chakra-ui/react";
import { ITypeForChallengeRow } from "../../types/type_for_challenge";

interface ListForEvaluationCriteriaForChallengeProps {
  selectedChallenge: ITypeForChallengeRow;
}

const ListForEvaluationCriteriaForChallenge: React.FC<ListForEvaluationCriteriaForChallengeProps> = ({
  selectedChallenge,
}) => {
  return (
    <Box height={"100%"}>
      {selectedChallenge.evaluation_criterials.length > 0 ? (
        <List spacing={2} height="100%" overflowY="scroll">
          {selectedChallenge.evaluation_criterials.map((criteria) => (
            <ListItem key={criteria.id}>{criteria.item_description}</ListItem>
          ))}
        </List>
      ) : (
        <Box height="200px" display={"flex"} alignItems={"center"}>
          <Text>No evaluation criteria available.</Text>
        </Box>
      )}
    </Box>
  );
};

export default ListForEvaluationCriteriaForChallenge;
