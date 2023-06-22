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
} from "@chakra-ui/react";
import { QnARow } from "../../types/study_note_type";
import ModalButtonForAddQuestionForStudNote from "../modal/ModalButtonForAddQuestionForStudNote";

interface TabelForQnaListForStudyNoteProps {
  study_note_pk: number | string | undefined;
  data: QnARow[] | undefined;
}

// 1122
const TableForQnaListForStudyNote: React.FC<
  TabelForQnaListForStudyNoteProps
> = ({ study_note_pk, data }) => {
  const buttonHandlerForAddQuestion = () => {};

  // 2244
  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} my={2}>
        {/* <Button onClick={buttonHandlerForAddQuestion}>add question</Button> */}
        <ModalButtonForAddQuestionForStudNote
          button_text={"add question"}
          button_size={"sm"}
          modal_title={"modal for add question"}
          modal_size={"6xl"}
          study_note_pk={study_note_pk}
        />
      </Box>

      <Table>
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>Title</Th>
            <Th>Content</Th>
            <Th>Writer</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length ? (
            data.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>{row.title}</Td>
                <Td>{row.content}</Td>
                <Td>{row.writer.username}</Td>
                <Td>{row.created_at}</Td>
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
