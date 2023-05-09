import React, { useState } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import {
  LongTermPlanContent,
  LongTermPlanContentList,
} from "../../types/type_for_plan_maker";
import CheckBoxForGrid from "./Formatter/CheckBoxForGrid";
import styles from "./css/table_for_contents.module.css";

const columns = [
  {
    key: "checkbox",
    name: "checkbox",
    width: 20,
    formatter: CheckBoxForGrid,
    headerRenderer: ({ column }: any) => (
      <input type="checkbox" onClick={column.allCheckHandler} />
    ),
  },
  { key: "id", name: "ID" },
  { key: "long_term_plan", name: "Long Term Plan" },
  { key: "start", name: "Start" },
  { key: "end", name: "End" },
  { key: "name", name: "Name" },
  { key: "progress", name: "Progress" },
  { key: "type", name: "Type" },
  { key: "hideChildren", name: "Hide Children" },
  { key: "displayOrder", name: "Display Order" },
  { key: "project", name: "Project" },
  { key: "dependencies", name: "Dependencies" },
];

// LongTermPlanContentList
type Props = { dataForPlanContents: LongTermPlanContentList };

const GridTableForPlanContents = ({ dataForPlanContents }: Props) => {
  const [gridRows, setGridRows] =
    useState<LongTermPlanContentList>(dataForPlanContents);

  const allCheckHandler = (column: any) => {
    console.log("column.target.checked : ", column.target.checked);

    const new_grid_rows = gridRows?.map((row) => {
      if (column.target.checked === true) {
        return {
          ...row,
          selected: true,
        };
      } else {
        return {
          ...row,
          selected: false,
        };
      }
    });

    setGridRows(new_grid_rows);
  };

  return (
    <DataGrid
      columns={columns.map((column) => ({
        ...column,
        allCheckHandler,
      }))}
      rows={gridRows}
      onRowsChange={(rows: LongTermPlanContentList) => {
        // console.log("changed rows : ", rows);
        setGridRows(rows);
      }}
      rowClass={(row: LongTermPlanContent) => {
        if (row.selected) {
          // console.log("row : ", row);
          return styles.selected;
        } else {
          return "";
        }
      }}
    />
  );
};

export default GridTableForPlanContents;
