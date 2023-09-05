import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { apiForGetSuggestionListForNote } from "../../apis/study_note_api";
import { useQuery } from "@tanstack/react-query";
import SuggestionListForNote from "../List/SuggestionListForNote";

interface ModalButtonProps {
  button_text: string;
  button_size: string;
  button_width: string;
  modal_size: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  study_note_pk: any;
}

function ModalButtonForNoteSuggestion(props: ModalButtonProps) {
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const { button_text, button_size, button_width, modal_size, study_note_pk } =
    props;
  const [isOpen, setIsOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  // alert(study_note_pk);

  const {
    isLoading: isLoadingForGetsuggestion,
    data: suggestionData,
    refetch: refetchForGetsuggestion,
  } = useQuery<any>(
    ["apiForGetSuggestionList", study_note_pk, pageNum],
    apiForGetSuggestionListForNote,
    {
      enabled: true,
      cacheTime: 0, // 캐싱 비활성화
    }
  );

  console.log("suggestionData : ", suggestionData);

  return (
    <Box>
      <Button
        variant={"outline"}
        onClick={onOpen}
        border={"1px solid black"}
        _hover={{ bgColor: "yellow.100" }}
        size={button_size}
        width={button_width}
      >
        {button_text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={modal_size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>모달 제목</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box>
              <SuggestionListForNote
                suggestionList={suggestionData?.suggestionList}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ModalButtonForNoteSuggestion;
