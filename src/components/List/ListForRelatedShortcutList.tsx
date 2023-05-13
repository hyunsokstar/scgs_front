import { Box, Table, Thead, Tbody, Tr, Th, Td, Textarea } from "@chakra-ui/react";
import React from "react";

interface Shortcut {
  id: number;
  shortcut_content: string;
  description: string;
  created_at: string;
  shortcut: number;
}

interface ListForRelatedShortcutListProps {
  data: Shortcut[];
}

const ListForRelatedShortcutList: React.FC<ListForRelatedShortcutListProps> = ({
  data,
}) => {
  return (
    <Box>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Shortcut Content</Th>
            <Th>Description</Th>
            <Th>Created At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Textarea defaultValue={item.shortcut_content} />
              </Td>
              <Td>{item.description}</Td>
              <Td>{item.created_at}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ListForRelatedShortcutList;
