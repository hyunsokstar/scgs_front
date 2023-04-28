import { FC } from "react";
import {
  Box,
  Icon,
  IconButton,
  useClipboard,
  Text,
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
  const { onCopy, hasCopied } = useClipboard(text);
  const toast = useToast();

  const handleCopy = () => {
    onCopy();
    toast({
      title: "copy success",
      status: "success",
      description: `${text} is Coppied to Clip board`,
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
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
