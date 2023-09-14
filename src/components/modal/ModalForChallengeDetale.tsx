import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  HStack,
  Divider,
} from "@chakra-ui/react";
import ContainerForCommentForSuggestionForBoard from "../Container/ContainerForCommentForSuggestionForBoard";

const ModalForChallengeDetale: React.FC<any> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>challengeDetail</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack spacing={4}>
            {/* 왼쪽 영역 (드래그 앤 드롭 업로드 영역) */}
            <Box
              w="30%" // 30% 너비로 변경
              border="2px dashed #ccc"
              p={2}
              margin={2}
              borderColor={"orange.500"}
            >
              {/* 드래그 앤 드롭 업로드 영역 내용 */}
              드래그 앤 드롭 업로드 영역입니다.
            </Box>
            {/* 가운데 구분선 */}
            <Divider orientation="vertical" borderColor="gray.300" />
            {/* 오른쪽 영역 (challenge detail) */}
            <Box
              w="70%" // 70% 너비로 변경
              border="1px solid #ccc"
              p={4}
              margin={2}
              borderColor={"gray.300"}
            >
              {/* challenge detail 내용 */}
              challenge detail 내용입니다.
            </Box>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForChallengeDetale;
