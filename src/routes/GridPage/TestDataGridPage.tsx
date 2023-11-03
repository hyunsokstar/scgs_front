/* eslint-disable react-hooks/rules-of-hooks */
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import React, { useState } from "react";

// import { faker } from "@faker-js/faker";

import styles from "./grid.module.css";
import { Box, Button } from "@chakra-ui/react";
import TextEditor from "../../components/Editor/textEditor";

interface Row {
  id: number;
  title: string;
  client: string;
  area: string;
  country: string;
  contact: string;
  assignee: string;
  progress: number;
  startTimestamp: number;
  endTimestamp: number;
  budget: number;
  transaction: string;
  account: string;
  version: string;
  available: boolean;
}


// rome-ignore lint/suspicious/noExplicitAny: <explanation>
const checkboxFormatter = ({ row, column, onRowChange, onClose }: any) => {
  return (
    <input
      type="checkbox"
      value={row.id}
      checked={row.selected}
      onChange={(e) => {
        // const checked = e.target.checked;
        onRowChange({ ...row, selected: !row.selected });
      }}
    />
  );
};

const columns = [
  {
    key: "checkbox",
    name: "",
    width: 50,
    resizable: false,
    sortable: false,
    formatter: checkboxFormatter,
  },
  { key: "id", name: "ID" },
  { key: "title", name: "Title", editorble: true, editor: TextEditor },
  { key: "client", name: "client" },
  { key: "area", name: "area" },
  { key: "country", name: "country" },
];

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
function createRows(): any {
  // const now = Date.now();
  // const rows: Row[] = [];

  // for (let i = 0; i < 100; i++) {
  //   rows.push({
  //     id: i,
  //     title: `Task #${i + 1}`,
  //     client: faker.company.name(),
  //     area: faker.name.jobArea(),
  //     country: faker.address.country(),
  //     contact: faker.internet.exampleEmail(),
  //     assignee: faker.name.fullName(),
  //     progress: Math.random() * 100,
  //     startTimestamp: now - Math.round(Math.random() * 1e10),
  //     endTimestamp: now + Math.round(Math.random() * 1e10),
  //     budget: 500 + Math.random() * 10500,
  //     transaction: faker.finance.transactionType(),
  //     account: faker.finance.iban(),
  //     version: faker.system.semver(),
  //     available: Math.random() > 0.5,
  //   });
  // }

  // return rows;
}

function gridElement() {
  const [rows, setRows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(
    () => new Set()
  );

  function rowKeyGetter(row: Row) {
    return row.id;
  }

  const rowChangeHandler = (rows: Row[]) => {
    // console.log("rows : ", rows);
    setRows(rows);
  };

  const handleAddRow = () => {
    console.log("행 추가 클릭");

    // const newRow = { id: rows.length + 1 , title:""};
    const newRow = { id: rows.length + 1, selected: true };
    setRows([newRow, ...rows]);
  };

  return (
    <Box mt={2}>
      <Button onClick={handleAddRow}>행 추가</Button>
      <DataGrid
        columns={columns}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        defaultColumnOptions={{
          sortable: true,
          resizable: true,
        }}
        selectedRows={selectedRows}
        onRowsChange={rowChangeHandler}
        onSelectedRowsChange={setSelectedRows}
        className="fill-grid"
        // rome-ignore lint/suspicious/noExplicitAny: <explanation>
        rowClass={(row: any) => {
          // console.log("row : ", row);
          if (row.selected) {
            return styles.selected;
          } else {
            return "";
          }
        }}
      />
    </Box>
  );
}

export default gridElement;
