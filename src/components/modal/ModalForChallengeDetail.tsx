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
} from "@chakra-ui/react";
import ImageBoxForChallengeDetail from "../ImageBox/ImageBoxForChallengeDetail";

const ModalForChallengeDetail: React.FC<any> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent height={"100%"}>
        <ModalHeader>challengeDetail</ModalHeader>
        <ModalCloseButton />
        <ModalBody border={"5px solid blue"} height={"100%"}>
          <Flex width="100%" height="100%">
            <Box
              w="30%"
              height="50%"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <ImageBoxForChallengeDetail />
            </Box>

            <Divider orientation="vertical" borderColor="gray.300" />

            <Box
              w="70%"
              border="2px dashed blue" // 점선 스타일 및 색상 설정
              p={4}
              margin={2}
              height="50%" // 높이를 25%로 설정
            >
              challenge 내용입니다.
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForChallengeDetail;
