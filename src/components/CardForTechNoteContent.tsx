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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import TinyMCEEditor from "./RichEditor/TinyMCEEditor";
import { CheckIcon, CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFordeleteTechNoteContentByPk } from "../apis/tech_note_api";
import IconButtonForCopyText from "./IconButtonForCopyText";

type CardProps = {
  pk: number;
  title: string;
  file: string;
  content: string;
  created_at: string;
  backgroundColor?: string;
};

// component-1122
const CardForTechNoteContent = ({
  pk,
  title,
  file,
  content,
  created_at,
  backgroundColor = "white",
}: CardProps) => {
  const [content2, setContent] = useState<string>(content);
  const queryClient = useQueryClient();
  const toast = useToast();

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

  const deleteTechNoteByPkMutation = useMutation(
    (techNoteContentPk: string | number) => {
      return apiFordeleteTechNoteContentByPk(techNoteContentPk);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);

        queryClient.refetchQueries(["getTechNoteContentListByPk"]);
        toast({
          title: "delete test 성공!",
          status: "success",
        });
      },
    }
  );

  const deleteTechNoteByPkHandler = (techNoteContentPk: string | number) => {
    const response = deleteTechNoteByPkMutation.mutate(techNoteContentPk);
    console.log("response :", response);
  };

  return (
    <Box display={"flex"} border="0px solid green" width={"100%"} py={2}>
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

          <InputGroup>
            <Input defaultValue={file} />
            <InputRightElement>
              <IconButtonForCopyText text={file} />
            </InputRightElement>
          </InputGroup>

          {/* <Input defaultValue={file} /> */}

          {/* 0403 삭제 구현 하기 */}
          <Button
            variant="outline"
            colorScheme="red"
            _hover={{ bg: "red.100" }}
            onClick={() => deleteTechNoteByPkHandler(pk)}
          >
            <DeleteIcon />
          </Button>
        </HStack>
        <Box
          border={"1px solid blue"}
          padding={0}
          height="300px"
          overflowY="scroll"
        >
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
