import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import {
  apiForDeleteRoadMapContentForCheckedIds,
  apiForGetRoadMapContentListForRoadMapIdForRegister,
} from "../../apis/study_note_api";
import {
  DataTypeForRoadMapContentListForRegister,
  RowTypeForRoadMapContentForRegister,
} from "../../types/study_note_type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface IProps {
  roadMapId: number;
}

const TableForRoadMapContentListForRoadMapPk = ({ roadMapId }: IProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // step1 checkbox 와 연동할 상태값 설정
  const [checkedIdsForRoadMapContent, setCheckedIdsForRoadMapContent] =
    useState<number[]>([]);

  // apiForDeleteRoadMapContentForCheckedIds
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

  const mutationForDeleteRoadMapContentForCheckedIds = useMutation(
    () => {
      return apiForDeleteRoadMapContentForCheckedIds(
        roadMapId,
        checkedIdsForRoadMapContent
      );
    },
    {
      onSettled: () => {},
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries([
          "apiForGetRoadMapContentListForRoadMapIdForRegister",
        ]);

        toast({
          title: "delete roadmap content 성공!",
          status: "success",
          description: data.message,
          duration: 1800,
          isClosable: true,
        });
      },
    }
  );

  const deleteRoadMapContentHandlerForCheckedIds = () => {
    mutationForDeleteRoadMapContentForCheckedIds.mutate();
  };

  if (!dataForRoadMapContentForRegister) {
    return <Box>loading ..</Box>;
  }

  // step5 전체 체크 박스 상태 설정
  const isAllChecked =
    dataForRoadMapContentForRegister &&
    dataForRoadMapContentForRegister.road_map_contents.length > 0 &&
    checkedIdsForRoadMapContent.length ===
      dataForRoadMapContentForRegister.road_map_contents.length;

  // step6 전체 체크 이벤트 설정
  const handleAllCheck = () => {
    if (isAllChecked) {
      setCheckedIdsForRoadMapContent([]);
    } else {
      const allIds = dataForRoadMapContentForRegister.road_map_contents.map(
        (row) => row.id
      );
      setCheckedIdsForRoadMapContent(allIds);
    }
  };

  // step3 개별 체크 박스 체크 이벤트 함수 설정
  const handleRowCheck = (rowId: number) => {
    let updatedIds = [...checkedIdsForRoadMapContent];
    if (checkedIdsForRoadMapContent.includes(rowId)) {
      updatedIds = updatedIds.filter((id) => id !== rowId);
    } else {
      updatedIds.push(rowId);
    }
    setCheckedIdsForRoadMapContent(updatedIds);
  };

  return (
    <>
      {checkedIdsForRoadMapContent.length > 0 ? (
        <Box textAlign="right" m="2">
          <Button
            variant="outline"
            borderColor="blue"
            size="md"
            onClick={deleteRoadMapContentHandlerForCheckedIds}
          >
            delete for check
          </Button>
        </Box>
      ) : (
        ""
      )}

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
                          isChecked={checkedIdsForRoadMapContent.includes(
                            row.id
                          )}
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
