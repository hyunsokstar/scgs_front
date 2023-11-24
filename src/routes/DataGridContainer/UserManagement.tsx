import React, { useState } from "react";
import DataGrid, {
  Column,
  RenderCellProps,
  RenderEditCellProps,
  RenderCheckboxProps,
  RenderHeaderCellProps,
  RenderGroupCellProps,
  useRowSelection,
} from "react-data-grid";
import { Box, Button, Input } from "@chakra-ui/react";

export function renderCheckbox({ onChange, ...props }: RenderCheckboxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.checked, (e.nativeEvent as MouseEvent).shiftKey);
  }

  return <input type="checkbox" {...props} onChange={handleChange} />;
}

function SelectCellFormatter({
  value,
  tabIndex,
  disabled,
  onChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SelectCellFormatterProps) {
  // const renderCheckbox = useDefaultRenderers()!.renderCheckbox!;

  return renderCheckbox({
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    tabIndex,
    disabled,
    checked: value,
    onChange,
  });
}

function SelectFormatter(props: RenderCellProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <SelectCellFormatter
      aria-label="Select"
      tabIndex={props.tabIndex}
      value={isRowSelected}
      onChange={(checked, isShiftClick) => {
        onRowSelectionChange({
          type: "ROW",
          row: props.row,
          checked,
          isShiftClick,
        });
      }}
    />
  );
}

// TextEditFormatter;
function TextEditFormatter({ row, column, onRowChange, onClose }: any) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <Input
      value={row[column.key] as unknown as string}
      onChange={(event) => {
        onRowChange({ ...row, [column.key]: event.target.value });
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onRowSelectionChange({
            type: "ROW",
            row,
            checked: true,
            isShiftClick: false,
          });
        }
      }}
      onBlur={(event) => {
        onRowChange({ ...row, [column.key]: event.target.value });
        onRowSelectionChange({
          type: "ROW",
          row,
          checked: true,
          isShiftClick: false,
        });
        onClose(true, false);
      }}
    />
  );
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
  // const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <Input
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={(event) =>
        onRowChange({ ...row, [column.key]: event.target.value })
      }
      onBlur={() => onClose(true, false)}
    />
  );
}

type SharedInputProps = Pick<
  RenderCheckboxProps,
  "disabled" | "tabIndex" | "aria-label" | "aria-labelledby"
>;

interface SelectCellFormatterProps extends SharedInputProps {
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
}

function HeaderRenderer(props: RenderHeaderCellProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <SelectCellFormatter
      aria-label="Select All"
      tabIndex={props.tabIndex}
      value={isRowSelected}
      onChange={(checked) => {
        onRowSelectionChange({ type: "HEADER", checked });
      }}
    />
  );
}

function SelectGroupFormatter(props: RenderGroupCellProps<unknown>) {
  const [isRowSelected, onRowSelectionChange] = useRowSelection();

  return (
    <SelectCellFormatter
      aria-label="Select Group"
      tabIndex={props.tabIndex}
      value={isRowSelected}
      onChange={(checked) => {
        onRowSelectionChange({
          type: "ROW",
          row: props.row,
          checked,
          isShiftClick: false,
        });
      }}
    />
  );
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
    return <HeaderRenderer {...props} />;
  },
  renderCell(props: any) {
    return <SelectFormatter {...props} />;
  },
  // renderGroupCell(props) {
  //   return <SelectGroupFormatter {...props} />;
  // },
};

interface IUserRow {
  id: number;
  title: string;
}

function UserManagement() {
  const columns = [
    SelectColumn,
    { key: "id", name: "ID" },
    {
      key: "title",
      name: "title",

      renderEditCell(props: any) {
        return <TextEditFormatter {...props} />;
      },

      // renderEditCell: textEditor,
    },
  ];

  const rowsData: IUserRow[] = [
    { id: 0, title: "Example" },
    { id: 1, title: "Demo" },
  ];

  const [rows, setRows] = useState<IUserRow[]>(rowsData);
  const [selectedRows, setSelectedRows] = useState(
    (): ReadonlySet<number> => new Set()
  );

  // 행 추가 함수
  const addRow = () => {
    const newRow = { id: rows.length, title: "New Row" }; // 새로운 행 데이터 생성
    const updatedRows = [...rows, newRow]; // 기존 행에 새로운 행 추가
    setRows(updatedRows); // 업데이트된 행으로 상태 업데이트
  };

  const deleteSelectedRows = () => {
    const updatedRows = rows.filter((row) => !selectedRows.has(row.id)); // 선택되지 않은 행만 필터링
    setRows(updatedRows); // 선택된 행이 제외된 업데이트된 행으로 상태 업데이트
    setSelectedRows(new Set()); // 선택된 행 상태 초기화
  };

  function rowKeyGetter(row: any) {
    return row.id;
  }

  // 선택된 행의 ID를 배열로 얻기 위해
  // const selectedRowIds = Array.from(selectedRows);

  const handleRowChange = (updatedRows: IUserRow[]) => {
    setRows(updatedRows);
  };

  return (
    <Box>
      {/* 선택된 행의 ID들 출력 */}
      <Box display={"flex"} justifyContent={"flex-end"} p={2} gap={2}>
        <Button onClick={addRow}>Add Row</Button>
        <Button onClick={deleteSelectedRows}>Delete Selected Rows</Button>
      </Box>

      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={rows}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        onRowsChange={handleRowChange}
      />
    </Box>
  );
}

export default UserManagement;
