import React from "react";
import {
  Box,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { apiForRoadMapContentListForRegister } from "../../apis/study_note_api";
import { DataTypeForRoadMapContentListForRegister } from "../../types/study_note_type";

interface IProps {
  roadMapId: number;
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleString("ko-KR", options);
}

const TableForContentListForRoadMapPk = ({ roadMapId }: IProps) => {
  const {
    isLoading: isRoadingForRoadMapContentForRegister,
    data: dataForRoadMapContentForRegister,
    refetch: refetchDataForLoadMapContentForRegister,
  } = useQuery<DataTypeForRoadMapContentListForRegister>(
    ["apiForGetRoloadMapListForRegister", roadMapId],
    apiForRoadMapContentListForRegister,
    {
      enabled: true,
    }
  );

  console.log(
    "dataForRoadMapContentForRegister : ",
    dataForRoadMapContentForRegister
  );

  if (!dataForRoadMapContentForRegister) {
    return <Box>Loading..</Box>;
  }

  return (
    <>
      road map id: {roadMapId}
      <Table variant="simple" size={"xs"}>
        <TableCaption>Content List for RoadMap</TableCaption>
        <Thead>
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>Writer</Th>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>created_at</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataForRoadMapContentForRegister.road_map_contents.map((row) => (
            <Tr key={row.study_note.id}>
              <Td>
                <Checkbox />
              </Td>
              <Td>{row.study_note.writer.username}</Td>
              <Td>{row.study_note.title}</Td>
              <Td>{row.study_note.description}</Td>
              <Td>{formatDate(row.study_note.created_at)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default TableForContentListForRoadMapPk;
