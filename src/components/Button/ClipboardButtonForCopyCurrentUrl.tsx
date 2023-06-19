import React, { useState } from "react";
import { Button, ButtonProps, useClipboard, useToast } from "@chakra-ui/react";

interface ClipboardButtonForCopyCurrentUrlProps extends ButtonProps {
  note_url?: string;
  button_size?: "sm" | "md" | "lg";
  pk?: number;
}

const ClipboardButtonForCopyCurrentUrl = ({
  note_url,
  button_size = "md",
  pk,
  ...props
}: ClipboardButtonForCopyCurrentUrlProps) => {
  let url = note_url || window.location.href;

  if (pk) {
    url = `${url}/${pk}/1`;
  }

  const [value, setValue] = useState("");
  const { hasCopied, onCopy } = useClipboard(url);
  const toast = useToast();

  const handleClick = () => {
    onCopy();
    toast({
      title: "URL 복사 완료",
      description: url,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      border={"1px solid black"}
      // bg={"white"}
      size={button_size}
      {...props}
      _hover={{ bgColor: "yellow.100" }}
    >
      {hasCopied ? "copy !" : "link"}
    </Button>
  );
};

export default ClipboardButtonForCopyCurrentUrl;
