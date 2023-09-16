import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import GridTableForUpdateEvaluationCriteriaForChallenge from "../GridTable/GridTableForUpdateEvaluationCriteriaForChallenge";
import { ITypeForChallengeRow } from "../../types/type_for_challenge";

interface Props {
  selectedChallenge: ITypeForChallengeRow;
}

const ModalButtonForAddEvalutationCriteriaForChallenge = ({
  selectedChallenge,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Box>
        <Button
          variant="outlined"
          size="md"
          _hover={{ backgroundColor: "green.100", borderColor: "green" }}
          border="1px"
          borderColor="green"
          onClick={onOpen}
        >
          평가 기준 추가
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"red.100"}>평가 기준 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GridTableForUpdateEvaluationCriteriaForChallenge
              selectedChallenge={selectedChallenge}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForAddEvalutationCriteriaForChallenge;
