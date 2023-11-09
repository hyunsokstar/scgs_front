import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
import { FaSort, FaTimes } from "react-icons/fa";
import { DataForStudyNoteContent } from "../../types/study_note_type";
import ListForOrderingStudyNoteContents from "../List/ListForOrderingStudyNoteContents";

interface ListItemProps {
  order: number;
  title: string;
}


interface ModalButtonProps {
  study_note_pk: string | undefined;
  currentPage: number;
  data_for_study_note_contents: DataForStudyNoteContent[];
}

function ModalButtonForStudyNoteContentOrdering({
  study_note_pk,
  currentPage,
  data_for_study_note_contents,
}: ModalButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [items, setItems] = useState(
    data_for_study_note_contents.map((data, index) => ({
      content_pk: data.pk,
      order: data.order,
      title: data.title,
    }))
  );

  useEffect(() => {
    const items_for_update = data_for_study_note_contents.map(
      (data, index) => ({
        content_pk: data.pk,
        order: data.order,
        title: data.title,
      })
    );
    setItems(items_for_update);
  }, [data_for_study_note_contents]);

  const handleSaveOrdering = () => {
    const newOrdering = items.map((item, index) => {
      return {
        ...data_for_study_note_contents[index],
        order: item.order,
      };
    });
    console.log("New Ordering: ", newOrdering);
    onClose();
  };

  return (
    <>
      <Button
        size="sm"
        colorScheme="blue"
        variant="outline"
        _hover={{ backgroundColor: "blue.50" }}
        onClick={onOpen}
        leftIcon={<FaSort />}
      >
        Ordering
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="1px" borderColor="gray.100">
            <HStack>
              <Box>Modal For Ordering</Box>
              <Spacer />
              <Box textAlign={"right"}>
                <IconButton
                  size="sm"
                  aria-label="Close modal"
                  variant="outline"
                  bgColor="transparent"
                  _hover={{ bgColor: "pink.50" }}
                  icon={<FaTimes />}
                  onClick={onClose}
                />
              </Box>
            </HStack>
          </ModalHeader>
          <ModalBody bg="white" p={4}>
            {/* <List items={items} /> */}
            <ListForOrderingStudyNoteContents
              study_note_pk={study_note_pk}
              currentPage={currentPage}
              items={items}
            />
          </ModalBody>
          <ModalFooter bg="pink.50" borderTop="1px" borderColor="gray.100">
            <Button colorScheme="blue" onClick={handleSaveOrdering}>
              Save Ordering
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalButtonForStudyNoteContentOrdering;
