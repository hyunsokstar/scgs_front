import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaBomb } from "react-icons/fa";

interface Props {}

export const Test8 = (props: Props) => {
  return (
    <Box>
      test8 <br />
      <Icon as={FaBomb} color="red.500" boxSize="24px" />
    </Box>
  );
};
