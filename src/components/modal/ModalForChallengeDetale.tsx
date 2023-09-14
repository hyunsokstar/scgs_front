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
  VStack, // 추가
  Divider, // 추가
  Textarea, // 추가
} from "@chakra-ui/react";
import ContainerForCommentForSuggestion from "../Container/ContainerForCommentForSuggestionForBoard";

const ModalForChallengeDetale: React.FC<any> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>challengeDetail</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          challenge detail body
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForChallengeDetale;

