import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { QnARow } from "../../types/study_note_type";
import ModalButtonForAddQuestionForStudNote from "../modal/ModalButtonForAddQuestionForStudNote";
import ModalButtonForUpdateQuestionForNote from "../modal/ModalButtonForUpdateQuestionForNote";

interface TabelForQnaListForStudyNoteProps {
  study_note_pk: number | string | undefined;
  data: QnARow[] | undefined;
  refetchForGetQnABoardList: () => void;
}

// 1122
const TableForQnaListForStudyNote: React.FC<
  TabelForQnaListForStudyNoteProps
> = ({ study_note_pk, data, refetchForGetQnABoardList }) => {
  const buttonHandlerForAddQuestion = () => {};

  // 2244
  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} my={2}>
        <ModalButtonForAddQuestionForStudNote
          button_text={"add question"}
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
            <Th>page</Th>
            <Th>Created At</Th>
            <Th> update/ delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length ? (
            data.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>{row.title}</Td>
                {/* <Td>{row.content}</Td> */}
                <Td>{row.writer.username}</Td>
                <Td>{row.page}</Td>
                <Td>{row.created_at_formatted}</Td>
                <Td>
                  <ModalButtonForUpdateQuestionForNote
                    button_text={"update for question"}
                    button_size={"sm"}
                    modal_title={"update for question"}
                    modal_size={"6xl"}
                    study_note_pk={study_note_pk}
                    pk={row.pk}
                    title={row.title}
                    content={row.content}
                    page={row.page}
                  />

                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    size="sm"
                    variant="ghost"
                  />
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={5} fontSize={"30px"} textAlign={"center"} py={10}>
                There is No Question !
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForQnaListForStudyNote;
