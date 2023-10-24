import React, { useState } from "react";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { apiForCopyOneOfNoteToMe } from "../../apis/study_note_api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "../../lib/useUser";
import { login } from "../../reducers/userSlice";

interface IProps {
  studyNotePk: any;
  studyNoteTitle: string;
}

function IconButtonForCopyNote({ studyNotePk, studyNoteTitle }: IProps) {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userLoading, user: loginUser, isLoggedIn } = useUser();

  const handleCopyClick = () => {
    setIsModalOpen(true);
  };

  // mutationForCopyOneOfNoteToMe
  // 필요한거 noteId, 옮길 대상은 loginuser니까 리턴 하고 로그인 유저 아니면 로그인 해주세요 출력 해야 됨
  const mutationForCopyOneOfNoteToMe = useMutation(apiForCopyOneOfNoteToMe, {
    onMutate: () => {
      // console.log("mutation starting");
    },
    onSuccess: (result) => {
      console.log("result : ", result);

      toast({
        title: "note copy success",
        description: result.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      queryClient.refetchQueries(["apiForgetStudyNoteList"]);

    },
    onError: (error: any) => {
      console.log("error.response : ", error.response);
      console.log("mutation has an error", error.response.data);
    },
  });

  const handleConfirmCopy = () => {
    // 복사 동작을 수행하는 코드를 여기에 추가할 수 있습니다.

    // alert('복사를 실행 하겠습니다.');
    // alert("isLoggedIn : " + isLoggedIn);
    if(isLoggedIn){
        mutationForCopyOneOfNoteToMe.mutate({studyNotePk})
    }else {
        alert("노트 복사를 위해 로그인 해주세요")
    }

    // setIsModalOpen(false);
  };

  return (
    <>
      <IconButton
        aria-label="Copy to clipboard"
        icon={<CopyIcon />}
        size="md"
        colorScheme="teal"
        onClick={handleCopyClick}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>복사 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {studyNoteTitle}를 {loginUser?.username} 님의 노트로 로
            복사하시겠습니까?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleConfirmCopy}>
              복사
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default IconButtonForCopyNote;
