import React, { useEffect, useState } from "react";
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

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const reorder = (
  list: RowTypeForRoadMapContentForRegister[],
  startIndex: number,
  endIndex: number
): RowTypeForRoadMapContentForRegister[] => {
  const result = Array.from(list);

  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  console.log("result : ", result);

  return result;
};

const grid = 8;

const getItemStyle = (
  draggableStyle: any,
  isDragging: boolean
): React.CSSProperties => ({
  userSelect: "none",
  padding: grid * 2,
  marginBottom: grid,
  background: isDragging ? "lightgreen" : "white",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

interface IProps {
  roadMapId: number;
}

// 1122
const TableForRoadMapContentListForRoadMapPk = ({ roadMapId }: IProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  // step1 checkbox 와 연동할 상태값 설정
  const [checkedIdsForRoadMapContent, setCheckedIdsForRoadMapContent] =
    useState<number[]>([]);

  const [state, setstate] = useState("");
  const [roadMapContentListForRegister, setRoadMapContentListForRegister] =
    useState<RowTypeForRoadMapContentForRegister[]>([]);

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

  // const [items, setItems] = useState<Item[]>(getItems(10));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    // const roadMapListAfterChange = [...roadMapContentListForRegister];
    const newItems = reorder(
      roadMapContentListForRegister,
      result.source.index,
      result.destination.index
    );

    console.log(
      "roadMapContentListForRegister: ",
      roadMapContentListForRegister
    );
    console.log("newItems: ", newItems);

    setRoadMapContentListForRegister(newItems);
    const updatedOrder = newItems.map((item, index) => ({
      id: item.id,
      order: index + 1, // Assuming 'order' starts from 1
    }));

    console.log("updatedOrder : ", updatedOrder);

  };

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
        queryClient.refetchQueries([
          "apiForgetCandidateStudyNoteListForRegisterRoadMap",
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

  useEffect(() => {
    if (dataForRoadMapContentForRegister) {
      setRoadMapContentListForRegister(
        dataForRoadMapContentForRegister.road_map_contents
      );
    }
  }, [dataForRoadMapContentForRegister]);

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
    <Box width={"100%"} border={"2px solid yellow"}>
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

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box
              ref={provided.innerRef}
              width={"100%"}
              border={"2px solid red"}
            >
              <Table
                variant="simple"
                size={"xs"}
                width={"100%"}
                border={"1px solid blue"}
              >
                <TableCaption>Content List for RoadMap</TableCaption>
                <Thead>
                  <Tr>
                    <Th>
                      <Checkbox
                        onChange={handleAllCheck}
                        isChecked={isAllChecked}
                      />
                    </Th>
                    <Th>writer</Th>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Order</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {roadMapContentListForRegister.map((item, index) => (
                    <Draggable
                      key={String(item.id)}
                      {...item}
                      draggableId={String(item.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            provided.draggableProps.style,
                            snapshot.isDragging
                          )}
                        >
                          <Td>
                            <Checkbox
                              isChecked={checkedIdsForRoadMapContent.includes(
                                item.id
                              )}
                              onChange={() => handleRowCheck(item.id)}
                            />
                          </Td>
                          <Td>{item.study_note.writer.username}</Td>
                          <Td>{item.study_note.title}</Td>
                          <Td>{item.study_note.description}</Td>
                          <Td>{item.order}</Td>
                        </Tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Tbody>
              </Table>
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default TableForRoadMapContentListForRoadMapPk;
