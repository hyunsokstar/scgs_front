import React from "react";
import {
  Box,
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
import ContainerForCommentForSuggestion from "../Container/ContainerForCommentForSuggestionForBoard";

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
          <Box
            dangerouslySetInnerHTML={{ __html: selectedSuggestion.content }}
            style={{ minHeight: "200px", border: "1px solid gray" }}
          ></Box>
          <Divider my={4} /> {/* 구분선 추가 */}
          <ContainerForCommentForSuggestion suggestionId={selectedSuggestion.id}/>
          <Divider my={4} /> {/* 구분선 추가 */}

          {/* <CommentListForSuggestionForBoard /> */}

        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalForSuggestionDetailForBoard;
