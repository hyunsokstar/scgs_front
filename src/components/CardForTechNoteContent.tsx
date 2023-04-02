import {
  Box,
  Flex,
  Heading,
  Text,
  Textarea,
  Input,
  HStack,
  Container,
  Button,
  Checkbox,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import TinyMCEEditor from "./RichEditor/TinyMCEEditor";
import { CheckIcon, CopyIcon, DeleteIcon } from "@chakra-ui/icons";

type CardProps = {
  pk: number;
  title: string;
  file: string;
  content: string;
  created_at: string;
  backgroundColor?: string;
};

const CardForTechNoteContent = ({
  pk,
  title,
  file,
  content,
  created_at,
  backgroundColor = "white",
}: CardProps) => {
  const [content2, setContent] = useState<string>(content);

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  const handle_title_copy = async () => {
    console.log("input 내용 복사 하기");
    const input = document.querySelector(
      `.input_title_${pk}`
    ) as HTMLInputElement;
    // Input 내용 복사
    if (input) {
      const selection = input.select() as unknown as HTMLInputElement;
      // Input 내용 복사
      await navigator.clipboard.writeText(input.value);

      // 복사된 내용 출력
      const copiedText = await navigator.clipboard.readText();

      // 복사된 내용 출력
      alert(`복사된 내용: ${copiedText}`);
    }
  };

  return (
    <Box display={"flex"} border="0px solid green" width={"100%"}>
      <Box width={"96%"}>
        <HStack mb={2}>
          <Checkbox
            borderRadius="full"
            size="lg"
            icon={<CheckIcon />}
            colorScheme="green"
          />
          <InputGroup>
            <Input
              defaultValue={title}
              className={`input_title_${pk}`}
              // onChange={(e) => setValue(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                variant="outline"
                aria-label="Copy"
                icon={<CopyIcon />}
                onClick={handle_title_copy}
              />
            </InputRightElement>
          </InputGroup>

          <Input defaultValue={file} />

          {/* 0403 삭제 구현 하기 */}
          <Button
            variant="outline"
            colorScheme="red"
            _hover={{ bg: "red.100" }}
          >
            <DeleteIcon />
          </Button>

        </HStack>
        <Box border={"1px solid blue"} padding={0} height="300px" overflowY="scroll">
          {/* rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
      </Box>
      <Box border={"1px solid blue"} width="4%" ml={2}>
        {/* {pk} ab */}
      </Box>
    </Box>
  );
};

export default CardForTechNoteContent;
