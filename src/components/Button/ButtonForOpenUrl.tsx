// ButtonForOpenUrl
import { IconButton } from "@chakra-ui/react";
import { FiExternalLink } from "react-icons/fi";
import { MouseEventHandler } from "react";

interface Props {
  url: string;
}

const ButtonForOpenUrl = ({ url }: Props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    window.open(url, "_blank");
  };

  return (
    <IconButton
      aria-label="external link"
      icon={<FiExternalLink />}
      onClick={handleClick}
      variant="outline"
      size="sm"
      _hover={{ bg: "pink.100" }}
      colorScheme="teal"
    />
  );
};

export default ButtonForOpenUrl;