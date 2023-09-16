import React, { useState, useEffect } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import TextEditor from "../../components/Editor/textEditor";
import styles from "./css/grid.module.css";
import { Box, Button, useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiForCreateEvaluateCriteriaForChallenge } from "../../apis/challenge_api";

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
  const toast = useToast();
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

  const mutationForSaveEvalutationCriteriaForChallenge = useMutation(
    apiForCreateEvaluateCriteriaForChallenge,
    {
      onSuccess: (result) => {
        console.log("result : ", result);
        // queryClient.refetchQueries(["apiForGetChallengeList"]);

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
    console.log("rowsData for check : ", rowsData);
    // todo: rows data save
    // challengeId와 check 한 rowdata 만 전송해서
    // challengeId 에 해당하는 evaluationCriteria 추가 or update
    //

    const RowsDataForSave = rowsData
      .map((row) => {
        if (row.selected) {
          return row;
        } else {
          return null; // 선택되지 않은 행은 null로 반환
        }
      })
      .filter((row) => row !== null);

    console.log("RowsDataForSave : ", RowsDataForSave);

    mutationForSaveEvalutationCriteriaForChallenge.mutate({
      challengeId: 1,
      rowsDataForChallenge: RowsDataForSave,
    });
  };

  const deleteHandler = () => {
    const rowsDataForUpdate = rowsData.filter((row) => !row.selected); // 선택되지 않은 행만 남김
    setRowsData(rowsDataForUpdate);
  };

  useEffect(() => {
    if (sampleRowsData) {
      setRowsData(sampleRowsData);
    }
  }, []);

  return (
    <Box>
      <Box display={"flex"} justifyContent={"flex-end"} gap={2} my={2}>
        <Button variant="outline" size="sm" onClick={addRow}>
          add row
        </Button>

        <Button variant="outline" size="sm" onClick={saveHandler}>
          save
        </Button>

        <Button variant="outline" size="sm" onClick={deleteHandler}>
          delete
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

// 구현한것
// row , column 설정
// title TextEditor 설정, all check, 체크 박스 설정
// 행(빈 행) 추가 , save(체크한 행들에 대해) 버튼 설정
// 행 삭제(체크한 행에 대해) 설정
