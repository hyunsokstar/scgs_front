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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ITypeForClassRoomRowForStudyNote } from "../../types/study_note_type";
import { apiForGetClassRoomList } from "../../apis/study_note_api";
import TableForClassRoomListForStudyNote from "../Table/TableForClassRoomListForStudyNote";

interface IProps {
  button_text: string;
  button_size: string;
  button_width: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: string | number | undefined;
  count_for_class_list: number;
}

// 1122
const ModalButtonForClassRoomListForStudyNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  study_note_pk,
  button_width,
  count_for_class_list,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isLoading: isLoadingForGetClassRoomList,
    data: dataForClassRoom,
    refetch: refetchForGetClassRoomList,
  } = useQuery<any>(
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
        width={button_width}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
        display="flex"
        justifyContent="space-between" // 양쪽 끝에 정렬하도록 지정
        px={2}
      >
        <Text>{button_text}</Text>
        <Text>({count_for_class_list})</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* fix 0616 */}
            {/* 여기에 subject list */}
            {/* withdraw is_registered*/}
            <TableForClassRoomListForStudyNote
              study_note_pk={study_note_pk ? study_note_pk : 1}
              dataForGetClassRoomList={
                dataForClassRoom && dataForClassRoom.class_room_list
              }
              is_registered={dataForClassRoom.is_registered}
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
