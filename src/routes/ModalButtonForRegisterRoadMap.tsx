import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Divider,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import TableForRoadMapContentListForRoadMapPk from "../components/Table/TableForRoadMapContentListForRoadMapPk";
import TableForCandidateStudyNoteListForRegisterRoadMap from "../components/Table/TableForCandidateStudyNoteListForRegisterRoadMap";

interface IProps {
  button_text: string;
  roadMapId: number;
}

// 1122
const ModalButtonForRegisterRoadMap = ({ button_text, roadMapId }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [checkedIdsForNoteList, setCheckedIdsForNoteList] = useState<number[]>(
    []
  );

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const buttonHandlerForModalOpen = () => {
    onOpen();
  };

  // 2244
  return (
    <>
      <Button
        variant="outline"
        colorScheme="blue"
        flex={1}
        onClick={buttonHandlerForModalOpen}
      >
        {button_text} ({roadMapId})
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <Flex>
              <Divider orientation="vertical" borderColor="gray.300" />
              <Box flex={1} border="1px dashed" borderColor="gray.300" m={1}>
                table for road map register <br />
                <TableForRoadMapContentListForRoadMapPk roadMapId={roadMapId}/>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button
                  leftIcon={<ChevronLeftIcon />}
                  fontSize={"lg"}
                  size={"sm"}
                ></Button>
                
              </Box>
              <Box flex={1} border="1px dashed" borderColor="gray.300" m={1}>
                <Box>right side</Box>
                <br />
                <Box>
                  <TableForCandidateStudyNoteListForRegisterRoadMap
                    checkedIdsForNoteList={checkedIdsForNoteList}
                    setCheckedIdsForNoteList={setCheckedIdsForNoteList}
                    roadMapId={roadMapId}
                  />
                </Box>
              </Box>
              <Divider orientation="vertical" borderColor="gray.300" />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForRegisterRoadMap;
