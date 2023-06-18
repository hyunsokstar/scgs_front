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
  Input,
  useToast,
} from "@chakra-ui/react";
import { apiForCreateCommentForNote, apiForGetCommentListForNote } from "../../apis/study_note_api";
import ChatStyleBoardForBriefingBoard from "../ChatStyleBoard/ChatStyleBoardForBriefingBoard";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface IProps {
  button_text: string;
  button_size: string;
  modal_title: string;
  study_note_pk: string | undefined;
  note_owner_user_name: string;
  count_for_note_comments: number;
}

// 1122
const ModalButtonForBriefingBoardForNote = ({
  modal_title,
  button_text,
  button_size,
  study_note_pk,
  note_owner_user_name,
  count_for_note_comments
}: IProps) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentTextToUpload, setCommentTextToUpload] = useState("");

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

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

  console.log("dataForGetCommentListForNote : ", dataForGetCommentListForNote);

  const createMutationForTaskComment = useMutation(apiForCreateCommentForNote, {
    onMutate: () => {
      console.log("mutation starting");
    },
    onSuccess: (data) => {
      console.log("data : ", data);

      toast({
        title: "add comment success !",
        status: "success",
        duration: 2000, // 2초 후에 사라짐
        isClosable: true,
      });
      refetchForGetCommentListForNote();
      setCommentTextToUpload("");
    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);
    },
  });

  const buttonHandlerForInsertComment = () => {
    if (!isLoggedIn) {
      alert("로그인 해주세요");
    } else {
    }

    if(commentTextToUpload === ""){
      alert("내용을 입력해 주세요 !")
      return;
    }

    // alert(commentTextToUpload)

    createMutationForTaskComment.mutate({
      study_note_pk,
      comment: commentTextToUpload,
    });
  };

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
        {button_text} ({count_for_note_comments})
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal_title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ChatStyleBoardForBriefingBoard
              study_note_pk={study_note_pk}
              refetch={refetchForGetCommentListForNote}
              dataForGetCommentListForNote={dataForGetCommentListForNote}
              note_owner_user_name={note_owner_user_name}
            />
          </ModalBody>
          <ModalFooter>
            <Input
              variant="outline"
              borderRadius="xl"
              borderWidth="2px"
              borderColor="purple.100"
              size="md"
              height={"37px"}
              border={"1px solid purple"}
              width={"100%"}
              _hover={{
                borderColor: "purple.300",
              }}
              _focus={{
                borderColor: "purple.400",
              }}
              bg={"purple.50"}
              mr="1"
              onChange={(e) => setCommentTextToUpload(e.target.value)}
              value={commentTextToUpload}
              placeholder="add comment for note"
            />
            <Button
              variant="outline"
              size={"md"}
              height={"37px"}
              borderRadius="md"
              colorScheme={"purple"}
              onClick={() => buttonHandlerForInsertComment()}
            >
              입력
            </Button>{" "}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForBriefingBoardForNote;
