import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { QnARow } from "../../types/study_note_type";
import ModalForQuestionDetailForNote from "../modal/ModalForQuestionDetailForNote"; // 모달 컴포넌트를 임포트하세요.
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalButtonForUpdateQuestionForNote from "../modal/ModalButtonForUpdateQuestionForNote";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForDeleteQuestionForNote } from "../../apis/study_note_api";
import ModalButtonForAddQuestionForStudNote from "../modal/ModalButtonForAddQuestionForStudNote";

interface TabelForQnaListForStudyNoteProps {
  study_note_pk: number | string | undefined;
  data: QnARow[] | undefined;
  refetchForGetQnABoardList: () => void;
}

const TableForQnaListForStudyNote: React.FC<
  TabelForQnaListForStudyNoteProps
> = ({ study_note_pk, data, refetchForGetQnABoardList }) => {
  const toast = useToast();

  const queryClient = useQueryClient();

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QnARow | null>(null);

  // todo
  // data 이 바뀌면 현재 열린 모달의 question 도 바뀌도록 하기
  // 모달은 아래에 onClick 으로 열린 ModalForQuestionDetailForNote 모달

  useEffect(() => {
    if (isOpen && selectedQuestion) {
      const updatedQuestion = data?.find(
        (question) => question.pk === selectedQuestion.pk
      );
      setSelectedQuestion(updatedQuestion || null);
    }
  }, [data]);

  const openModal = (question: QnARow) => {
    setSelectedQuestion(question);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setIsOpen(false);
  };

  const mutationForDeleteQuestionForNote = useMutation(
    (pk: string | number) => {
      // return deleteOneCommentForTaskByPkApi(pk);
      return apiForDeleteQuestionForNote(pk);
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

  const buttonHandlerForDeleteQuestion = (pk: any) => {
    console.log("delete button click !", pk);
    mutationForDeleteQuestionForNote.mutate(pk);
  };

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} p={2}>
        <ModalButtonForAddQuestionForStudNote
          button_text={"Add Question"}
          button_size={"sm"}
          modal_title={"modal for add question"}
          modal_size={"6xl"}
          study_note_pk={study_note_pk}
          refetchForGetQnABoardList={refetchForGetQnABoardList}
        />
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>Title</Th>
            {/* <Th>Content</Th> */}
            <Th>Writer</Th>
            <Th>Page</Th>
            <Th>Created At</Th>
            <Th>Update / Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length ? (
            data.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>
                  <Box
                    cursor="pointer"
                    textDecoration={"underline"}
                    _hover={{ color: "blue.500" }}
                    onClick={() => openModal(row)}
                  >
                    <Text>{row.title}</Text>
                  </Box>
                  {/* 모달을 열기 위한 클릭 핸들러 */}
                </Td>
                {/* <Td>{row.content}</Td> */}
                <Td>{row.writer.username}</Td>
                <Td>{row.page}</Td>
                <Td>{row.created_at_formatted}</Td>
                <Td>
                  <Box display={"flex"} gap={2}>
                    <ModalButtonForUpdateQuestionForNote
                      button_text={"update question"}
                      button_size={"sm"}
                      modal_title={"update question"}
                      modal_size={"6xl"}
                      study_note_pk={study_note_pk}
                      pk={row.pk}
                      title={row.title}
                      content={row.content}
                      page={row.page}
                    />
                    <IconButton
                      onClick={() => buttonHandlerForDeleteQuestion(row.pk)}
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="sm"
                      variant="ghost"
                    />
                  </Box>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5} fontSize={"30px"} textAlign={"center"} py={10}>
                There is No Question!
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* 모달 컴포넌트 */}
      {isOpen && (
        <ModalForQuestionDetailForNote
          isOpen={isOpen}
          closeModal={closeModal}
          question={selectedQuestion}
          refetchForGetQnABoardList={refetchForGetQnABoardList}
        />
      )}
    </Box>
  );
};

export default TableForQnaListForStudyNote;
