import { Box, Button, Textarea, useClipboard } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";

interface TextAreaForCopyTextUsingButtonProps {
  text: string;
}

const TextAreaForCopyTextUsingButton: React.FC<
  TextAreaForCopyTextUsingButtonProps
> = ({ text }) => {
  const [textForCopy, setTextForCopy] = useState(text);
  const { hasCopied, onCopy } = useClipboard(textForCopy);

  const handleCopy = () => {
    onCopy();
  };

  return (
    <Box w="full" position={"relative"}>
      <Textarea
        defaultValue={textForCopy}
        onChange={(e) => {
          setTextForCopy(e.target.value);
        }}
      />
      <Button
        size="sm"
        variant="outlined"
        _hover={{ bg: "red.100" }}
        border="1px solid red"
        position="absolute"
        top={2}
        right={2}
        onClick={handleCopy}
      >
        {hasCopied ? "Copied" : "Copy"}
      </Button>
    </Box>
  );
};

export default TextAreaForCopyTextUsingButton;
