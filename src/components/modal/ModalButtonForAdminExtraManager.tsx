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
  useDisclosure,
} from "@chakra-ui/react";

interface ModalButtonProps {
  buttonText: string;
}

const ModalButtonForAdminExtraManager: React.FC<ModalButtonProps> = ({
  buttonText,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="xs"
        variant="outline"
        borderColor="blue"
        _hover={{ bg: "blue.100" }}
        onClick={onOpen}
      >
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Admin Extra Manager</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* 모달 내용을 이 부분에 추가하세요 */}
            {/* 예: 모달 내용을 추가하는 방법: <p>모달 내용</p> */}
          </ModalBody>
          <ModalFooter>
            {/* 모달 하단 버튼 등을 이 부분에 추가하세요 */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalButtonForAdminExtraManager;
