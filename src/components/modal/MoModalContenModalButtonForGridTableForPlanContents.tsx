// modalButtonForGridTableForPlanContents.tsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import GridTableForPlanContents from "../GridTable/GridTableForPlanContents";

interface IProps {
  button_text: string;
}

const ModalButtonForGridTableForPlanContents = ({
  button_text,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const headerBgColor = "pastelBlue";
  const bodyBgColor = "pastelGreen";
  const footerBgColor = "pastelYellow";
  const closeBtnBgColor = "pastelOrange";
  const closeBtnHoverBgColor = "pastelPink";

  return (
    <Box>
      <Button onClick={onOpen}>{button_text}</Button>

      <Modal isOpen={isOpen} size={"7xl"} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={headerBgColor}>Modal Header</ModalHeader>
          <ModalCloseButton
            bg={closeBtnBgColor}
            _hover={{ bg: closeBtnHoverBgColor }}
            border="1px solid black"
            variant="outline"
          />
          <ModalBody bg={bodyBgColor}>
            <GridTableForPlanContents />
          </ModalBody>
          <ModalFooter bg={footerBgColor}>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForGridTableForPlanContents;
