import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  VStack,
  Box,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { ITechNote, ITechNoteListResponse } from "../../types/tech_note_type";
import { useQuery } from "@tanstack/react-query";
import {
  deleteTechNoteListByPk,
  getTechNoteList,
} from "../../apis/tech_note_api";
import PaginationComponent from "../PaginationComponent";
import PaginationComponentForTechNote from "../Pagination/PaginationComponentForTechNote";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalButonForModofyTechNoteTitle from "../modal/ModalButtonForModofyTechNoteTitle";
import ModalButtonForDeleteTechNoteList from "../modal/ModalButtonForDeleteTechNoteList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalButtonForCreateTechNoteList from "../modal/ModalButtonForCreateTechNoteList";

// import { faker } from "@faker-js/faker";

// interface TableRow {
//   id: string;
//   author: string;
//   title: string;
//   category1: string;
//   rating: number;
//   views: number;
// }

// const data: TableRow[] = [
//   {
//     id: faker.datatype.uuid(),
//     author: faker.name.fullName(),
//     title: faker.lorem.words(5),
//     category1: 'App Name 1',
//     rating: 4.5,
//     views: 102,
//   },
//   {
//     id: faker.datatype.uuid(),
//     author: faker.name.fullName(),
//     title: faker.lorem.words(4),
//     category1: 'App Name 2',
//     rating: 3.2,
//     views: 76,
//   },
// ];

const TableForTechNote = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    isLoading: LoadingForTechNoteList,
    data: tech_note_list_data,
    refetch: refetch_for_tech_note_list,
  } = useQuery<ITechNoteListResponse>(
    ["getTechNoteList", currentPageNum],
    getTechNoteList,
    {
      enabled: true,
    }
  );

  console.log("tech_note_list_data : ", tech_note_list_data);

  const deleteMutationForTechNoteListByPk = useMutation(
    (techNotePk: number) => {
      return deleteTechNoteListByPk(techNotePk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        queryClient.refetchQueries(["getTechNoteList"]);

        toast({
          title: "delete tech note 성공 !",
          status: "success",
        });
      },
    }
  );

  const handleTechNoteListDelete = (techNotePk: number) => {
    deleteMutationForTechNoteListByPk.mutate(techNotePk);
  };

  return (
    <VStack>
      <Box
        display={"flex"}
        justifyContent="space-between"
        border={"0px solid green"}
        width="100%"
        pr={9}
        pl={2}
      >
        <Box>
          총 {tech_note_list_data?.total_count_for_tech_note_table_rows} 개
        </Box>
        <Box>
          <ModalButtonForCreateTechNoteList />
        </Box>
      </Box>

      <Table variant="simple" size={"sm"} width="100%">
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>작성자</Th>
            <Th>타이틀</Th>
            <Th>분류</Th>
            <Th>평점</Th>
            <Th>조회수</Th>
            <Th>수정/삭제</Th>
          </Tr>
        </Thead>

        <Tbody>
          {tech_note_list_data?.tech_note_list_for_page
            ? tech_note_list_data.tech_note_list_for_page.map(
                (row: ITechNote) => (
                  <Tr key={row.pk}>
                    <Td>
                      <Checkbox />
                    </Td>
                    <Td>{row.author}</Td>
                    <Td>{row.title}</Td>
                    <Td>{row.category}</Td>
                    <Td>{row.like_count}</Td>
                    <Td>{row.view_count}</Td>
                    <Td>
                      {/* <IconButton
                        icon={<EditIcon />}
                        aria-label="수정"
                        variant="outline"
                        borderColor="green.500"
                        _hover={{ bg: "green.100" }}
                        _active={{ bg: "green.200" }}
                        size="xs"
                      /> */}
                      <ModalButonForModofyTechNoteTitle techNotePk={row.pk} />

                      <ModalButtonForDeleteTechNoteList
                        onDelete={() => handleTechNoteListDelete(row.pk)}
                      />
                    </Td>
                  </Tr>
                )
              )
            : "no data"}
        </Tbody>
      </Table>
      {tech_note_list_data ? (
        <Box maxW="100%" bg="blue.50" color="red.500" mt={-3.5}>
          <PaginationComponentForTechNote
            current_page_num={currentPageNum}
            total_page_num={
              tech_note_list_data.total_count_for_tech_note_table_rows
            }
            setCurrentPageNum={setCurrentPageNum}
          />
        </Box>
      ) : (
        ""
      )}
    </VStack>
  );
};

export default TableForTechNote;
