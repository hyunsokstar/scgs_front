import { Box, Select } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { IUserRow } from "../../types/user/user_types";

interface Props {
  row: IUserRow; // row 변수의 타입 설정
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  column: any; // column 변수의 타입 설정
  onRowChange: (row: number) => void; // onRowChange 함수의 타입 설정
  onClose: () => void; // onClose 함수의 타입 설정
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function SelectBoxEditor({
  row,
  column,
  onRowChange,
  onClose,
}: any): ReactElement {
  return (
    <Box height={"100%"}>
      <Select
        placeholder="Select option"
        size={"sm"}
        defaultValue={row[column.key] ? row[column.key] : ""}
        onChange={(event) => {
          console.log("row[id] : ", row["id"]);
          onRowChange({
            ...row,
            [column.key]: event.target.value,
            selected: true,
          });
        }}
      >
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
      </Select>
    </Box>
  );
}

export default SelectBoxEditor;
