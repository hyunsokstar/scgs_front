import { Box, IconButton, useColorModeValue } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import React from "react";

interface ButtonForOpenUrlByNewTabForUrlTextProps {
  url: string;
  button_size: string;
}

const ButtonForOpenUrlByNewTabForUrlText: React.FC<ButtonForOpenUrlByNewTabForUrlTextProps> = ({
  url,
  button_size
}) => {
  const handleClick = () => {
    const formattedUrl = url.startsWith("http") ? url : `http://${url}`;
    window.open(formattedUrl, "_blank");
  };

  const hoverBgColor = useColorModeValue("blue.300", "blue.700");

  return (
    <IconButton
      size={button_size}
      aria-label="Open in new tab"
      icon={<ExternalLinkIcon />}
      variant="outline"
      border="1px"
      borderColor="black"
      onClick={handleClick}
      _hover={{ bgColor: hoverBgColor }}
    />
  );
};

export default ButtonForOpenUrlByNewTabForUrlText;
