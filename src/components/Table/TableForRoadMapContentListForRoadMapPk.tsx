import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Checkbox,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { apiForGetRoadMapContentListForRoadMapIdForRegister } from "../../apis/study_note_api";
import { DataTypeForRoadMapContentListForRegister } from "../../types/study_note_type";

interface IProps {
  roadMapId: number;
}

const TableForRoadMapContentListForRoadMapPk = ({ roadMapId }: IProps) => {
  const {
    isLoading: loadingForRoadMapContentForRegister,
    data: dataForRoadMapContentForRegister,
    refetch: refetchForRoadMapContenForRegister,
  } = useQuery<DataTypeForRoadMapContentListForRegister>(
    [
      "apiForGetRoadMapContentListForRoadMapIdForRegister",
      roadMapId,
      //   selectedNoteWriter,
      //   first_category,
      //   second_category,
    ],
    apiForGetRoadMapContentListForRoadMapIdForRegister,
    {
      enabled: true,
    }
  );

  console.log(
    "dataForRoadMapContentForRegister : ",
    dataForRoadMapContentForRegister
  );

  if (!dataForRoadMapContentForRegister) {
    return <Box>loading ..</Box>;
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
            <Th>writer</Th>
            <Th>Title</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataForRoadMapContentForRegister.road_map_contents.map((row) => {
            return (
              <Tr>
                <Td>
                  <Checkbox />
                </Td>
                <Td>{row.study_note.writer.username}</Td>
                <Td>{row.study_note.title}</Td>
                <Td>{row.study_note.description}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};

export default TableForRoadMapContentListForRoadMapPk;
