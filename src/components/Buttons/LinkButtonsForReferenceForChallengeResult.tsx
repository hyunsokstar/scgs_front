import React from "react";
import { IconButton, Tooltip, Link, Box } from "@chakra-ui/react";
import { FaGithub, FaFileAlt, FaLink } from "react-icons/fa";

interface LinkButtonsForReferenceForChallengeResultProps {
  github_url1: string;
  github_url2: string;
  github_url3: string;
  note_url1: string;
  note_url2: string;
  note_url3: string;
}

const LinkButtonsForReferenceForChallengeResult: React.FC<
  LinkButtonsForReferenceForChallengeResultProps
> = ({
  github_url1,
  github_url2,
  github_url3,
  note_url1,
  note_url2,
  note_url3,
}) => {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
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

        <Tooltip label="Github URL 2">
          <Link href={github_url3} isExternal>
            <IconButton
              aria-label="Github URL 2"
              icon={<FaGithub />}
              colorScheme={github_url3 ? "teal" : "gray"}
              isDisabled={!github_url3}
            />
          </Link>
        </Tooltip>
      </Box>
      <Box display={"flex"} gap={2}>
        <Tooltip label="Note URL">
          <Link href={note_url1} isExternal>
            <IconButton
              aria-label="Note URL"
              icon={<FaFileAlt />}
              colorScheme={note_url1 ? "teal" : "gray"}
              isDisabled={!note_url1}
            />
          </Link>
        </Tooltip>

        <Tooltip label="Note URL">
          <Link href={note_url2} isExternal>
            <IconButton
              aria-label="Note URL"
              icon={<FaFileAlt />}
              colorScheme={note_url2 ? "teal" : "gray"}
              isDisabled={!note_url2}
            />
          </Link>
        </Tooltip>

        <Tooltip label="Note URL">
          <Link href={note_url3} isExternal>
            <IconButton
              aria-label="Note URL"
              icon={<FaFileAlt />}
              colorScheme={note_url3 ? "teal" : "gray"}
              isDisabled={!note_url3}
            />
          </Link>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default LinkButtonsForReferenceForChallengeResult;
