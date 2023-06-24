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
// import {
//   QnARow,
// } from "../../types/study_note_type";
// import {
//   apiForGetQnABoardList,
// } from "../../apis/study_note_api";

interface IProps {
  button_text: string;
  button_size: string;
  button_width: string;
  modal_title: string;
  modal_size: string;
}

// 1122
const ModalButtonForErrorReportForNote = ({
  modal_title,
  modal_size,
  button_text,
  button_size,
  button_width,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //   const {
  //     isLoading: isLoadingForGetQnABoardList,
  //     data: dataForGetQnABoardList,
  //     refetch: refetchForGetQnABoardList,
  //   } = useQuery<QnARow[]>(
  //     ["apiForGetQnABoardList", study_note_pk, note_page_num],
  //     apiForGetQnABoardList,
  //     {
  //       enabled: true,
  //       cacheTime: 0, // 캐싱 비활성화
  //     }
  //   );
  //   console.log("dataForGetQnABoardList : ", dataForGetQnABoardList);

  // 2244
  return (
    <>
      {/* <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
        width={button_width}
      >
        {button_text} ({count_for_qna_boards})
      </Button> */}

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
            {/* fix 0623 */}
            {/* <TableForQnaListForStudyNote
              study_note_pk={study_note_pk}
              data={dataForGetQnABoardList}
              refetchForGetQnABoardList={refetchForGetQnABoardList}
            /> */}
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
