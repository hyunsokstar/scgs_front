import { useState } from "react";
import { Box, Image, chakra, Container, Flex } from "@chakra-ui/react";

interface CardProps {
  imageUrl: string;
}

const CardComponent: React.FC<CardProps> = ({ imageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex mt={10}>
      <Box
        w="225px"
        h="345px"
        borderRadius="md"
        bg="white"
        boxShadow="base"
        position="relative"
        overflow="hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={imageUrl}
          w="100%"
          h="45%"
          objectFit="cover"
          borderTopRadius="md"
        />

        {isHovered && (
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bg="rgba(0, 0, 0, 0.2)"
            zIndex="overlay"
          />
        )}
      </Box>
    </Flex>
  );
};

export default CardComponent;
