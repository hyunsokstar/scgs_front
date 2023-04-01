import { Box, Flex, Heading, Text, Textarea, Input, HStack } from "@chakra-ui/react";

type CardProps = {
  title: string;
  file: string;
  content: string;
  created_at: string;
  backgroundColor?: string;
};

const CardForTechNoteContent = ({
  title,
  file,
  content,
  created_at,
  backgroundColor = "skyblue",
}: CardProps) => {
  return (
    <Box
      backgroundColor={backgroundColor}
      borderRadius="lg"
      boxShadow="md"
      p={4}
      my={5}
    >
      <HStack mb={2}>
        <Input defaultValue={title} />
        <Input defaultValue={file} />
      </HStack>
      <Textarea
        defaultValue={content}
        _focus={{ boxShadow: "none" }}
        height="300px"
      />
    </Box>
  );
};

export default CardForTechNoteContent;
