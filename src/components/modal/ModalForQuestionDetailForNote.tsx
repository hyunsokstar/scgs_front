import React, { useState } from "react";
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
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { AnswerForQaBoard, QnARow } from "../../types/study_note_type";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"; // 임포트 위치 최상단
import {
  apiForAddCommentForQuestionForNote,
  apiForDeleteCommentForQuestionForNote,
  apiForUpdateCommentForQuestionForNote,
} from "../../apis/study_note_api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


interface ModalForQuestionDetailForNoteProps {
  isOpen: boolean;
  closeModal: () => void;
  question: QnARow | null;
  refetchForGetQnABoardList: () => void;
}

// 1122
const ModalForQuestionDetailForNote: React.FC<
  ModalForQuestionDetailForNoteProps
> = ({ isOpen, closeModal, question, refetchForGetQnABoardList }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [contentForComment, setContentForComment] = useState("");

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const [editingRowIndex, setEditingRowIndex] = useState(-1);
  const [editedContent, setEditedContent] = useState("");

  const handleEditClick = (rowIndex: number, content: string) => {
    setEditingRowIndex(rowIndex);
    setEditedContent(content);
  };

  // mutationForUpdateForCommentForQuestionForNote
  const mutationForUpdateForCommentForQuestionForNote = useMutation(
    apiForUpdateCommentForQuestionForNote,
    {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        refetchForGetQnABoardList();
        queryClient.refetchQueries(["apiForGetQnABoardList"]);
        toast({
          status: "success",
          title: "update success",
          description: result.message,
        });
      },
      onError: (err) => {
        console.log("error : ", err);
      },
    }
  );

  const handleSaveClick = (pk: number) => {
    mutationForUpdateForCommentForQuestionForNote.mutate({
      commentPk: pk,
      content: editedContent,
    });
    // queryClient.refetchQueries(["apiForGetQnABoardList"]);
    // refetchForGetQnABoardList();
    setEditingRowIndex(-1);
  };

  const handleCancelClick = () => {
    setEditingRowIndex(-1);
  };

  const handleContentChange = (event: any) => {
    setContentForComment(event.target.value);
  };
  // mutationForAddCommentForQuestionForNote
  const mutationForAddCommentForQuestionForNote = useMutation(
    apiForAddCommentForQuestionForNote,
    {
      onMutate: () => {
        console.log("mutation starting");
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        toast({
          title: "Task URL 추가",
          description: "Task URL을 추가하였습니다.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        queryClient.refetchQueries(["apiForGetQnABoardList"]);
      },
      onError: (error: any) => {
        console.log("error.response : ", error);
        console.log("mutation has an error", error.response.data);
      },
    }
  );

  const buttonHandlerForAddCommentForQuestionForNote = () => {
    if (contentForComment === "") {
      alert("댓글 내용을 입력해 주세요");
      return;
    }

    if (question) {
      const question_pk = question.pk;
      mutationForAddCommentForQuestionForNote.mutate({
        question_pk,
        content: contentForComment,
      });
    }
  };

  const mutationForDeleteCommentForQuestionForNote = useMutation(
    (pk: number) => {
      // return deleteOneCommentForTaskByPkApi(pk);
      return apiForDeleteCommentForQuestionForNote(pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["apiForGetQnABoardList"]);

        toast({
          title: "delete comment 성공!",
          status: "success",
        });
      },
    }
  );
  
  const buttonHandlerForDeleteCommentForQuestionForNote = (pk: number) => {
    // alert(pk);
    mutationForDeleteCommentForQuestionForNote.mutate(pk)
  };

  // 2244
  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="6xl">
      <ModalOverlay />
      <ModalContent height={"80vh"}>
        <ModalHeader>Question Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box display={"flex"} flexDirection={"column"} height={"68vh"}>
            <Box bgColor={"blue.100"} border={"1px solid green"}>
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
                            {question.writer.username}
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
            <Box mt={10} overflowY={"auto"}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box>Comment for Question</Box>
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
                    {/* rome-ignore lint/complexity/useOptionalChain: <explanation> */}
                    {question &&
                      question.answers_for_qa_board.map(
                        (row: AnswerForQaBoard, rowIndex) => (
                          <Tr key={row.pk}>
                            <Td>
                              <Box
                                display={"flex"}
                                gap={2}
                                alignItems={"center"}
                              >
                                {/* <Avatar
                                name={row.writer.username}
                                src={row.writer.profile_image}
                                size="sm"
                                mr={2}
                              />{" "}
                              <Box>{row.content}</Box> */}

                                {editingRowIndex === rowIndex ? (
                                  <Box
                                    display="flex"
                                    gap={2}
                                    alignItems="center"
                                    width={"100%"}
                                  >
                                    <Avatar
                                      name={row.writer.username}
                                      src={row.writer.profile_image}
                                      size="sm"
                                      mr={2}
                                    />
                                    <Textarea
                                      width={"100%"}
                                      border={"1px solid black"}
                                      value={editedContent}
                                      onChange={(event) =>
                                        setEditedContent(event.target.value)
                                      }
                                    />
                                  </Box>
                                ) : (
                                  <Box
                                    display="flex"
                                    gap={2}
                                    alignItems="center"
                                  >
                                    <Avatar
                                      name={row.writer.username}
                                      src={row.writer.profile_image}
                                      size="sm"
                                      mr={2}
                                    />
                                    <Box>{row.content}</Box>
                                  </Box>
                                )}
                              </Box>
                            </Td>
                            <Td>{row.created_at_formatted}</Td>
                            <Td>
                              {isLoggedIn &&
                              row.writer.username === loginUser.username ? (
                                <Box>
                                  {editingRowIndex === rowIndex ? (
                                    <>
                                      <IconButton
                                        icon={<CheckIcon />}
                                        aria-label="Save"
                                        variant="ghost"
                                        onClick={() => handleSaveClick(row.pk)}
                                      />
                                      <IconButton
                                        icon={<CloseIcon />}
                                        aria-label="Cancel"
                                        variant="ghost"
                                        onClick={handleCancelClick}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <IconButton
                                        icon={<EditIcon />}
                                        aria-label="Edit"
                                        variant="ghost"
                                        onClick={() =>
                                          handleEditClick(rowIndex, row.content)
                                        }
                                      />
                                      <IconButton
                                        icon={<DeleteIcon />}
                                        aria-label="Delete"
                                        variant="ghost"
                                        onClick={() => {
                                          buttonHandlerForDeleteCommentForQuestionForNote(
                                            row.pk
                                          );
                                        }}
                                      />
                                    </>
                                  )}
                                </Box>
                              ) : (
                                ""
                              )}
                            </Td>
                          </Tr>
                        )
                      )}
                  </Tbody>
                </Table>
              </Box>

              <Box
                border="0px solid green"
                width="100%"
                display="flex"
                mt={5}
                p={1}
              >
                <Textarea
                  height="200px"
                  flexGrow={1}
                  value={contentForComment}
                  onChange={handleContentChange}
                />{" "}
                <Button
                  variant="solid"
                  colorScheme="green"
                  marginLeft="4"
                  onClick={buttonHandlerForAddCommentForQuestionForNote}
                >
                  comment
                </Button>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForQuestionDetailForNote;
