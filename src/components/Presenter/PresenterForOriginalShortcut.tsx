import React from 'react';
import { Box, Text, Image, Badge, HStack } from "@chakra-ui/react";

interface Writer {
    pk: number;
    username: string;
    profile_image: string;
}

interface OriginalShortcutProps {
    id: number;
    writer: Writer;
    shortcut: string;
    description: string;
    classification: string;
    tags: string[];
    related_shortcut_count: number;
}

const PresenterForOriginalShortcut: React.FC<{shortcutData: OriginalShortcutProps}> = ({ shortcutData }) => {
    const { id, writer, shortcut, description, classification, tags, related_shortcut_count } = shortcutData;

    return (
        <Box borderWidth="1px" borderRadius="lg" padding="6" width="100%">
            <Text fontSize="2xl" fontWeight="bold" mb="4">Shortcut ID: {id}</Text>
            <HStack spacing={2} mb="4">
                <Image boxSize="50px" borderRadius="full" src={writer.profile_image} alt={writer.username} />
                <Text fontSize="lg" fontWeight="bold">{writer.username}</Text>
            </HStack>
            <Text mb="4">Shortcut: {shortcut}</Text>
            <Text mb="4">Description: {description}</Text>
            <Text mb="4">Classification: <Badge colorScheme={classification === 'back' ? 'teal' : 'orange'}>{classification}</Badge></Text>
            <HStack spacing={4} mb="4">
                {tags.map((tag, index) => (
                    <Badge key={index} colorScheme="green">{tag}</Badge>
                ))}
            </HStack>
            <Text>Related Shortcut Count: {related_shortcut_count}</Text>
        </Box>
    );
};

export default PresenterForOriginalShortcut;
