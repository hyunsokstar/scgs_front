import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { QnARow } from "../../types/study_note_type";
import ModalForQuestionDetailForNote from "../modal/ModalForQuestionDetailForNote"; // 모달 컴포넌트를 임포트하세요.
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface TabelForQnaListForStudyNoteProps {
  study_note_pk: number | string | undefined;
  data: QnARow[] | undefined;
  refetchForGetQnABoardList: () => void;
}

const TableForQnaListForStudyNote: React.FC<
  TabelForQnaListForStudyNoteProps
> = ({ study_note_pk, data, refetchForGetQnABoardList }) => {
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QnARow | null>(null);

  const openModal = (question: QnARow) => {
    setSelectedQuestion(question);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setIsOpen(false);
  };

  return (
    <Box>
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
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      size="sm"
                      variant="ghost"
                    />
                    <IconButton
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
        />
      )}
    </Box>
  );
};

export default TableForQnaListForStudyNote;
