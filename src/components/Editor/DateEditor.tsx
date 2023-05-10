import React, { ReactElement, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { Column, Row } from "react-data-grid";
import moment from "moment";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";

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
  const [value, setValue] = useState(row[column.key]);

  const handleChange = (date: any) => {
    const momentDate = moment(date);
    setValue(momentDate);
    onRowChange({ ...row, [column.key]: momentDate.format("YYYY-MM-DD"), selected: true });
  };

  return (
    <Box height={"100%"} border={"1px solid blue"}>
      <Datetime
        value={value}
        dateFormat={"YYYY-MM-DD"}
        timeFormat={false}
        onChange={handleChange}
        inputProps={{ placeholder: `${column.key}`, onBlur: () => onClose(true), autoFocus: true }}
      />
    </Box>
  );
}

export default DateEditor;
