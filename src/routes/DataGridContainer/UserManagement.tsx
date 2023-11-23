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
import { Box, Input } from "@chakra-ui/react";

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

function UserManagement() {
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
  const [selectedRows, setSelectedRows] = useState(
    (): ReadonlySet<number> => new Set()
  );

  function rowKeyGetter(row: any) {
    return row.id;
  }

  // 선택된 행의 ID를 배열로 얻기 위해
  const selectedRowIds = Array.from(selectedRows);

  return (
    <Box>
      {/* 선택된 행의 ID들 출력 */}
      <div>Selected Row IDs: {selectedRowIds.join(", ")}</div>

      <DataGrid
        rowKeyGetter={rowKeyGetter}
        columns={columns}
        rows={rows}
        selectedRows={selectedRows}
        onSelectedRowsChange={setSelectedRows}
        onRowsChange={setRows}
      />
    </Box>
  );
}

export default UserManagement;
