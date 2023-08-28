import React, { useState } from "react";
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
import PaginationComponent from "../PaginationComponent";

interface IProps {
  button_text: string;
  button_size: string;
  button_width: string;
  modal_title: string;
  modal_size: string;
  study_note_pk: any;
}

const ModalButtonFaqForNote: React.FC<IProps> = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
  study_note_pk,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pageNum, setPageNum] = useState(1);

  const {
    isLoading: isLoadingForGetFAQBoardList,
    data: faqData,
    refetch: refetchForGetFAQBoardList,
  } = useQuery<any>(
    ["apiForGetFAQBoardList", study_note_pk, pageNum],
    apiForGetFAQBoardList,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("faqData : ", faqData);

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
            {faqData ? (
              <TableForFAQListForStudyNote
                study_note_pk={study_note_pk}
                data={faqData.faqList}
                refetchForGetQnABoardList={refetchForGetFAQBoardList}
              />
            ) : (
              ""
            )}

            {faqData ? (
              <PaginationComponent
                current_page_num={pageNum}
                setCurrentPageNum={setPageNum}
                total_page_num={faqData.totalFaqCount}
                task_number_for_one_page={faqData.perPage}
              />
            ) : (
              ""
            )}
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
