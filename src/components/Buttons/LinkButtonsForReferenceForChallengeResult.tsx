import React from "react";
import { IconButton, Tooltip, Link, Box } from "@chakra-ui/react";
import { FaGithub, FaFileAlt, FaLink } from "react-icons/fa";

interface LinkButtonsForReferenceForChallengeResultProps {
  github_url1: string;
  github_url2: string;
  note_url: string;
}

const LinkButtonsForReferenceForChallengeResult: React.FC<
  LinkButtonsForReferenceForChallengeResultProps
> = ({ github_url1, github_url2, note_url }) => {
  return (
    <Box display={"flex"} gap={2}>
      <Tooltip label="Github URL 1">
        <Link href={github_url1} isExternal>
          <IconButton
            aria-label="Github URL 1"
            icon={<FaGithub />}
            colorScheme={github_url1 ? "teal" : "gray"}
            isDisabled={!github_url1}
          />
        </Link>
      </Tooltip>

      <Tooltip label="Github URL 2">
        <Link href={github_url2} isExternal>
          <IconButton
            aria-label="Github URL 2"
            icon={<FaGithub />}
            colorScheme={github_url2 ? "teal" : "gray"}
            isDisabled={!github_url2}
          />
        </Link>
      </Tooltip>

      <Tooltip label="Note URL">
        <Link href={note_url} isExternal>
          <IconButton
            aria-label="Note URL"
            icon={<FaFileAlt />}
            colorScheme={note_url ? "teal" : "gray"}
            isDisabled={!note_url}
          />
        </Link>
      </Tooltip>
    </Box>
  );
};

export default LinkButtonsForReferenceForChallengeResult;
