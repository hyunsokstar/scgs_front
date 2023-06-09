import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {}

const TableModeForUpdatePage = (props: Props) => {
  return (
    <Box bg="lightblue" display="flex">
      <Box width="50%" border="1px solid black" bg="lavender">
        start table
      </Box>
      <Box width="50%" border="1px solid black" bg="lightpink">
        target table
      </Box>
    </Box>
  );
};

export default TableModeForUpdatePage;
