import { useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Heading,
  Text,
  useColorModeValue,
  useToken
} from "@chakra-ui/react";

interface CardProps {
  title: string;
  description: string;
  writer: string;
}


const PlanCard: React.FC<CardProps> = ({ title, description, writer }) => {
  const [showDetails, setShowDetails] = useState(false);
  const backgroundColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [bgColor, titleColor, bodyColor, footerColor] = useToken("colors", [
    "gray.50",
    "blue.500",
    "purple.500",
    "teal.500"
  ]);

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      borderColor={borderColor}
      backgroundColor={bgColor}
      p={4}
      position="relative"
      width={"100%"}
    >
      <CloseButton
        position="absolute"
        top={2}
        right={2}
        variant="outline"
        colorScheme="blue"
        onClick={() => setShowDetails(false)}
      />

      <Heading size="md" mb={2} color={titleColor}>
        {title}
      </Heading>
      <Text mb={2} color={bodyColor}>
        {description}
      </Text>
      <Text fontWeight="bold" color={footerColor}>
        Written by {writer}
      </Text>

      {!showDetails && (
        <Button mt={4} onClick={() => setShowDetails(true)}>
          Show details
        </Button>
      )}

      {showDetails && (
        <Box mt={4}>
          <Text mb={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
            tellus at nisi volutpat lobortis. Donec ac tristique nibh. Morbi
            bibendum, ex sed commodo lacinia, augue sapien pretium nisi, nec
            consectetur turpis mi vel erat.
          </Text>
          <Button onClick={() => setShowDetails(false)}>Hide details</Button>
        </Box>
      )}
    </Box>
  );
};

export default PlanCard;
