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
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";
import { faker } from "@faker-js/faker";
import { useQuery } from "@tanstack/react-query";
import {
  apiFordeleteShortcut,
} from "../../apis/api_for_shortcut";
import { Shortcut, ShortcutListResponse } from "../../types/type_for_shortcut2";
import ModalButtonForInsertShortCut from "../modal/ModalButtonForInsertShortCut";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFordeleteShortcut2, api_for_get_shortcut_list2 } from "../../apis/api_for_shortcut2";

// interface ShortCut {
//   writer: string;
//   shortcut: string;
//   description: string;
//   classification?: string;
// }

// 1122
const TableForShortCut2 = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    isLoading: loading_for_shorcut_list,
    data: data_for_shortcut,
    refetch: refetch_for_shortcut_data,
  } = useQuery<ShortcutListResponse>(
    ["get_shortcut_list2", currentPageNum],
    api_for_get_shortcut_list2,
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

  const mutationForDeleteShortCut = useMutation(
    (shorcut_pk: number) => {
      return apiFordeleteShortcut2(shorcut_pk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        // refetch_for_api_docu();
        queryClient.refetchQueries(["get_shortcut_list2"]);

        toast({
          title: "delete api docu 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteHandlerForShortCut = (pk: number) => {
    console.log("hi");
    mutationForDeleteShortCut.mutate(pk);
  };

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
            <Tr key={shortcut.id}>
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
                  onClick={() => deleteHandlerForShortCut(shortcut.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForShortCut2;
