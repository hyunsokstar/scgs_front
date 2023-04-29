import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  IconButton,
  Box,
  HStack,
  Spacer,
  Flex,
  Text,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import React, { useState } from "react";

interface ListItemProps {
  order: number;
  title: string;
  content_pk: number
}

interface ListProps {
  items: ListItemProps[];
}

function ListItem({ content_pk, title,order, index }: ListItemProps & { index: number }) {
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

function ListForOrderingStudyNoteContents({ items }: ListProps) {
  const [listItems, setListItems] = useState(items);

  const handleDragEnd = (result: any) => {

    console.log("contentPk : ", result.draggableId);
    console.log("destination : ", result.destination.index + 1);
    console.log("listItems : ", listItems);
    

    if (!result.destination) {
      return;
    }   

    const itemsCopy = [...listItems];
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    console.log("itemsCopy : ", itemsCopy); // 이거 그대로 보내서 order 만 수정하면 됨
    

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
