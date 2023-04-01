import {
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import TinyMCEEditor from "./RichEditor/TinyMCEEditor";

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
  const [content2, setContent] = useState<string>(content);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

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
      {/* <Textarea
        defaultValue={content}
        _focus={{ boxShadow: "none" }}
        height="300px"
      /> */}
      <TinyMCEEditor
        initialValue={content2}
        onChange={handleContentChange}
        apiKey="mj1ss81rnxfcig1ol8gp6j8oui9jpkp61hw3m901pbt14ei1"
      />
    </Box>
  );
};

export default CardForTechNoteContent;
