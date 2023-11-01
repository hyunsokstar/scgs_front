import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

interface IProps {}

const TableForContentListForRoadMapPk = (props: IProps) => {
  // 예시 데이터 - 여기에 실제 데이터를 넣어주세요
  const data = [
    { id: 1, title: "Title 1", description: "Description 1" },
    { id: 2, title: "Title 2", description: "Description 2" },
    // ... 더 많은 데이터
  ];

  return (
    <div>
      <Table variant="simple" size={"xs"}>
        <TableCaption>Content List for RoadMap</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.title}</Td>
              <Td>{item.description}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default TableForContentListForRoadMapPk;
