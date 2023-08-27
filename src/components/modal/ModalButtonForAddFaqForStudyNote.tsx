import React from "react";

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
  Input,
  Textarea,
  FormErrorMessage,
  FormControl,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

interface Props {
  button_text: string;
  button_size: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | number | undefined;
}

const ModalButtonForAddFaqForStudyNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  study_note_pk,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>add faq body</Box>
          </ModalBody>
          <ModalFooter>
            <Box display={"flex"} gap={2} width={"100%"}>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                // onClick={handleSubmit(onSubmit)}
                width={"50%"}
              >
                Submit
              </Button>
              <Button
                //   onClick={onClose}
                width={"50%"}
              >
                Cancel
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForAddFaqForStudyNote;
