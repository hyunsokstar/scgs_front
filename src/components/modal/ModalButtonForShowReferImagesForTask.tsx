import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

interface ModalButtonForCopyTechNoteToMyNoteProps {
  buttonText: string;
  buttonSize?: string;
  buttonWidth?: string;
  modalSize?: string;
}

const ModalButtonForShowReferImagesForTask: React.FC<
  ModalButtonForCopyTechNoteToMyNoteProps
> = ({ buttonText, buttonSize, buttonWidth, modalSize }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outline"
        width={buttonWidth}
        borderColor="black"
        size={buttonSize}
        _hover={{ bg: "teal.100" }}
        onClick={() => setIsOpen(true)}
      >
        {buttonText}{" "}
      </Button>{" "}
      <Modal size={modalSize} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />{" "}
        <ModalContent>
          <ModalHeader>Modal Header</ModalHeader>{" "}
          <ModalCloseButton
            color="black"
            _hover={{ bg: "red.100" }}
            border="1px solid black"
          />
          <ModalBody bg="gray.200">hi</ModalBody>{" "}
          <ModalFooter bg="gray.100">Modal Footer</ModalFooter>{" "}
        </ModalContent>{" "}
      </Modal>{" "}
    </Box>
  );
};

export default ModalButtonForShowReferImagesForTask;
