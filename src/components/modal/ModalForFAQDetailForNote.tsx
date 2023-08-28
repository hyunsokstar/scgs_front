import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Table,
  Tr,
  Td,
} from "@chakra-ui/react";
import { FAQRow } from "../../types/study_note_type";

interface ModalForFAQDetailForNoteProps {
  isOpen: boolean;
  closeModal: () => void;
  faqData: FAQRow;
  refetchForGetQnABoardList: () => void;
}

const ModalForFAQDetailForNote: React.FC<ModalForFAQDetailForNoteProps> = ({
  isOpen,
  closeModal,
  faqData,
}) => {

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="7xl">
      <ModalOverlay />
      <ModalContent>

        <ModalHeader>FAQDetail: {faqData.title}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box>
            <Table>
              <Tr>
                <Td>
                  <strong>Title:</strong>
                </Td>
                <Td>{faqData.title}</Td>
              </Tr>
              <Tr>
                <Td>
                  <strong>Content:</strong>
                </Td>
                <Td dangerouslySetInnerHTML={{ __html: faqData.content }}></Td>
              </Tr>
            </Table>
          </Box>
        </ModalBody>

      </ModalContent>
    </Modal>
  );
};

export default ModalForFAQDetailForNote;