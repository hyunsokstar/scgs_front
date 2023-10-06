import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react';

interface ModalButtonProps {
  button_text: string;
  modal_title_text: string;
}

const ModalButtonForGetTaskListForIntegration: React.FC<ModalButtonProps> = ({
  button_text,
  modal_title_text,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        borderColor="blue"
        _hover={{ backgroundColor: 'your-hover-color' }}
        onClick={onOpen}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title_text}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex">
              <Box flex="1" border="1px dashed" marginRight="2">
                left side
              </Box>
              <Box flex="1" border="1px dashed">
                right side
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForGetTaskListForIntegration;
