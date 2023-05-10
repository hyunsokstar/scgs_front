import { Box, Input } from "@chakra-ui/react";
import React, { ReactElement } from "react";

function TextEditor({
  row,
  column,
  onRowChange,
  onClose,
}: // rome-ignore lint/suspicious/noExplicitAny: <explanation>
any): ReactElement {
  // console.log("column : ", column);
  // console.log("row : ", row);
  // console.log("row[column.key] : ", row[column.key]);

  return (
    <Box height={"100%"} border={"1px solid blue"}>
      <Input
        placeholder={`${column.key}`}
        defaultValue={
          row[column.key] ? row[column.key] : ""
        }
        height={"100%"}
        onChange={(event) => {
          console.log("row[id] : ", row["id"]);
          onRowChange({
            ...row,
            [column.key]: event.target.value,
            selected: true,
          });
        }}
        autoFocus={true}
        onBlur={() => onClose(true)}
      />
    </Box>
  );
}

export default TextEditor;
