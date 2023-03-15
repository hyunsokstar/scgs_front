import { Box, Select } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props {}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function SelectBoxFormatter({ row, column }: any): ReactElement {
    // console.log("row : ", row);
    
  return (
    <Box>
        {row[column.key]}
    </Box>
  );
}

export default SelectBoxFormatter;
