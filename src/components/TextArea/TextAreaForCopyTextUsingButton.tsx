import { Box, Button, HStack, Textarea, VStack, useClipboard } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";

interface TextAreaForCopyTextUsingButtonProps {
  text: string;
}

const TextAreaForCopyTextUsingButton: React.FC<
  TextAreaForCopyTextUsingButtonProps
> = ({ text }) => {
  const [textForCopy, setTextForCopy] = useState(text);
  const { hasCopied, onCopy } = useClipboard(textForCopy);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    handleTextareaResize();
  }, [isExpanded]);

  const handleCopy = () => {
    onCopy();
  };

  const handleTextareaResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      if (isExpanded) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      } else {
        textarea.style.height = "initial";
      }
    }
  };

  const handleToggleSize = () => {
    setIsExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Box w="full" position="relative">
      <Textarea
        ref={textareaRef}
        defaultValue={textForCopy}
        border="1px solid black"
        onChange={(e) => {
          setTextForCopy(e.target.value);
          handleTextareaResize();
        }}
        onKeyPress={handleTextareaResize}
        onKeyUp={handleTextareaResize}
        onKeyDown={handleTextareaResize}
        style={{ resize: "none", overflow: "hidden" }}
      />
      <Box position="absolute" top={2} right={2}>
        <VStack>
          <Button
            size="xs"
            variant="outlined"
            _hover={{ bg: "red.100" }}
            border="1px solid red"
            onClick={handleCopy}
          >
            {hasCopied ? "Copied" : "Copy"}
          </Button>
          <Button
            size="xs"
            variant="outlined"
            _hover={{ bg: "red.100" }}
            border="1px solid red"
            onClick={handleToggleSize}
          >
            {isExpanded ? "축소" : "확대"}
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default TextAreaForCopyTextUsingButton;
