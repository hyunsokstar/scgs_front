import React, { useState, useEffect } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import TextEditor from "../../components/Editor/textEditor";
import styles from "./css/grid.module.css";
import { Box, Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

interface ITypeForchallengeRow {
  id: string; // UUID로 변경
  title: string;
  selected: boolean;
}

const sampleRowsData: ITypeForchallengeRow[] = [
  { id: uuidv4(), title: "Example", selected: false },
  { id: uuidv4(), title: "Demo", selected: false },
];

const CheckBoxForChallengeRow = ({ row, onRowChange }: any) => {
  return (
    <input
      type="checkbox"
      value={row.id}
      checked={row.selected}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onRowChange({ ...row, selected: event.target.checked });
      }}
    />
  );
};

const columns = [
  {
    key: "checkbox",
    name: "checkbox",
    width: 20,
    formatter: CheckBoxForChallengeRow,
    headerRenderer: ({ column }: any) => (
      <input type="checkbox" onClick={column.checkAll} />
    ),
  },
  { key: "id", name: "ID" },
  { key: "title", name: "Title", editor: TextEditor, editable: true },
];

function Test8() {
  const [rowsData, setRowsData] = useState<ITypeForchallengeRow[]>([]);

  const checkAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    const newGridRows = rowsData.map((row) => ({
      ...row,
      selected: isChecked,
    }));

    setRowsData(newGridRows);
  };

  const rowChangeHandler = (rows: any[]) => {
    setRowsData(rows);
  };

  const addRow = () => {
    // UUID 생성
    const newId = uuidv4();

    // 새로운 행 추가
    const newRow: ITypeForchallengeRow = {
      id: newId,
      title: "",
      selected: false,
    };

    setRowsData([...rowsData, newRow]);
  };

  useEffect(() => {
    if (sampleRowsData) {
      setRowsData(sampleRowsData);
    }
  }, []);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} my={2}>
        <Button variant="outline" size="sm" onClick={addRow}>
          행 추가
        </Button>
      </Box>
      <DataGrid
        columns={columns.map((col) => ({
          ...col,
          checkAll,
        }))}
        rows={rowsData}
        onRowsChange={rowChangeHandler}
        rowClass={(row: any) => {
          return row.selected ? styles.selected_row : "";
        }}
      />
    </Box>
  );
}

export default Test8;
