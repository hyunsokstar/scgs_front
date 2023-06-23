import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ITypeForClassRoomRowForStudyNote } from "../../types/study_note_type";
import { apiForGetClassRoomList } from "../../apis/study_note_api";
import TableForClassRoomListForStudyNote from "../Table/TableForClassRoomListForStudyNote";

interface IProps {
  button_text: string;
  button_size: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | number | undefined;
}

// 1122
const ModalButtonForClassRoomListForStudyNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  study_note_pk,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isLoading: isLoadingForGetClassRoomList,
    data: dataForGetClassRoomList,
    refetch: refetchForGetClassRoomList,
  } = useQuery<ITypeForClassRoomRowForStudyNote[]>(
    ["apiForGetClassRoomList", study_note_pk],
    apiForGetClassRoomList,
    {
      enabled: true,
    }
  );

  if (isLoadingForGetClassRoomList) {
    return <Box>Loading..</Box>;
  }

  // 2244
  return (
    <>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
      >
        {button_text}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* fix 0616 */}
            {/* 여기에 subject list */}
            <TableForClassRoomListForStudyNote
              study_note_pk={study_note_pk ? study_note_pk : 1}
              dataForGetClassRoomList={
                dataForGetClassRoomList && dataForGetClassRoomList
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForClassRoomListForStudyNote;
