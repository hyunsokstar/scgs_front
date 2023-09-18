import React, { useState, useEffect } from "react";
import DataGrid from "react-data-grid";
import { Box, Button, useToast } from "@chakra-ui/react";
import {
  ITypeForChallengeRow,
  ITypeForEvaluationCriteriaRow,
} from "../../types/type_for_challenge";
import CheckBoxForGrid from "./Formatter/CheckBoxForGrid";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreateEvaluateCriteriaForChallenge } from "../../apis/challenge_api";
import TextEditor from "../Editor/textEditor";

interface IProps {
  selectedChallenge: ITypeForChallengeRow;
}

// const columns = [
//   { key: "id", name: "ID" },
//   { key: "item_description", name: "평가 기준" },
// ];

const columns = [
  {
    key: "checkbox",
    name: "checkbox",
    width: 20,
    formatter: CheckBoxForGrid,
    headerRenderer: ({ column }: any) => (
      <input type="checkbox" onClick={column.checkAllHandler} />
    ),
  },
  { key: "id", name: "ID" },
  {
    key: "item_description",
    name: "item_description",
    editor: TextEditor,
    editable: true,
  },
];

// 1122
const GridTableForUpdateEvaluationCriteriaForChallenge: React.FC<IProps> = ({
  selectedChallenge,
}: IProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const [rowsDataForEvaluateCriteria, setRowsDataForEvaluateCriteria] =
    useState<ITypeForEvaluationCriteriaRow[]>([]);

  const checkAllHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;

    const newGridRows = rowsDataForEvaluateCriteria.map((row) => ({
      ...row,
      selected: isChecked,
    }));

    setRowsDataForEvaluateCriteria(newGridRows);
  };

  const addRow = () => {
    // UUID 생성
    // const newId = uuidv4();

    // 새로운 행 추가
    const newRow: ITypeForEvaluationCriteriaRow = {
      id: "new_id",
      item_description: "",
      selected: false,
    };
    setRowsDataForEvaluateCriteria([...rowsDataForEvaluateCriteria, newRow]);
  };

  const mutationForSaveEvalutationCriteriaForChallenge = useMutation(
    apiForCreateEvaluateCriteriaForChallenge,
    {
      onSuccess: (result) => {
        console.log("result : ", result);
        queryClient.refetchQueries(["apiForGetDetailForChallenge", selectedChallenge.id]);

        toast({
          status: "success",
          title: "create challenge success !",
          description: result.message,
          duration: 2000,
          isClosable: true,
        });
      },
      onError: (error: any) => {
        console.error("Error occurred for create image: ", error); // 에러 메시지 출력
        toast({
          status: "error",
          title: "Error",
          description: error.response.data.message,
          duration: 2000,
          isClosable: true,
        });
        // 필요한 다른 에러 처리 작업 수행 가능
      },
    }
  );

  const saveHandler = () => {
    console.log(
      "rowsDataForEvaluateCriteria for check : ",
      rowsDataForEvaluateCriteria
    );
    // todo: rows data save
    // challengeId와 check 한 rowdata 만 전송해서
    // challengeId 에 해당하는 evaluationCriteria 추가 or update
    //

    const RowsDataForSave = rowsDataForEvaluateCriteria
      .map((row) => {
        if (row.selected) {
          return row;
        } else {
          return null; // 선택되지 않은 행은 null로 반환
        }
      })
      .filter((row) => row !== null);

    // console.log("RowsDataForSave : ", RowsDataForSave);

    mutationForSaveEvalutationCriteriaForChallenge.mutate({
      challengeId: selectedChallenge.id,
      RowsDataForSave: RowsDataForSave,
    });
  };

  // 2244
  const rowsChangeHandler = (rows: ITypeForEvaluationCriteriaRow[]) => {
    // console.log("changed rows : ", rows);
    setRowsDataForEvaluateCriteria(rows);
  };

  useEffect(() => {
    setRowsDataForEvaluateCriteria(
      selectedChallenge.evaluation_criterials || []
    );
  }, [selectedChallenge]);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} gap={2} my={2}>
        <Button variant="outline" size="sm" onClick={addRow}>
          add row
        </Button>

        <Button variant="outline" size="sm" onClick={saveHandler}>
          save
        </Button>

      </Box>

      {rowsDataForEvaluateCriteria.length > 0 ? (
        <DataGrid
          rows={rowsDataForEvaluateCriteria}
          rowHeight={40}
          // columns={columns}
          columns={columns.map((col) => ({
            ...col,
            checkAllHandler,
          }))}
          onRowsChange={rowsChangeHandler}
        />
      ) : (
        <Box>평가 기준 데이터가 없습니다.</Box>
      )}
    </Box>
  );
};

export default GridTableForUpdateEvaluationCriteriaForChallenge;
