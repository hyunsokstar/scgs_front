import React from "react";
import {
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  List,
  ListItem,
  Box,
} from "@chakra-ui/react";
import { ITypeForChallengeRow } from "../../types/type_for_challenge";
import ListForEvaluationCriteriaForChallenge from "../List/ListForEvaluationCriteriaForChallenge";
import ModalButtonForAddEvalutationCriteriaForChallenge from "../modal/ModalButtonForAddEvalutationCriteriaForChallenge";

interface Props {
  selectedChallenge: ITypeForChallengeRow;
}

const ContentForChallenge: React.FC<Props> = ({ selectedChallenge }) => {
  return (
    <>
      <Table>
        <Tbody>
          <Tr>
            <Td width="30%">Title</Td>
            <Td width="70%">{selectedChallenge.title}</Td>
          </Tr>
          <Tr>
            <Td width="30%">Subtitle</Td>
            <Td width="70%">{selectedChallenge.subtitle}</Td>
          </Tr>
          <Tr>
            <Td width="30%">Description</Td>
            <Td width="70%">{selectedChallenge.description}</Td>
          </Tr>
          <Tr>
            <Td width="30%">Criteria</Td>
            <Td width="70%">

            <Box display={"flex"} justifyContent={"flex-end"} mb={2}>
                <ModalButtonForAddEvalutationCriteriaForChallenge />
            </Box>

              <ListForEvaluationCriteriaForChallenge
                selectedChallenge={selectedChallenge}
              />


            </Td>
          </Tr>
        </Tbody>
      </Table>
    </>
  );
};

export default ContentForChallenge;
