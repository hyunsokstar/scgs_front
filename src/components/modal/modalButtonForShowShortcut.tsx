import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Textarea,
  IconButton,
  Box,
  Flex,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { FiSearch } from "react-icons/fi";
import CopyButtonByPropsText from "../Button/CopyButtonByPropsText";

interface ModalButtonForShowShortcutProps {
  shorcutText: string;
}

const ModalButtonForShowShortcut: React.FC<ModalButtonForShowShortcutProps> = ({
  shorcutText,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <Box>
      <IconButton
        variant={"outline"}
        size={"sm"}
        aria-label="Show shortcut text"
        icon={<FiSearch />}
        onClick={handleOpen}
        ml={2}
        mt={1}
      />

      <Modal isOpen={isOpen} onClose={handleClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="purple.200">
            <Flex justifyContent="space-between" alignItems="center" w="100%">
              Show Shortcut Text
              <IconButton
                aria-label="Close"
                icon={<CloseIcon />}
                onClick={handleClose}
                variant="outline"
                _hover={{ bg: "blue.300" }}
              />
            </Flex>
          </ModalHeader>
          <ModalBody>
            <Box textAlign={"end"} m={2}>
              <CopyButtonByPropsText text={shorcutText} />
            </Box>
            <Textarea value={shorcutText} height={"390px"} />
          </ModalBody>
          <ModalFooter bg="purple.100"></ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ModalButtonForShowShortcut;
