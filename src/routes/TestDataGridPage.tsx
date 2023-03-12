/* eslint-disable react-hooks/rules-of-hooks */
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import React, { useState } from "react";

import { faker } from "@faker-js/faker";

import {default as textEditor}  from '../components/Editor/textEditor';


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

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title", editorble: true, editor: textEditor },
  { key: "client", name: "client" },
  { key: "area", name: "area" },
  { key: "country", name: "country" },
];

function createRows(): readonly Row[] {
  const now = Date.now();
  const rows: Row[] = [];

  for (let i = 0; i < 100; i++) {
    rows.push({
      id: i,
      title: `Task #${i + 1}`,
      client: faker.company.name(),
      area: faker.name.jobArea(),
      country: faker.address.country(),
      contact: faker.internet.exampleEmail(),
      assignee: faker.name.fullName(),
      progress: Math.random() * 100,
      startTimestamp: now - Math.round(Math.random() * 1e10),
      endTimestamp: now + Math.round(Math.random() * 1e10),
      budget: 500 + Math.random() * 10500,
      transaction: faker.finance.transactionType(),
      account: faker.finance.iban(),
      version: faker.system.semver(),
      available: Math.random() > 0.5,
    });
  }

  return rows;
}

function gridElement() {
  // const [state, setstate] = useState("");
  const [rows, setRows] = useState(createRows);
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<number>>(
    () => new Set()
  );

  function rowKeyGetter(row: Row) {
    return row.id;
  }

  return (
    <DataGrid
      rowKeyGetter={rowKeyGetter}
      columns={columns}
      rows={rows}
      defaultColumnOptions={{
        sortable: true,
        resizable: true,
      }}
      className="fill-grid"
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      onRowsChange={setRows}
      // sortColumns={sortColumns}
      // onSortColumnsChange={setSortColumns}
      // topSummaryRows={summaryRows}
      // bottomSummaryRows={summaryRows}
      // direction={direction}
    />
  );
}

export default gridElement;
