import React from "react";
import { Column, RowRendererProps } from "react-data-grid";

interface Props {
    row: RowRendererProps<any>['row'];
    onRowChange: (row: RowRendererProps<any>['row']) => void;
    column?: Column<any>;
    onClose?: () => void;
  }
  

const CheckBoxForGrid: React.FC<Props> = ({ row, onRowChange }) => {
  return (
    <input
      type="checkbox"
      value={row.id}
      checked={row.selected}
      onChange={(e) => {
        const checked = e.target.checked;
        const new_row = { ...row, selected: checked };
        console.log("new_row : ", new_row);
        onRowChange(new_row);
      }}
    />
  );
};

export default CheckBoxForGrid;
