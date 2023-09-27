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
import { ITypeForChallengeRefData, ITypeForChallengerRefData } from "../../types/type_for_challenge";
import { apiForGetChallengerRefsList } from "../../apis/challenge_api";
import { useMutation, useQuery } from "@tanstack/react-query";
import ListForChallengeRef from "../List/ListForChallengeRef";
import ModalButtonForCreateChallengeRef from "./ModalButtonForCreateChallengeRef";

interface IProps {
  buttonLabel: string;
  challengeId: any;
}

// 1122
const ModalButtonForChallengerRefList: React.FC<IProps> = ({
  buttonLabel,
  challengeId,
}) => {
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: isLoadingForGetChallengerRef,
    data: dataForChallengerRef,
    refetch: refetchForGetChallengeRef,
  } = useQuery<ITypeForChallengerRefData>(
    ["apiForGetChallengerRefsList", challengeId],
    apiForGetChallengerRefsList,
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
                dataForChallengerRef
                  ? dataForChallengerRef.challengerRefList
                  : []
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

export default ModalButtonForChallengerRefList;
