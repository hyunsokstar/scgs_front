import { useEffect, useState } from "react";
import {
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
import { useMutation } from "@tanstack/react-query";
import { apiForGetCommentListForNote } from "../../apis/study_note_api";

interface IProps {
  button_text: string;
  button_size: string;
  modal_title: string;
  study_note_pk: string | undefined;
}

// 1122
const ModalButtonForBriefingBoardForNote = ({
  modal_title,
  button_text,
  button_size,
  study_note_pk,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataForGetCommentListForNote, setDataForGetCommentListForNote] =
    useState<any[]>([]);

    const mutateForGetCommentListForNote = useMutation(
      apiForGetCommentListForNote,
      {
        onSuccess: (data) => {
          // 데이터를 가져온 후 필요한 처리를 수행할 수 있습니다.
          console.log("dataForGetCommentListForNote: ", data);
          setDataForGetCommentListForNote(data);
        },
        onError: (error) => {
          // 에러 처리를 수행할 수 있습니다.
        },
      }
    );

  // fix 0616
  useEffect(() => {
    mutateForGetCommentListForNote.mutate(study_note_pk);
  }, []);

  console.log("dataForGetCommentListForNote : ", dataForGetCommentListForNote);
  

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
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* fix 0616 */}
            여기에 subject list
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

export default ModalButtonForBriefingBoardForNote;
