import { Input } from "@chakra-ui/react";
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
  return (
    <div>
      <Input
        // className={textEditorClassname}
        // ref={autoFocusAndSelect}
        defaultValue={row[column.key].value}
        onChange={(event) => {
          console.log("row[id] : ", row["id"]);
          onRowChange({ ...row, [column.key]: event.target.value, selected: true});
        }}
        onBlur={() => onClose(true)}
      />{" "}
    </div>
  );
}

export default TextEditor;
