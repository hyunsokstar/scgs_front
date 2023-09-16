import React from "react";
import DataGrid from "react-data-grid";
import { Box } from "@chakra-ui/react";

interface EvaluationCriteria {
  id: number;
  item_description: string;
}

const columns = [
  { key: "id", name: "ID" },
  { key: "item_description", name: "평가 기준" },
];

const rows: EvaluationCriteria[] = [
  { id: 1, item_description: "next13을 잘 활용 했나?" },
  { id: 2, item_description: "fastapi를 잘 활용 했나?" },
  { id: 3, item_description: "게시판의 여러 가지 기능이 잘 구현 되었나?" },
  { id: 4, item_description: "UI가 훌륭한가?" },
  { id: 5, item_description: "검색 기능이 잘 구현 되었나?" },
];

const GridTableForEvaluationCriteriaForChallenge: React.FC = () => {
  return (
    <Box>
      <DataGrid
        columns={columns}
        rows={rows}
        rowHeight={40}
      />
    </Box>
  );
};

export default GridTableForEvaluationCriteriaForChallenge;
