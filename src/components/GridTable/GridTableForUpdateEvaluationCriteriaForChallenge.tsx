import React, { useState, useEffect } from "react";
import DataGrid from "react-data-grid";
import { Box } from "@chakra-ui/react";
import {
  ITypeForChallengeRow,
  ITypeForEvaluationCriteriaRow,
} from "../../types/type_for_challenge";

interface IProps {
  selectedChallenge: ITypeForChallengeRow;
}

const columns = [
  { key: "id", name: "ID" },
  { key: "item_description", name: "평가 기준" },
];

const GridTableForUpdateEvaluationCriteriaForChallenge: React.FC<IProps> = ({
  selectedChallenge,
}: IProps) => {
  const [evaluationCriterials, setEvaluationCriterials] = useState<
    ITypeForEvaluationCriteriaRow[]
  >([]);

  useEffect(() => {
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
        <Box>평가 기준 데이터가 없습니다.</Box>
      )}
    </Box>
  );
};

export default GridTableForUpdateEvaluationCriteriaForChallenge;
