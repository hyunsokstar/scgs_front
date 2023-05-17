import React, { useState } from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';

interface CardProps {
  index: number;
  selected: boolean;
  onSelect: () => void;
}

const Card: React.FC<CardProps> = ({ index, selected, onSelect }) => {
  const imageUrl = "https://via.placeholder.com/150"; // replace with your image path

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      borderColor={selected ? "blue.500" : undefined}
      boxShadow={selected ? "2xl" : undefined}
      _hover={{ borderColor: "blue.500", boxShadow: "2xl" }}
      onClick={onSelect}
    >
      <Image src={imageUrl} alt={`Profile ${index}`} width="100%" objectFit="cover" />
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
            Sample Name
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Test8 = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <Flex justifyContent="space-between">
      {[0, 1, 2, 3].map(index => (
        <Card
          key={index}
          index={index}
          selected={index === selectedCard}
          onSelect={() => setSelectedCard(index)}
        />
      ))}
    </Flex>
  );
};

export default Test8;
