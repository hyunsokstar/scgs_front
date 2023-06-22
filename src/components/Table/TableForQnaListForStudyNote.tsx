import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import { QnARow } from "../../types/study_note_type";

interface TabelForQnaListForStudyNoteProps {
  data: QnARow[];
}

const TableForQnaListForStudyNote: React.FC<
  TabelForQnaListForStudyNoteProps
> = ({ data }) => {
  return (
    <Box>
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
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>
                <Checkbox />
              </Td>
              <Td>{row.title}</Td>
              <Td>{row.content}</Td>
              <Td>{row.writer.username}</Td>
              <Td>{row.created_at}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForQnaListForStudyNote;
