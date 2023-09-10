import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
  } from "@chakra-ui/react";  

interface ModalForSuggestionListForBoardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForSuggestionListForBoard: React.FC<ModalForSuggestionListForBoardProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Title Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Your modal content goes here */}
          <Text>This is the content of the modal.</Text>
          <Button onClick={onClose}>Close</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForSuggestionListForBoard;
