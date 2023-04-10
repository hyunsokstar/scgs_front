import { useEffect, useState } from "react";
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
  Avatar,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";
import { faker } from "@faker-js/faker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { api_for_get_shortcut_list } from "../../apis/api_for_shortcut";
import { Shortcut, ShortcutListResponse } from "../../types/type_for_shortcut";
import ModalButtonForInsertShortCut from "../modal/ModalButtonForInsertShortCut";

// interface ShortCut {
//   writer: string;
//   shortcut: string;
//   description: string;
//   classification?: string;
// }

const TableForShortCut = () => {
  const queryClient = useQueryClient();
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    isLoading: loading_for_shorcut_list,
    data: data_for_shortcut,
    refetch: refetch_for_shortcut_data,
  } = useQuery<ShortcutListResponse>(
    ["get_shortcut_list", currentPageNum],
    api_for_get_shortcut_list,
    {
      enabled: true,
    }
  );

  const [filteredData, setFilteredData] = useState(
    data_for_shortcut?.shortcut_list
  );

  console.log("data_for_shortcut : ", data_for_shortcut);
  console.log("filteredData : ", filteredData);

  useEffect(() => {
    setFilteredData(data_for_shortcut?.shortcut_list);
  }, [data_for_shortcut]);

  // const [shortcuts, setShortcuts] = useState<ShortCut[]>([
  //   {
  //     writer: faker.internet.userName(),
  //     shortcut: faker.random.word(),
  //     description: faker.random.words(5),
  //     classification: "frontend",
  //   },
  //   {
  //     writer: faker.internet.userName(),
  //     shortcut: faker.random.word(),
  //     description: faker.random.words(5),
  //     classification: "backend",
  //   },
  // ]);

  // const handleDelete = (index: number) => {
  //   const newShortcuts = [...shortcuts];
  //   newShortcuts.splice(index, 1);
  //   setShortcuts(newShortcuts);
  // };

  if (loading_for_shorcut_list || !data_for_shortcut) {
    return <Box>Loading for shortcut list..</Box>;
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      py={2}
      border={"1px solid green"}
    >
      <Box display={"flex"} justifyContent={"flex-end"} w={"100%"} pr={2}>
        {/* <IconButton
          aria-label="Add post"
          icon={<AddIcon />}
          variant="outline"
          size="sm"
          _hover={{ backgroundColor: "gray.100" }}
        /> */}
        <ModalButtonForInsertShortCut />
      </Box>

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
          {filteredData?.map((shortcut: Shortcut, index: number) => (
            <Tr key={index}>
              <Td>
                <Checkbox />
              </Td>
              <Td>
                <Avatar
                  size={"sm"}
                  src={shortcut.writer.profile_image}
                  name="user-avatar"
                  borderRadius="full"
                />
              </Td>
              <Td>{shortcut.shortcut}</Td>
              <Td>{shortcut.description}</Td>
              <Td>{shortcut.classification}</Td>
              <Td>
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  variant="outline"
                  colorScheme="pink"
                  // onClick={() => handleDelete(index)}
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
