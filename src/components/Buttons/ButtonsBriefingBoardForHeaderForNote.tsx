import { Box, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaCheckSquare, FaTrash } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";

interface Props {}

const ButtonsBriefingBoardForHeaderForNote = (props: Props) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      gap={2}
      p={2}
    >
      <Box display={"flex"} gap={2}>
        <Button
          leftIcon={<FaCheckSquare />}
          size="sm"
          colorScheme="green"
          variant="outline"
          _hover={{ bg: "green.50" }}
          borderRadius={"full"}
        >
          All
        </Button>
        <Button
          aria-label={""}
          leftIcon={<FaTrash />}
          size="sm"
          colorScheme="red"
          variant="outline"
          _hover={{ bg: "red.50" }}
          borderRadius="full"
          ml={0}
        >
          delete
        </Button>
      </Box>

      <IconButton
        aria-label="write"
        icon={<RiPencilLine />}
        size="sm"
        colorScheme="red"
        variant="outline"
        _hover={{ bg: "red.50" }}
        borderRadius="full"
        ml={0}
      >
        Writer
      </IconButton>
    </Box>
  );
};

export default ButtonsBriefingBoardForHeaderForNote;
