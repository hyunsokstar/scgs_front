import { Box, Image, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

interface SampleCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const SampleCard = ({ imageSrc, title, description }: SampleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      mx={8}
      my={5}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transform={isHovered ? "translateY(-5px)" : "translateY(0)"}
      transition="transform 0.2s ease-out"
      boxShadow={isHovered ? "xl" : "none"}
      bg={"#ECECEC"}
    >
      <Box maxH="xs" overflow="hidden">
        <Image src={imageSrc} alt={title} objectFit="fill" w={"280px"} h={"220px"}/>
      </Box>

      <Box p="5">
        <Box display="flex" alignItems="baseline">
          <Heading size="md" mr={2}>
            {title}
          </Heading>
        </Box>

        <Box>
          <Text noOfLines={3}>{description}</Text>
        </Box>
      </Box>

      {isHovered && (
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          bg="rgba(0, 0, 0, 0.4)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="all 0.2s"
          transform="scale(1.2)"
        >
          <Text color="white" fontWeight="bold">
            Click !
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SampleCard;
