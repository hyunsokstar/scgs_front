import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import React, { useState } from "react";
import GridTableForEvaluationCriteriaForChallenge from "../GridTable/GridTableForEvaluationCriteriaForChallenge";

interface Props {}

const ModalButtonForAddEvalutationCriteriaForChallenge = (props: Props) => {
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
          <ModalHeader bgColor={"blue.100"}>평가 기준 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <GridTableForEvaluationCriteriaForChallenge />

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              닫기
            </Button>
            {/* 다른 모달 버튼 액션을 여기에 추가하세요 */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForAddEvalutationCriteriaForChallenge;