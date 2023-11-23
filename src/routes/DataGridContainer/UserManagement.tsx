import React, { useState } from "react";
import ReactDataGrid, { Column, RenderCellProps } from "react-data-grid";
import { Box } from "@chakra-ui/react";

function UserManagement() {
  const SELECT_COLUMN_KEY = "select-row";

  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  function SelectFormatter(props: RenderCellProps<any>) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      console.log("props : ", props);
      console.log("id : ", props.row.id);
    }

    return <input type="checkbox" {...props} onChange={handleChange} />;
  }

  const SelectColumn: Column<any, any> = {
    key: "selected",
    name: "",
    width: 35,
    minWidth: 35,
    maxWidth: 35,
    resizable: false,
    sortable: false,
    frozen: true,
    renderHeaderCell(props) {
      return <input type="checkbox" />;
    },
    renderCell(props: any) {
      return <SelectFormatter {...props} />;
    },
  };

  const columns = [
    SelectColumn,
    { key: "id", name: "ID" },
    { key: "title", name: "Title"},
  ];

  const rows = [
    { id: 0, title: "Example"},
    { id: 1, title: "Demo" },
  ];

  return (
    <ReactDataGrid
      columns={columns}
      rows={rows}
      onRowsChange={() => {
        console.log("change !");
      }}
    />
  );
}

export default UserManagement;
