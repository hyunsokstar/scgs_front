import { Button, ButtonProps, useClipboard } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";

interface CopyToClipboardButtonProps extends ButtonProps {
  text: string;
}

const CopyButtonByPropsText: React.FC<CopyToClipboardButtonProps> = ({
  text,
  ...rest
}) => {
  const { onCopy, hasCopied } = useClipboard(text);

  const handleClick = () => {
    onCopy();
  };

  const bgHover = "teal.500";
  const colorHover = "white";
  const bgActive = "teal.600";
  const colorActive = "white";

  return (
    <Button
      variant="outline"
      size="xs"
      colorScheme="teal"
      leftIcon={<FaCopy />}
      onClick={handleClick}
      _hover={{
        bg: bgHover,
        color: colorHover,
      }}
      _active={{
        bg: bgActive,
        color: colorActive,
      }}
      ml={2}
      {...rest}
    >
      {hasCopied ? "copy!" : ""}
    </Button>
  );
};

export default CopyButtonByPropsText;
