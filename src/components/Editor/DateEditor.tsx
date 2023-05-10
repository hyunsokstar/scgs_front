import React, { ReactElement, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Column, Row } from "react-data-grid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// type Props = {
//   row: Row<any>;
//   column: Column<any, any>;
//   onRowChange: (updatedRow: Row<any>) => void;
//   onClose: (commitChanges: boolean) => void;
// };

function DateEditor({
  row,
  column,
  onRowChange,
  onClose,
}: any): ReactElement {
  const [value, setValue] = useState(new Date(row[column.key]));

  const handleChange = (date: Date | null) => {
    if (date) {
      setValue(date);
      onRowChange({
        ...row,
        [column.key]: date.toISOString().substring(0, 10),
        selected: true,
      });
    }
  };

  return (
    <Box height={"100%"} border={"1px solid blue"}>
      <DatePicker
        selected={value}
        dateFormat={"yyyy-MM-dd"}
        onChange={handleChange}
        onBlur={() => onClose(true)}
        autoFocus
      />
    </Box>
  );
}

export default DateEditor;
