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
} from "@chakra-ui/react";
import { FaEdit, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import {
  ITypeForChallengeRefData,
  IChallengeRefRow,
} from "../../types/type_for_challenge";
import { apiForGetChallengeRefsList } from "../../apis/challenge_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import ListForChallengeRef from "../List/ListForChallengeRef";
import ModalButtonForCreateChallengeRef from "./ModalButtonForCreateChallengeRef";

interface IProps {
  buttonLabel: string;
  challengeId: any;
}

// 1122
const ModalButtonForChallengeRefList: React.FC<IProps> = ({
  buttonLabel,
  challengeId,
}) => {
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: isLoadingForGetChallengeRef,
    data: dataForChallengeRef,
    refetch: refetchForGetChallengeRef,
  } = useQuery<ITypeForChallengeRefData>(
    ["apiForGetChallengeRefsList", challengeId],
    apiForGetChallengeRefsList,
    {
      enabled: true,
      cacheTime: 0,
    }
  );

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        borderColor="blue"
        _hover={{ bgColor: "blue.100" }}
        onClick={onOpen}
      >
        {buttonLabel} id: {challengeId}
      </Button>
      <Modal isOpen={isOpen} size="5xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ChallengeRefList Modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ModalButtonForCreateChallengeRef challengeId={challengeId} />

            <ListForChallengeRef
              challengeRefList={
                dataForChallengeRef ? dataForChallengeRef.challengeRefList : []
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForChallengeRefList;
