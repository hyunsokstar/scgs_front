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
import { apiForGetCommentListForNote } from "../../apis/study_note_api";
import ChatStyleBoardForBriefingBoard from "../ChatStyleBoard/ChatStyleBoardForBriefingBoard";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  button_text: string;
  button_size: string;
  modal_title: string;
  study_note_pk: string | undefined;
  note_owner_user_name: string;
}

// 1122
const ModalButtonForBriefingBoardForNote = ({
  modal_title,
  button_text,
  button_size,
  study_note_pk,
  note_owner_user_name,
}: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [dataForGetCommentListForNote, setDataForGetCommentListForNote] =
  //   useState<any[]>([]);

    const {
      isLoading,
      data: dataForGetCommentListForNote,
      refetch: refetchForGetCommentListForNote,
    } = useQuery<any>(
      ["apiForGetCommentListForNote", study_note_pk],
      apiForGetCommentListForNote,
      {
        enabled: true,
      }
    );

  // const mutateForGetCommentListForNote = useMutation(
  //   apiForGetCommentListForNote,
  //   {
  //     onSuccess: (data) => {
  //       // 데이터를 가져온 후 필요한 처리를 수행할 수 있습니다.
  //       console.log("dataForGetCommentListForNote: ", data);
  //       setDataForGetCommentListForNote(data);
  //     },
  //     onError: (error) => {
  //       // 에러 처리를 수행할 수 있습니다.
  //     },
  //   }
  // );

  // // fix 0616
  // useEffect(() => {
  //   mutateForGetCommentListForNote.mutate(study_note_pk);
  // }, []);

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
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* fix 0617  chat style board 추가 */}
            <ChatStyleBoardForBriefingBoard
              study_note_pk={study_note_pk}
              // mutateForGetCommentListForNote = {mutateForGetCommentListForNote}
              dataForGetCommentListForNote={dataForGetCommentListForNote}
              note_owner_user_name={note_owner_user_name}
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

export default ModalButtonForBriefingBoardForNote;
