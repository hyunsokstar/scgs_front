import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import CardForTechNoteContent from "../CardForTechNoteContent";

type TechNoteModalProps = {
  techNotePk: string | number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ModalForTechNoteContentList = ({
  techNotePk,
  isOpen,
  onOpen,
  onClose,
}: TechNoteModalProps) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="7xl"
      >
        <ModalOverlay bg="rgba(0,0,0,0.5)" />
        <ModalContent bg="blue.100" height={"80%"}>
          <ModalHeader>Tech Note Content list For {techNotePk}</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto" maxHeight="60vh">
            <CardForTechNoteContent
              title={""}
              file={""}
              content={""}
              created_at={""}
            />
            <CardForTechNoteContent
              title={""}
              file={""}
              content={""}
              created_at={""}
            />
            <CardForTechNoteContent
              title={""}
              file={""}
              content={""}
              created_at={""}
            />
            <CardForTechNoteContent
              title={""}
              file={""}
              content={""}
              created_at={""}
            />
            <CardForTechNoteContent
              title={""}
              file={""}
              content={""}
              created_at={""}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForTechNoteContentList;
