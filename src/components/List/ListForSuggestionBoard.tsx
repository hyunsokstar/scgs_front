import React, { useState } from "react";
import {
  Checkbox,
  Avatar,
  Text,
  Flex,
  IconButton,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { TypeForSuggestionRow } from "../../types/board_type";
import ModalForSuggestionDetailForBoard from "../modal/ModalForSuggestionDetailForBoard";

interface ITypeForPropsForSuggestionList {
  suggestions: TypeForSuggestionRow[];
}

const ListForSuggestionBoard: React.FC<ITypeForPropsForSuggestionList> = ({
  suggestions,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<TypeForSuggestionRow>();

  const handleTitleClick = (suggestion: TypeForSuggestionRow) => {
    if (suggestion) {
      // 선택된 제안이 존재하는 경우에만 모달을 열도록 합니다.
      setIsModalOpen(true);
      setSelectedSuggestion(suggestion);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <VStack spacing={2} align="stretch">
      {suggestions
        ? suggestions.map((suggestion: TypeForSuggestionRow) => (
            <Flex
              key={suggestion.id}
              borderWidth="1px"
              borderRadius="lg"
              p={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Checkbox size="sm" mr={2} />
              <Avatar
                name={suggestion.writer.username}
                src={suggestion.writer.profile_image}
                size="sm"
              />
              <Text
                flex="1"
                pr={2}
                fontWeight="bold"
                color="teal.500"
                textAlign="center"
                _hover={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => handleTitleClick(suggestion)} // 함수를 직접 호출하는 대신 콜백으로 전달
              >
                {suggestion.title}
              </Text>
              <Spacer />
              <Text fontSize="sm" ml={2}>
                {suggestion.created_at_formatted}
              </Text>
              <IconButton aria-label="Edit" icon={<EditIcon />} ml={2} />
              <IconButton aria-label="Delete" icon={<DeleteIcon />} ml={2} />
            </Flex>
          ))
        : "no suggestion"}

      {selectedSuggestion ? (
        <ModalForSuggestionDetailForBoard
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedSuggestion={selectedSuggestion}
        />
      ) : (
        ""
      )}
    </VStack>
  );
};

export default ListForSuggestionBoard;
