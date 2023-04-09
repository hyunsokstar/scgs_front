import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { faker } from "@faker-js/faker";

interface ShortCut {
  writer: string;
  shortcut: string;
  description: string;
  classification?: string;
}

const TableForShortCut = () => {
  const [shortcuts, setShortcuts] = useState<ShortCut[]>([
    {
      writer: faker.internet.userName(),
      shortcut: faker.random.word(),
      description: faker.random.words(5),
      classification: "frontend",
    },
    {
      writer: faker.internet.userName(),
      shortcut: faker.random.word(),
      description: faker.random.words(5),
      classification: "backend",
    },
  ]);

  const handleDelete = (index: number) => {
    const newShortcuts = [...shortcuts];
    newShortcuts.splice(index, 1);
    setShortcuts(newShortcuts);
  };

  return (
    <Box
      border={"1px solid green"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      py={2}
    >
      <Table size="sm" variant="simple" colorScheme="teal" w={"90%"}>
        <Thead>
          <Tr>
            <Th fontFamily="monospace" fontSize="lg" color="teal.500">
              <Checkbox />
            </Th>
            <Th fontFamily="monospace" fontSize="lg" color="teal.500">
              Writer
            </Th>
            <Th fontFamily="monospace" fontSize="lg" color="teal.500">
              Shortcut
            </Th>
            <Th fontFamily="monospace" fontSize="lg" color="teal.500">
              Description
            </Th>
            <Th fontFamily="monospace" fontSize="lg" color="teal.500">
              Classification
            </Th>
            <Th> </Th>
          </Tr>
        </Thead>
        <Tbody>
          {shortcuts.map((shortcut, index) => (
            <Tr key={index}>
              <Td>
                <Checkbox />
              </Td>
              <Td>{shortcut.writer}</Td>
              <Td>{shortcut.shortcut}</Td>
              <Td>{shortcut.description}</Td>
              <Td>{shortcut.classification}</Td>
              <Td>
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  variant="outline"
                  colorScheme="pink"
                  onClick={() => handleDelete(index)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForShortCut;
