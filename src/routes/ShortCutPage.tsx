import { Box } from "@chakra-ui/react";
import React from "react";
import TableForShortCut from "../components/Table/TableForShortCut";

interface Props {}

const ShortCutPage = (props: Props) => {
  return (
    <Box>
      <TableForShortCut />
    </Box>
  );
};

export default ShortCutPage;
