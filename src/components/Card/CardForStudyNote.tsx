import {
  Box,
  IconButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { type_for_study_note_list_row } from "../../types/study_note_type";

export const CardForStudyNote: React.FC<type_for_study_note_list_row> = ({
  pk,
  title,
  description,
  writer,
}) => {
  const cardBgColor = useColorModeValue("gray.100", "gray.700");
  const headerBgColor = useColorModeValue("gray.200", "gray.600");
  const bodyBgColor = useColorModeValue("gray.100", "gray.700");
  const footerBgColor = useColorModeValue("gray.200", "gray.600");
  const borderColor = useColorModeValue("gray.400", "gray.500");

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width="220px"
      height="250px"
      margin="10px"
      bg={cardBgColor}
      boxShadow="md"
      transition="box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out, transform 0.2s ease-in-out"
      _hover={{
        borderColor: borderColor,
        boxShadow: "xl",
        transform: "translateY(-4px)",
      }}
      position={"relative"}
    >
      <Flex justify="space-between" bg={headerBgColor} px="2" py="1">
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
        <IconButton
          aria-label="Close"
          icon={<CloseIcon />}
          variant="outline"
          size="sm"
          colorScheme="pink"
        />
      </Flex>
      <Box p="2" bg={bodyBgColor}>
        <Text fontSize="sm">{description}</Text>
      </Box>
      <Box position={"absolute"} p="2" bg={footerBgColor} bottom={0} w={"100%"}>
        <Text fontSize="sm" textAlign="right">
          {writer ? writer.username : "no user"}
        </Text>
      </Box>
    </Box>
  );
};

export default CardForStudyNote;
