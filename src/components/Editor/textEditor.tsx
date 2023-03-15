import { Box, Input } from "@chakra-ui/react";
import React, { ReactElement } from "react";
// import { CalculatedColumn , TRow, TSummaryRow} from "react-data-grid";

// interface Props {
//   column: CalculatedColumn<TRow, TSummaryRow>;
//   row: TRow;
//   onRowChange: (row: TRow, commitChanges?: boolean) => void;
//   onClose: (commitChanges?: boolean) => void;
// }

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
        // className={textEditorClassname}
        // ref={autoFocusAndSelect}
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
