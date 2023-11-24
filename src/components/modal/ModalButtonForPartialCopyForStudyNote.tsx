import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Divider,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ModalButtonForPartialCopyForStudyNote: React.FC<{
  buttonText: string;
}> = ({ buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  


  return (
    <>
      <Button
        variant="outline"
        border="1px solid black"
        size="sm"
        onClick={handleOpen}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              {/* Left Side for my note*/}
              <Box style={{ width: "50%" }}>Left Side For My Note</Box>
              <Divider orientation="vertical" border={"1px solid black"} />
              {/* Right Side */}
              <Box style={{ width: "50%" }}>Right Side For My Note</Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForPartialCopyForStudyNote;
