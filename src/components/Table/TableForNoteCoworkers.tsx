import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Avatar,
  Switch,
  Box,
} from "@chakra-ui/react";
import { TypeForNoteCoWriter } from "../../types/study_note_type";
import { useState } from "react";

interface IProps {
  noteCowriters: TypeForNoteCoWriter[];
}

const TableForNoteCoworkers = ({ noteCowriters }: IProps) => {
  return (
    <Box overflowY={"scroll"} maxH="120px">
      <Table bgColor={"gray.400"}>
        <Tbody>
          {noteCowriters.map((cowriter) => (
            <Tr key={cowriter.id} p={0}>
              <Td>
                <Checkbox />
              </Td>
              <Td>
                <Avatar
                  name={cowriter.writer.username}
                  src={cowriter.writer.profile_image}
                  size="sm"
                />
              </Td>
              <Td>
                <Switch
                  colorScheme="blue"
                  isChecked={cowriter.is_approved}
                  // onChange={() => handleToggle(cowriter.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForNoteCoworkers;
