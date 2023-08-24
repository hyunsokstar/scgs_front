import { FC } from "react";
import { Box, Icon, IconButton, useToast } from "@chakra-ui/react";
import { MdContentCopy } from "react-icons/md";

interface IconButtonForCopyFileNameProps {
  filePath: string;
  colorScheme?: string;
  size?: string;
  outline?: boolean;
}

const IconButtonForCopyFileName: FC<IconButtonForCopyFileNameProps> = ({
  filePath,
  colorScheme = "purple",
  size = "md",
  outline = true,
}) => {
  const toast = useToast();

  const handleCopy = () => {
    const fileName = filePath.split("\\").pop() || filePath.split("/").pop() || "";

    const textarea = document.createElement("textarea");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    textarea.value = fileName;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    toast({
      title: "복사 성공",
      status: "success",
      description: `${fileName}가 클립보드에 복사되었습니다.`,
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <IconButton
        aria-label="Copy file name to clipboard"
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

export default IconButtonForCopyFileName;
