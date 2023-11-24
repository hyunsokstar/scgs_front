import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  HStack,
  Divider,
  Box,
} from "@chakra-ui/react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiForGetMyNoteInfoAndTargetNoteInforToPartialCopy } from "../../apis/study_note_api";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

interface IProps {
  buttonText: string;
  studyNotePk: any;
}

const ModalButtonForPartialCopyForStudyNote: React.FC<IProps> = ({
  buttonText,
  studyNotePk,
}) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  const handleOpen = () => {
    if (isLoggedIn) {
      setIsOpen(true);
      queryClient.prefetchQuery(
        ["myNoteInfo", studyNotePk],
        apiForGetMyNoteInfoAndTargetNoteInforToPartialCopy
      );
    } else {
      console.log("로그인 해주세요");
      alert("로그인 해주세요 !");
      return;
    }
  };

  const { data: dataForMyNoteAndSelectedNoteForPartialCopy, isLoading } = useQuery<any>(
    ["myNoteInfo", studyNotePk], // 이 쿼리의 고유한 키
    apiForGetMyNoteInfoAndTargetNoteInforToPartialCopy, // API 함수
    {
      enabled: false, // 초기에는 비활성 상태로 설정
    }
  );

  console.log(
    "dataForMyNoteAndSelectedNoteForPartialCopy : ",
    dataForMyNoteAndSelectedNoteForPartialCopy
  );

  return (
    <>
      <Button
        variant="outline"
        border="1px solid black"
        size="sm"
        onClick={handleOpen}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose} size="7xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack>
              {/* Left Side for my note*/}
              <Box style={{ width: "50%" }}>Left Side For My Note</Box>
              <Divider orientation="vertical" border={"1px solid black"} />
              {/* Right Side */}
              <Box style={{ width: "50%" }}>Right Side For My Note</Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForPartialCopyForStudyNote;
