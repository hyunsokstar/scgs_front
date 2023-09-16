import React, { useState, useEffect } from "react";
import DataGrid from "react-data-grid";
import { Box } from "@chakra-ui/react";
import { ITypeForChallengeRow } from "../../types/type_for_challenge";

interface IProps {
  selectedChallenge: ITypeForChallengeRow;
}

interface IEvaluationCriteria {
  id: number;
  item_description: string;
}

const columns = [
  { key: "id", name: "ID" },
  { key: "item_description", name: "평가 기준" },
];

const GridTableForEvaluationCriteriaForChallenge: React.FC<IProps> = ({
  selectedChallenge,
}: IProps) => {
  // 평가 기준 데이터를 저장할 상태와 초기값 설정
  const [evaluationCriterials, setEvaluationCriterials] = useState<
    IEvaluationCriteria[]
  >([]);

  useEffect(() => {
    // selectedChallenge가 변경될 때마다 평가 기준 데이터 업데이트
    setEvaluationCriterials(selectedChallenge.evaluation_criterials || []);
  }, [selectedChallenge]);

  return (
    <Box>
      {evaluationCriterials.length > 0 ? (
        <DataGrid
          columns={columns}
          rows={evaluationCriterials}
          rowHeight={40}
        />
      ) : (
        <div>평가 기준 데이터가 없습니다.</div>
      )}
    </Box>
  );
};

export default GridTableForEvaluationCriteriaForChallenge;
