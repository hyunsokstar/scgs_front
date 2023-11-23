import React, { useState } from "react";
import ReactDataGrid, {
  Column,
  RenderCellProps,
  RenderEditCellProps,
  RenderCheckboxProps,
  RenderHeaderCellProps,
  useRowSelection,
} from "react-data-grid";
import { Box, Input } from "@chakra-ui/react";

function SelectFormatter(props: RenderCellProps<any>) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("props : ", props);
    console.log("id : ", props.row.id);
  }

  return <input type="checkbox" {...props} onChange={handleChange} />;
}

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus();
  input?.select();
}

function textEditor<TRow, TSummaryRow>({
  row,
  column,
  onRowChange,
  onClose,
}: RenderEditCellProps<TRow, TSummaryRow>) {
  return (
    <Input
      ref={autoFocusAndSelect}
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={(event) =>
        onRowChange({ ...row, [column.key]: event.target.value })
      }
      onBlur={() => onClose(true, false)}
    />
  );
}

function UserManagement() {
  const SelectColumn: Column<any, any> = {
    key: "selected",
    name: "",
    width: 35,
    minWidth: 35,
    maxWidth: 35,
    resizable: false,
    sortable: false,
    frozen: true,
    // renderHeaderCell(props) {
    //   return <HeaderRenderer {...props} />;
    // },
    renderCell(props: any) {
      return <SelectFormatter {...props} />;
    },
  };

  const columns = [
    SelectColumn,
    { key: "id", name: "ID" },
    {
      key: "title",
      name: "title",
      frozen: true,
      renderEditCell: textEditor,
      renderSummaryCell({ row }: any) {
        return `${row.totalCount} records`;
      },
    },
  ];

  const rowsData = [
    { id: 0, title: "Example" },
    { id: 1, title: "Demo" },
  ];

  const [rows, setRows] = useState(rowsData);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  return <ReactDataGrid columns={columns} rows={rows} onRowsChange={setRows} />;
}

export default UserManagement;
