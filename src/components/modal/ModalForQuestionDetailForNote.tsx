import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
} from "@chakra-ui/react";
import { QnARow } from "../../types/study_note_type";

interface ModalForQuestionDetailForNoteProps {
  isOpen: boolean;
  closeModal: () => void;
  question: QnARow | null;
}

const ModalForQuestionDetailForNote: React.FC<
  ModalForQuestionDetailForNoteProps
> = ({ isOpen, closeModal, question }) => {
  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Question Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box bgColor={"blue.100"}>
            {question && (
              <Box>
                <Table>
                  <Tr>
                    <Td width={"50%"}>
                      <Box>
                        <strong>Title:</strong>
                      </Box>
                      {question.title}
                    </Td>
                    <Td width={"50%"}>
                      <Box
                        display={"flex"}
                        justifyContent={"space-between"}
                        gap={2}
                      >
                        <Box>
                          <Text fontWeight="bold">Writer:</Text>
                          gogo {question.writer.username}
                        </Box>
                        <Box>
                          <Text fontWeight="bold">Page:</Text>
                          {question.page}
                        </Box>
                      </Box>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={2}>
                      <Box>
                        <strong>Content:</strong>
                      </Box>
                      <Box mt={2}>{question.content}</Box>
                    </Td>
                  </Tr>
                </Table>
              </Box>
            )}
          </Box>
          <Box mt={10}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box>답변 영역</Box>
              <Box>
                <Button> add comment</Button>
              </Box>
            </Box>
            <Box></Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForQuestionDetailForNote;
