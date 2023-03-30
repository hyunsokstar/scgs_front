import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Checkbox } from "@chakra-ui/react";
import { ITechNoteListResponse } from "../../types/tech_note_type";
import { useQuery } from "@tanstack/react-query";
import { getTechNoteList } from "../../apis/tech_note_api";

// import { faker } from "@faker-js/faker";

// interface TableRow {
//   id: string;
//   author: string;
//   title: string;
//   category1: string;
//   category2: string;
//   rating: number;
//   views: number;
// }

// const data: TableRow[] = [
//   {
//     id: faker.datatype.uuid(),
//     author: faker.name.fullName(),
//     title: faker.lorem.words(5),
//     category1: 'App Name 1',
//     category2: 'C',
//     rating: 4.5,
//     views: 102,
//   },
//   {
//     id: faker.datatype.uuid(),
//     author: faker.name.fullName(),
//     title: faker.lorem.words(4),
//     category1: 'App Name 2',
//     category2: 'R',
//     rating: 3.2,
//     views: 76,
//   },
// ];

const TableForTechNote = () => {
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);

  const {
    isLoading: LoadingForTechNoteList,
    data: tech_note_list_data,
    refetch: refetch_for_tech_note_list,
  } = useQuery<any>(
    ["getUncompletedTaskList", currentPageNum],
    getTechNoteList,
    {
      enabled: true,
    }
  );

  console.log("tech_note_list_data : ", tech_note_list_data);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>
            <Checkbox />
          </Th>
          <Th>작성자</Th>
          <Th>타이틀</Th>
          <Th>분류1</Th>
          <Th>분류2</Th>
          <Th>rating</Th>
          <Th>조회수</Th>
        </Tr>
      </Thead>
      <Tbody>
        {/* {data.map((row) => (
          <Tr key={row.id}>
            <Td>
              <Checkbox />
            </Td>
            <Td>{row.author}</Td>
            <Td>{row.title}</Td>
            <Td>{row.category1}</Td>
            <Td>{row.category2}</Td>
            <Td>{row.rating}</Td>
            <Td>{row.views}</Td>
          </Tr>
        ))} */}
      </Tbody>
    </Table>
  );
};

export default TableForTechNote;
