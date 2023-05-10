import React, { useState } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import {
  LongTermPlanContent,
  LongTermPlanContentList,
} from "../../types/type_for_plan_maker";
import CheckBoxForGrid from "./Formatter/CheckBoxForGrid";
import styles from "./css/table_for_contents.module.css";
import { Box, Button, useToast } from "@chakra-ui/react";
import TextEditor from "../Editor/textEditor";
import { apiForUpdatePlanContentsForChecked } from "../../apis/api_for_long_term_plan";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
  { key: "name", name: "Name", editor: TextEditor, editable: true },
  { key: "start", name: "Start" },
  { key: "end", name: "End" },
  { key: "progress", name: "Progress" },
  { key: "displayOrder", name: "Display Order" },
  { key: "dependencies", name: "Dependencies" },
];

// LongTermPlanContentList
type Props = { dataForPlanContents: LongTermPlanContentList };

// 1122
const GridTableForPlanContents = ({ dataForPlanContents }: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();

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

  const addEmptyRow = () => {
    const newRow: any = {
      start: "",
      end: "",
      name: "",
      dependencies: "",
      selected: false,
    };

    setGridRows((prevRows) => [...prevRows, newRow]);
  };

  const mutationForUpdatePlanContentsForChecked = useMutation(
    (checkedRowsForUpdate: LongTermPlanContentList) => {
      return apiForUpdatePlanContentsForChecked(checkedRowsForUpdate);
    },
    {
      onSettled: () => {
        // setSelectedItems([]);
      },
      onSuccess: (data) => {
        console.log("data : ", data);
        // refetch_for_api_docu();
        queryClient.refetchQueries(["getContentsListForPlan"]);

        toast({
          title: "Update For Plan Contents For Checked 성공!",
          status: "success",
          description: data.message,
        });

        // window.location.reload(); // 새로고침
      },
    }
  );

  // save 버튼 누르면 체크된 내용 db 에서도 update
  const saveHandler = () => {
    const data_for_save = gridRows
    .filter((row) => row.selected)
    console.log("data_for_save : ", data_for_save);
    mutationForUpdatePlanContentsForChecked.mutate(data_for_save);
  };

  return (
    <Box border={"1px solid black"}>
      <Box textAlign={"right"}>
        <Button
          variant="outline"
          size="md"
          borderColor="black"
          _hover={{ backgroundColor: "gray.100" }}
          m={2}
          onClick={addEmptyRow} // Add onClick event handler here
        >
          일정 추가
        </Button>{" "}
        <Button
          variant="outline"
          size="md"
          borderColor="black"
          _hover={{ backgroundColor: "gray.100" }}
          m={2}
          onClick={saveHandler} // Add onClick event handler here
        >
          save
        </Button>{" "}
      </Box>

      <Box>
        <DataGrid
          columns={columns.map((column) => ({
            ...column,
            allCheckHandler,
          }))}
          rows={gridRows}
          onRowsChange={(rows: LongTermPlanContentList) => {
            console.log("changed rows : ", rows);
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
      </Box>
    </Box>
  );
};

export default GridTableForPlanContents;
