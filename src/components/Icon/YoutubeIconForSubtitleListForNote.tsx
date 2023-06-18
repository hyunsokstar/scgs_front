// YoutubeIconForSubtitleListForNote
import { Icon, Link, Tooltip } from "@chakra-ui/react";
import { FiYoutube } from "react-icons/fi";

interface YoutubeIconForSubtitleProps {
  url_text: string;
}

const YoutubeIconForSubtitleListForNote: React.FC<YoutubeIconForSubtitleProps> = ({
  url_text,
}) => {
  const handleClick = () => {
    if (url_text !== "") {
      window.open(url_text, "_blank");
    }
  };

  return (
    <Tooltip label="Click to watch on YouTube" hasArrow>
      <Link
        href={url_text}
        isExternal
        onClick={handleClick}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        p={2}
        bg={url_text === "" ? "gray.200" : "red.500"}
        _hover={{ bg: "red.600" }}
      >
        <Icon
          as={FiYoutube}
          boxSize={5}
          color={url_text === "" ? "gray.500" : "white"}
        />
      </Link>
    </Tooltip>
  );
};

export default YoutubeIconForSubtitleListForNote;
