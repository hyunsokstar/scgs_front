import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Table,
  Tr,
  Td,
} from "@chakra-ui/react";
import { FAQRow } from "../../types/study_note_type";
import { apiForGetCommentListForFaqBoardForNote } from "../../apis/study_note_api";
import CommentListForFaqBoard from "../Comments/CommentListForFaqBoard";


interface ModalForFAQDetailForNoteProps {
  isOpen: boolean;
  closeModal: () => void;
  faqData: FAQRow;
  refetchForGetQnABoardList: () => void;
}

const ModalForFAQDetailForNote: React.FC<ModalForFAQDetailForNoteProps> = ({
  isOpen,
  closeModal,
  faqData,
}) => {

  const {
    isLoading: isLoadingForGetComment,
    data: commentData,
    refetch: refetchForGetCommentData,
  } = useQuery<any>(
    ["apiForGetCommentListForFaqBoard", faqData.pk],
    apiForGetCommentListForFaqBoardForNote,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("faqData.pk : ", faqData.pk);

  console.log("commentData :::::::::: ", commentData);
  

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="7xl">
      <ModalOverlay />
      <ModalContent>

        <ModalHeader>FAQDetail </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Box>
            <Table>
              <Tr>
                <Td>
                  <strong>Title:</strong>
                </Td>
                <Td>{faqData.title}</Td>
              </Tr>
              <Tr>
                <Td>
                  <strong>Content:</strong>
                </Td>
                <Td dangerouslySetInnerHTML={{ __html: faqData.content }}></Td>
              </Tr>
            </Table>
          </Box>

          <CommentListForFaqBoard commentList={commentData?.comments} />

        </ModalBody>

      </ModalContent>
    </Modal>
  );
};

export default ModalForFAQDetailForNote;