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
import {
  apiForUpdatePlanContentsForChecked,
  apiFordeletePlanContentsForChecked,
} from "../../apis/api_for_long_term_plan";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DateEditor from "../Editor/DateEditor";
import dayjs from "dayjs";
import { log } from "console";

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
  // { key: "long_term_plan", name: "Long Term Plan" },
  { key: "name", name: "Name", editor: TextEditor, editable: true },
  { key: "start", name: "Start", editor: DateEditor, editable: true },
  { key: "end", name: "End", editor: DateEditor, editable: true },
  { key: "progress", name: "Progress", editor: TextEditor, editable: true },
  {
    key: "displayOrder",
    name: "Display Order",
    editor: TextEditor,
    editable: true,
  },
  { key: "dependencies", name: "Dependencies" },
];

interface Props {
  plan_pk: number;
  dataForPlanContents: LongTermPlanContentList;
}

// 1122
const GridTableForPlanContents = ({ plan_pk, dataForPlanContents }: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  console.log("plan_pk : ", plan_pk);

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

  const today = dayjs().format("YYYY-MM-DD");

  const addEmptyRow = () => {
    const newRow: any = {
      long_term_plan: plan_pk,
      start: today,
      end: today,
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

  const validateData = (data: LongTermPlanContent[]) => {
    const requiredFields = ["start", "end", "name", "progress", "displayOrder"];
    const invalidRows = data.filter((row) => {
      for (const field of requiredFields) {
        if (!row[field]) {
          return true;
        }
      }
      return false;
    });

    console.log("invalidRows : ", invalidRows);

    if (invalidRows.length) {
      const invalidIds = invalidRows.map((row) => {
        if (row.id !== undefined) {
          return row.id;
        } else {
          return "";
        }
      });
      const message = invalidIds.includes("")
        ? "One or more required fields in a newly added row are missing"
        : `The following rows are missing required fields: ${invalidIds.join(
            ", "
          )}`;
      alert(message);
      return false;
    }
    return true;
  };

  // save 버튼 누르면 체크된 내용 db 에서도 update
  const saveHandler = () => {
    const data = gridRows.filter((row) => row.selected);

    const result = validateData(data);
    // alert(result);

    if (result) {
      // console.log("data_for_save : ", data);
      mutationForUpdatePlanContentsForChecked.mutate(data);
    }
  };

  const mutationForPlanContentsForChecked = useMutation(
    (idsForDeleteContentsForChecked: number[]) => {
      return apiFordeletePlanContentsForChecked(idsForDeleteContentsForChecked);
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
          title: "delete note contnet for checked 성공!",
          status: "success",
          description: data.message,
        });
      },
    }
  );

  const deleteHandler = () => {
    const idsForDeleteContentsForChecked = gridRows
      .filter((row) => row.selected) // row.selected가 true인 것만 필터링
      .map((row) => row.id); // 요소로 row.id만 추출하여 배열로 만듦

    console.log(
      "idsForDeleteContentsForChecked : ",
      idsForDeleteContentsForChecked
    );

    console.log(
      "idsForDeleteContentsForChecked : ",
      idsForDeleteContentsForChecked
    );

    mutationForPlanContentsForChecked.mutate(idsForDeleteContentsForChecked);
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
        <Button
          variant="outline"
          size="md"
          borderColor="black"
          _hover={{ backgroundColor: "gray.100" }}
          m={2}
          onClick={deleteHandler} // Add onClick event handler here
        >
          delete
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
