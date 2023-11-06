import { Box, HStack, Spacer, useToast, Flex, Text } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import React, { useState } from "react";
import { apiForReOrderForStudyNoteContentsForSpecificNoteAndPage } from "../../apis/study_note_api";

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
}: ListItemProps & { index: number }) {
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
        >
          <Text mr={4}>{order}</Text>
          <Text>{title}</Text>
        </Flex>
      )}
    </Draggable>
  );
}

// 1122
function ListForOrderingStudyNoteContents({
  study_note_pk,
  currentPage,
  items,
}: ListProps) {
  const [listItems, setListItems] = useState(items);
  const queryClient = useQueryClient();
  const toast = useToast();

  //  mutationForUpdateRoadMapListOrder
  //  roadMapId, updatedRoadMapOrderList
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

  const handleDragEnd = (result: any) => {
    console.log("contentPk : ", result.draggableId);
    console.log("destination : ", result.destination.index + 1);
    console.log("listItems : ", listItems);

    if (!result.destination) {
      return;
    }

    const itemsCopy = [...listItems];

    console.log("itemsCopy : ", itemsCopy); // 이거 그대로 보내서 order 만 수정하면 됨

    mutationForReOrderForStudyNoteContentsForSpecificNoteAndPage.mutate({
      study_note_pk,
      currentPage,
      items: itemsCopy,
    });

    setListItems(itemsCopy);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {listItems.map((item, index) => (
              <ListItem key={item.order} {...item} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ListForOrderingStudyNoteContents;
