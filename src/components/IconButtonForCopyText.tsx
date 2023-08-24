import { FC, useRef } from "react";
import {
  Box,
  Icon,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";

interface IconButtonForCopyTextProps {
  text: string;
  colorScheme?: string;
  size?: string;
  outline?: boolean;
}

const IconButtonForCopyText: FC<IconButtonForCopyTextProps> = ({
  text,
  colorScheme = "purple",
  size = "md",
  outline = true,
}) => {
  const toast = useToast();
  const textareaRef = useRef(null);

  const handleCopy = () => {
    // HTML 문자열에서 텍스트 콘텐츠만 추출
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(text, "text/html");
    const extractedText = htmlDoc.body.textContent || "";

    // 추출한 텍스트를 숨겨진 textarea 요소에 넣고 복사
    const textarea = document.createElement("textarea");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    textarea.value = extractedText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    toast({
      title: "복사 성공",
      status: "success",
      description: `${extractedText}가 클립보드에 복사되었습니다.`,
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box mr={1}>
      <IconButton
        aria-label="Copy to clipboard"
        icon={<Icon as={MdContentCopy} />}
        onClick={handleCopy}
        colorScheme={colorScheme}
        size={size}
        variant={outline ? "outline" : "solid"}
        _hover={{
          backgroundColor: `${colorScheme}.100`,
        }}
      />
    </Box>
  );
};

export default IconButtonForCopyText;
