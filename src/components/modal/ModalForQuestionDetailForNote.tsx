import React from "react";
import {
  Avatar,
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
  IconButton,
} from "@chakra-ui/react";
import { QnARow } from "../../types/study_note_type";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

interface ModalForQuestionDetailForNoteProps {
  isOpen: boolean;
  closeModal: () => void;
  question: QnARow | null;
}

const ModalForQuestionDetailForNote: React.FC<
  ModalForQuestionDetailForNoteProps
> = ({ isOpen, closeModal, question }) => {
  console.log("question : ", question);

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
              <Box>Comment</Box>
              <Box>
                <Button> add comment</Button>
              </Box>
            </Box>
            <Box>
              <Table mt={4} variant="striped" colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Content</Th>
                    <Th>Created At</Th>
                    <Th>modify/delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {question &&
                    question.answers_for_qa_board.map(
                      (row: AnswerForQaBoard) => (
                        <Tr key={row.pk}>
                          <Td>
                            <Box display={"flex"} gap={2} alignItems={"center"}>
                              <Avatar
                                name={row.writer.username}
                                src={row.writer.profile_image}
                                size="sm"
                                mr={2}
                              />{" "}
                              <Box>{row.content}</Box>
                            </Box>
                          </Td>
                          <Td>{row.created_at_formatted}</Td>
                          <Td>
                            <IconButton
                              icon={<EditIcon />}
                              aria-label="Edit"
                              variant="ghost"
                              onClick={() => {
                              }}
                            />
                            <IconButton
                              icon={<DeleteIcon />}
                              aria-label="Delete"
                              variant="ghost"
                              onClick={() => {
                                // Delete 버튼 클릭 시 동작
                              }}
                            />
                          </Td>
                        </Tr>
                      )
                    )}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForQuestionDetailForNote;
