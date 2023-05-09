import React from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { LongTermPlanContentList } from "../../types/type_for_plan_maker";

const columns = [
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
  return <DataGrid columns={columns} rows={dataForPlanContents} />;
};

export default GridTableForPlanContents;