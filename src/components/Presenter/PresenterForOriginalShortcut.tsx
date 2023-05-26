import React from 'react';
import { Box, Text, Image, Badge, HStack } from "@chakra-ui/react";

type WriterType = {
  pk: number;
  username: string;
  profile_image: string;
};

type OriginalShortcutType = {
  id: number;
  writer: WriterType;
  shortcut: string;
  description: string;
  classification: string;
  tags: string[];
  related_shortcut_count: number;
};

type ResponseTypeForApiForRelatedShortcutList = {
  data_for_original_shortcut?: OriginalShortcutType;
  data_for_related_shortcut: RelatedShortcutType[];
};

type RelatedShortcutType = {
  id: number;
  shortcut_content: string;
  description: string;
  created_at: string;
  shortcut: number;
};

interface PresenterForOriginalShortcutProps {
  shortcutData?: OriginalShortcutType;
}

const PresenterForOriginalShortcut: React.FC<PresenterForOriginalShortcutProps> = ({ shortcutData }) => {
  if (!shortcutData) {
    return (
      <Box borderWidth="1px" borderRadius="lg" padding="6" width="100%">
        <Text>No data available</Text>
      </Box>
    );
  }

  const { id, writer, shortcut, description, classification, tags, related_shortcut_count } = shortcutData;

  return (
    <Box bg={"blue.100"} borderWidth="1px" borderRadius="lg" padding="6" width="100%">
      <Text fontSize="2xl" fontWeight="bold" mb="4">Shortcut ID: {id}</Text>
       <HStack spacing={2} mb="4">
        <Image boxSize="50px" borderRadius="full" src={writer.profile_image} alt={writer.username} />
        <Text fontSize="lg" fontWeight="bold">{writer.username}</Text>
      </HStack>
      <Text mb="4">Shortcut: {shortcut}</Text>
      <Text mb="4">Description: {description}</Text>

    </Box>
  );
};

export default PresenterForOriginalShortcut;
