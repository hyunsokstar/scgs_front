import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack, // 추가
  Divider, // 추가
  Textarea, // 추가
} from "@chakra-ui/react";
import { TypeForSuggestionRow } from "../../types/board_type";

interface ITypeForSuggestionDetailForBoard {
  isOpen: boolean;
  onClose: () => void;
  selectedSuggestion: TypeForSuggestionRow;
}

const ModalForSuggestionDetailForBoard: React.FC<
  ITypeForSuggestionDetailForBoard
> = ({ isOpen, onClose, selectedSuggestion }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>suggestion detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="2xl" fontWeight="bold">
            {selectedSuggestion.title}
          </Text>
          <Text mt={2}>{selectedSuggestion.content}</Text>
          <Divider my={4} /> {/* 구분선 추가 */}
          <Text fontSize="lg" fontWeight="bold">
            댓글
          </Text>
          {/* 댓글 입력 영역 */}
          <Textarea placeholder="댓글을 입력하세요" size="sm" resize="vertical" />
          <Button mt={2} size="sm">
            댓글 달기
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForSuggestionDetailForBoard;
