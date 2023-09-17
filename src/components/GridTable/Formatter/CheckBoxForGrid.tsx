import React from "react";
import { Column } from "react-data-grid";
import { Box, Checkbox } from "@chakra-ui/react";

interface Props {
  row: any;
  onRowChange: (row: any) => void;
  column?: Column<any>;
  onClose?: () => void;
}

const CheckBoxForGrid = ({ row, onRowChange }: Props) => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      height={"100%"}
      border={"0px solid blue"}
    >
      <Checkbox
        value={row.id}
        isChecked={row.selected}
        onChange={(e) => {
          const checked = e.target.checked;
          const new_row = { ...row, selected: checked };
          console.log("new_row: ", new_row);
          onRowChange(new_row);
        }}
        defaultChecked={row.selected}
        onBlur={() => {}}
        checked={row.selected}
      />
    </Box>
  );
};

export default CheckBoxForGrid;
