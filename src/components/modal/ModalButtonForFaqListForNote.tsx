import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FAQRow } from "../../types/study_note_type";
import { apiForGetFAQBoardList } from "../../apis/study_note_api";
import TableForFAQListForStudyNote from "../Table/TableForFAQListForStudyNote";

interface IProps {
  button_text: string;
  button_size: string;
  button_width: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: any;
  note_page_num?: any;
}

const ModalButtonFaqForNote: React.FC<IProps> = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
  study_note_pk,
  note_page_num,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isLoading: isLoadingForGetFAQBoardList,
    data: dataForGetFAQBoardList,
    refetch: refetchForGetFAQBoardList,
  } = useQuery<FAQRow[]>(
    ["apiForFAQRow", study_note_pk, note_page_num],
    apiForGetFAQBoardList,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

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
            <TableForFAQListForStudyNote
              study_note_pk={study_note_pk}
              data={dataForGetFAQBoardList}
              refetchForGetQnABoardList={refetchForGetFAQBoardList}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonFaqForNote;
