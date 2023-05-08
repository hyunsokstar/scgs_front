import { useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Heading,
  Text,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { row_for_long_term_plan } from "../../types/type_for_plan_maker";

const PlanCard: React.FC<row_for_long_term_plan> = ({
  pk,
  title,
  category,
  description,
  writer,
  created_at,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const backgroundColor = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const [bgColor, titleColor, bodyColor, footerColor] = useToken("colors", [
    "gray.50",
    "blue.500",
    "purple.500",
    "teal.500",
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
        {category}
      </Heading>
      <Text mb={2} color={bodyColor}>
        {title}
      </Text>
      <Text fontWeight="bold" color={footerColor}>
        Written by {writer.username}
      </Text>

      {!showDetails && (
        <Button mt={4} onClick={() => setShowDetails(true)}>
          Show details
        </Button>
      )}

      {showDetails && (
        <Box mt={4}>
          <Text mb={2}>{description}</Text>
          <Button onClick={() => setShowDetails(false)}>Hide details</Button>
        </Box>
      )}
    </Box>
  );
};

export default PlanCard;
