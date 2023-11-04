import React, { useState } from "react";
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
import {
  DataTypeForRoadMapContentListForRegister,
  RowTypeForRoadMapContentForRegister,
} from "../../types/study_note_type";

interface IProps {
  roadMapId: number;
}

const TableForRoadMapContentListForRoadMapPk = ({ roadMapId }: IProps) => {
  // step1 checkbox 와 연동할 상태값 설정
  const [checkedIdsForRoadMap, setCheckedIdsForRoadMap] = useState<number[]>(
    []
  );

  const {
    isLoading: loadingForRoadMapContentForRegister,
    data: dataForRoadMapContentForRegister,
    refetch: refetchForRoadMapContenForRegister,
  } = useQuery<DataTypeForRoadMapContentListForRegister>(
    ["apiForGetRoadMapContentListForRoadMapIdForRegister", roadMapId],
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

  // step5 전체 체크 박스 상태 설정
  const isAllChecked =
    dataForRoadMapContentForRegister &&
    dataForRoadMapContentForRegister.road_map_contents.length > 0 &&
    checkedIdsForRoadMap.length ===
      dataForRoadMapContentForRegister.road_map_contents.length;

  // step5 전체 체크 이벤트 설정
  const handleAllCheck = () => {
    if (isAllChecked) {
      setCheckedIdsForRoadMap([]);
    } else {
      const allIds = dataForRoadMapContentForRegister.road_map_contents.map(
        (row) => row.id
      );
      setCheckedIdsForRoadMap(allIds);
    }
  };

  // step3 개별 체크 박스 체크 이벤트 함수 설정
  const handleRowCheck = (rowId: number) => {
    let updatedIds = [...checkedIdsForRoadMap];
    if (checkedIdsForRoadMap.includes(rowId)) {
      updatedIds = updatedIds.filter((id) => id !== rowId);
    } else {
      updatedIds.push(rowId);
    }
    setCheckedIdsForRoadMap(updatedIds);
  };

  return (
    <>
      road map id: {roadMapId}
      <Table variant="simple" size={"xs"}>
        <TableCaption>Content List for RoadMap</TableCaption>
        <Thead>
          <Tr>
            <Th>
              {/* step4 전체 체크 박스 박스 설정 */}
              <Checkbox onChange={handleAllCheck} isChecked={isAllChecked} />
            </Th>
            <Th>writer</Th>
            <Th>Title</Th>
            <Th>Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataForRoadMapContentForRegister
            ? dataForRoadMapContentForRegister.road_map_contents.map(
                (row: RowTypeForRoadMapContentForRegister) => {
                  return (
                    <Tr>
                      <Td>
                        {/* step2: 개별 checkbox 와 상태값 연동 + 체인지 이벤트 설정 */}
                        <Checkbox
                          isChecked={checkedIdsForRoadMap.includes(row.id)}
                          onChange={() => handleRowCheck(row.id)}
                        />
                      </Td>
                      <Td>{row.study_note.writer.username}</Td>
                      <Td>{row.study_note.title}</Td>
                      <Td>{row.study_note.description}</Td>
                    </Tr>
                  );
                }
              )
            : "no contents"}
        </Tbody>
      </Table>
    </>
  );
};

export default TableForRoadMapContentListForRoadMapPk;
