import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Spacer,
  useToast,
  Flex,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForReOrderForStudyNoteContentsForSpecificNoteAndPage } from "../../apis/study_note_api";
import ModalButtonForMoveCheckedNoteContentsToSelectedPage from "../modal/ModalButtonForMoveCheckedNoteContentsToSelectedPage";

interface ListItemProps {
  order: number;
  title: string;
  content_pk: number;
}

interface ListProps {
  study_note_pk: string | undefined;
  currentPage: number;
  items: ListItemProps[];
}

function ListItem({
  content_pk,
  title,
  order,
  index,
  isChecked,
  onCheckboxChange,
}: ListItemProps & {
  index: number;
  isChecked: boolean;
  onCheckboxChange: (content_pk: number) => void;
}) {
  const handleCheckboxChange = () => {
    onCheckboxChange(content_pk);
  };

  return (
    <Draggable draggableId={content_pk.toString()} index={index}>
      {(provided) => (
        <Flex
          p={2}
          _hover={{ bg: "blue.50" }}
          cursor="pointer"
          borderBottom="1px"
          borderColor="gray.100"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          gap={3}
        >
          <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
          <Text>{content_pk}</Text>
          <Text mr={4}>{order}</Text>
          <Text>{title}</Text>
        </Flex>
      )}
    </Draggable>
  );
}

function ListForOrderingStudyNoteContents({
  study_note_pk,
  currentPage,
  items,
}: ListProps) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const toast = useToast();

  const [allChecked, setAllChecked] = useState(false);

  const handleAllCheckboxChange = () => {
    setAllChecked(!allChecked);
    if (!allChecked) {
      const allIds = items.map((item) => item.content_pk.toString());
      setCheckedIds(allIds);
    } else {
      setCheckedIds([]);
    }
  };

  const mutationForReOrderForStudyNoteContentsForSpecificNoteAndPage =
    useMutation(apiForReOrderForStudyNoteContentsForSpecificNoteAndPage, {
      onSuccess: (result: any) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["apiForGetStuyNoteContentList"]);

        toast({
          status: "success",
          title:
            "ReOrder For StudyNoteContents For SpecificNoteAndPage success",
          description: result.message,
        });
      },
    });

  const handleCheckboxChange = (content_pk: number) => {
    const updatedCheckedIds = [...checkedIds]; // 새로운 배열 생성
    const contentPkStr = content_pk.toString();

    if (updatedCheckedIds.includes(contentPkStr)) {
      setCheckedIds(updatedCheckedIds.filter((id) => id !== contentPkStr));
    } else {
      setCheckedIds([...updatedCheckedIds, contentPkStr]);
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    let itemsCopy = Array.from(items);
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const [removed] = itemsCopy.splice(startIndex, 1);
    itemsCopy.splice(endIndex, 0, removed);

    itemsCopy = itemsCopy.map((item, index) => ({
      order: index + 1,
      title: item.title,
      content_pk: item.content_pk,
    }));

    mutationForReOrderForStudyNoteContentsForSpecificNoteAndPage.mutate({
      study_note_pk,
      currentPage,
      items: itemsCopy,
    });
  };

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"} px={2}>
        {/* todo : 아래 체크 박스 클릭하면 items 의 모든 요소들의 content_pk가 updatedCheckedIds 에 추가 되도록 즉 all check 되도록 하기 all check 해제 구현*/}
        <Checkbox onChange={handleAllCheckboxChange} isChecked={allChecked}>
          &nbsp;
          {checkedIds ? checkedIds.length + "개" : ""}
        </Checkbox>

        <ModalButtonForMoveCheckedNoteContentsToSelectedPage
          items={items}
          checkedIds={checkedIds}
          study_note_pk={study_note_pk}
          currentPage={currentPage}
          setCheckedIds={setCheckedIds}
        />
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <ListItem
                  key={item.order}
                  index={index}
                  isChecked={checkedIds.includes(item.content_pk.toString())}
                  onCheckboxChange={handleCheckboxChange}
                  content_pk={item.content_pk}
                  order={item.order}
                  title={item.title}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default ListForOrderingStudyNoteContents;
