import React from "react";
import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import ImageBoxForChallengeDetail from "../ImageBox/ImageBoxForChallengeDetail";
import { ITypeForChallengeRow } from "../../types/type_for_challenge";
import ContentForChallenge from "../Content/ContentForChallenge";

interface IPropTypes {
  selectedChallenge: ITypeForChallengeRow;
  isOpen: boolean;
  onClose: () => void;
}

const ModalForChallengeDetail: React.FC<any> = ({
  selectedChallenge,
  isOpen,
  onClose,
}: IPropTypes) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent height={"100%"}>
        <ModalHeader>challengeDetail</ModalHeader>
        <ModalCloseButton />
        <ModalBody border={"5px solid blue"} height={"100%"}>
          <Flex width="100%" height="100%" gap={2}>
            <Box
              w="30%"
              height="48%"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              border="2px dashed blue"
            >
              <ImageBoxForChallengeDetail
                selectedChallenge={selectedChallenge}
              />
            </Box>

            <Divider orientation="vertical" borderColor="gray.300" />

            <Box
              w="70%"
              height="48%"
              p={4}
              // margin={2}
              textAlign="center" // 텍스트 가운데 정렬
              border="2px dashed blue"
            >
              <ContentForChallenge selectedChallenge={selectedChallenge} />
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForChallengeDetail;
