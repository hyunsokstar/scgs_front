import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

type DueDateOption = "until-noon" | "until-evening" | "until-night";

interface IProps {
  button_text: "☀️" | "🌛" | "🌌";
  button_size: string;
  modal_title: string;
  modal_size: string;
  button_width?: string;
}

const ModalButtonForUpdateDueDateOptionForToday = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonHandlerForUpdateDueDateOptionForToday = (selectedOption: DueDateOption) => {
    // Handle button click based on selected option
    // Example:
    if (selectedOption === "until-noon") {
      // Handle until-noon option
    } else if (selectedOption === "until-evening") {
      // Handle until-evening option
    } else if (selectedOption === "until-night") {
      // Handle until-night option
    }
  };

  return (
    <>
      <Button
        aria-label="Confirm"
        variant="outline"
        colorScheme="green"
        rounded="md"
        size={button_size}
        width={button_width}
        onClick={onOpen}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display={"flex"} gap={2}>
              {button_text !== "☀️" && (
                <Button
                  variant="outline"
                  _hover={{ bg: "lightblue" }}
                  size={"sm"}
                  onClick={() => buttonHandlerForUpdateDueDateOptionForToday("until-noon")}
                >
                  ☀️
                </Button>
              )}
              {button_text !== "🌛" && (
                <Button
                  variant="outline"
                  _hover={{ bg: "lightblue" }}
                  size={"sm"}
                  onClick={() => buttonHandlerForUpdateDueDateOptionForToday("until-evening")}
                >
                  🌛
                </Button>
              )}
              {button_text !== "🌌" && (
                <Button
                  variant="outline"
                  _hover={{ bg: "lightblue" }}
                  size={"sm"}
                  onClick={() => buttonHandlerForUpdateDueDateOptionForToday("until-night")}
                >
                  🌌
                </Button>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForUpdateDueDateOptionForToday;
