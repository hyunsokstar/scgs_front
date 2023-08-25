import React, { FC } from "react";
import { Box, IconButton, Text, useToast } from "@chakra-ui/react";

interface IconButtonForCopyCodeProps {
  code: string;
  colorScheme?: string;
  size?: string;
  outline?: boolean;
}

const IconButtonForCopyCode: FC<IconButtonForCopyCodeProps> = ({
  code,
  colorScheme = "purple",
  size = "md",
  outline = true,
}) => {
  const toast = useToast();

  const handleCopy = () => {
    const div = document.createElement("div");
    div.innerHTML = code;
    const htmlText = div.innerText; // Extracting inner text to avoid copying HTML tags

    const textarea = document.createElement("textarea");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    textarea.value = htmlText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    toast({
      title: "복사 성공",
      status: "success",
      description: "HTML 출력 결과가 클립보드에 복사되었습니다.",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box mr={24}>
      <IconButton
        aria-label="Copy HTML output to clipboard"
        onClick={handleCopy}
        colorScheme={colorScheme}
        size={size}
        variant={outline ? "outline" : "solid"}
        _hover={{
          backgroundColor: `${colorScheme}.100`,
        }}
      >
        <Text>C</Text>
      </IconButton>
    </Box>
  );
};

export default IconButtonForCopyCode;
