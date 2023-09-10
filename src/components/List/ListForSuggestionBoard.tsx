import React from "react";
import {
  Box,
  Checkbox,
  Avatar,
  Text,
  Flex,
  IconButton,
  VStack,
  Spacer,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { TypeForSuggestionsForBoard } from "../../types/board_type";

const ListForSuggestionBoard: React.FC<TypeForSuggestionsForBoard> = ({
  suggestions,
}) => {
  return (
    <VStack spacing={2} align="stretch">
      {suggestions
        ? suggestions.map((suggestion) => (
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
              >
                {suggestion.title}
              </Text>
              <Spacer />
              <Text fontSize="sm" ml={2}>
                {suggestion.createdAt}
              </Text>
              <IconButton aria-label="Edit" icon={<EditIcon />} ml={2} />
              <IconButton aria-label="Delete" icon={<DeleteIcon />} ml={2} />
            </Flex>
          ))
        : "no suggestion"}
    </VStack>
  );
};

export default ListForSuggestionBoard;
