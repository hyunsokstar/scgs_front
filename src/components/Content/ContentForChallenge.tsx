import React from "react";
import { Box, Text, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { ITypeForChallengeRow } from "../../types/type_for_challenge";
import ListForEvaluationCriteriaForChallenge from "../List/ListForEvaluationCriteriaForChallenge";
import ModalButtonForAddEvalutationCriteriaForChallenge from "../modal/ModalButtonForAddEvalutationCriteriaForChallenge";

interface Props {
  selectedChallenge: ITypeForChallengeRow;
}

const ContentForChallenge: React.FC<Props> = ({ selectedChallenge }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      // borderWidth="1px"
      // borderColor="gray.300"
      height="100%"
      width={"100%"}
    >
      <Box
        width={"50%"}
        height="100%"
        display="flex"
        alignItems="center"
        // border="1px dashed blue"
      >
        {/* <Text>
          Title : {selectedChallenge.title} <br />
          Subtitle: {selectedChallenge.subtitle} <br />
          Description: {selectedChallenge.description}
        </Text> */}
        <Table size="sm">
          <Tbody>
            <Tr>
              <Td>Title</Td>
              <Td>{selectedChallenge.title}</Td>
            </Tr>
            <Tr>
              <Td>Subtitle</Td>
              <Td>{selectedChallenge.subtitle}</Td>
            </Tr>
            <Tr>
              <Td>Description</Td>
              <Td>{selectedChallenge.description}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <Box
        width={"50%"}
        display="flex"
        flexDirection="column"
        gap={2}
        // border="1px dashed blue"
      >
        <Box
          width={"100%"}
          display="flex"
          justifyContent={"space-between"}
          ml={2}
          pr={2}
        >
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            평가 기준
          </Text>
          <ModalButtonForAddEvalutationCriteriaForChallenge
            selectedChallenge={selectedChallenge}
          />
        </Box>
        <Box width={"100%"} height="100%" overflowY={"scroll"}>
          <ListForEvaluationCriteriaForChallenge
            selectedChallenge={selectedChallenge}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ContentForChallenge;
