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
import { apiForGetErrorReportListForStudyNote } from "../../apis/study_note_api";
import { ErrorReportForStudyNoteData } from "../../types/study_note_type";
import TableForErrorReportListForStudyNote from "../Table/TableForErrorReportListForStudyNote";


interface IProps {
  button_text: string;
  button_size: string;
  button_width: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: any;
}

// 1122
const ModalButtonForErrorReportForNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
  study_note_pk,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isLoading: isLoadingForGetErrorReportListForStudyNote,
    data: dataForGetErrorReportListForStudyNote,
    refetch: refetchForGetErrorReportListForStudyNote,
  } = useQuery<ErrorReportForStudyNoteData[]>(
    ["apiForGetErrorReportListForStudyNote", study_note_pk],
    apiForGetErrorReportListForStudyNote,
    {
      enabled: true,
      // cacheTime: 0, // 캐싱 비활성화
    }
  );

  // 2244
  return (
    <>

      <Button
        aria-label="Confirm"
        variant="outline"
        colorScheme="green"
        rounded="md"
        size={button_size}
        width={button_width}
        onClick={onOpen}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <TableForErrorReportListForStudyNote
              data={
                dataForGetErrorReportListForStudyNote &&
                dataForGetErrorReportListForStudyNote
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

export default ModalButtonForErrorReportForNote;
