import { Box, Input } from "@chakra-ui/react";
import React, { ReactElement } from "react";

function TextEditor({ row, column, onRowChange, onClose }: any): ReactElement {
  // console.log("column : ", column);
  // console.log("row : ", row);
  // console.log("row[column.key] : ", row[column.key]);

  return (
    <Box height={"100%"} border={"1px solid blue"}>
      <Input
        height={"100%"}
        autoFocus={true}
        onBlur={() => onClose(true)}
        defaultValue={row[column.key] ? row[column.key] : ""}
        onChange={(event) => {
          console.log("row[column.key] : ", row[column.key]);
          onRowChange({
            ...row,
            [column.key]: event.target.value,
            selected: true,
          });
        }}
      />
    </Box>
  );
}

export default TextEditor;
