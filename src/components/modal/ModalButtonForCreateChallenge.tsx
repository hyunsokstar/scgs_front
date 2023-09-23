import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import CreateFormForChallenge from "../Form/CreateFormForChallenge";

const ChallengeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      
      <Button onClick={openModal}>Create Challenge</Button>

      <Modal isOpen={isOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Challenge</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateFormForChallenge setIsOpen = {setIsOpen} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ChallengeModal;
