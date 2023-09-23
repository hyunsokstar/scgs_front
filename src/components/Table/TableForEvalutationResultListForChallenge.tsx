import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import ToggleButtonForUpdateResultForEvaluationForChallenge from "../ToggleButton/ToggleButtonForUpdateResultForEvaluationForChallenge";

interface IProps {
  challengeId: number | string;
  evaluationResults: {
    [username: string]: {
      [criteria: string]: string;
    };
  };
}

const TableForEvalutationResultListForChallenge: React.FC<IProps> = ({
  challengeId,
  evaluationResults,
}: IProps) => {
  if (!evaluationResults || Object.keys(evaluationResults).length === 0) {
    return <div>No data for 평가 결과</div>;
  }

  console.log("evaluationResults : ", evaluationResults);

  const usernames = Object.keys(evaluationResults);
  const criteriaSet = new Set<string>();

  // 모든 평가 결과에서 사용된 criteria 수집
  usernames.forEach((username) => {
    Object.keys(evaluationResults[username]).forEach((criteria) => {
      criteriaSet.add(criteria);
    });
  });

  return (
    <Box width="100%">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>crieteria</Th>
            <Th>passed</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usernames.map((username) => (
            <Tr key={username}>
              <Td>{username}</Td>
              <Td key={username}>
                {[...criteriaSet].map((criteria) => (
                  <Box mt={2}>
                    <ToggleButtonForUpdateResultForEvaluationForChallenge
                      challengeId={challengeId}
                      userName={username}
                      criteria={criteria}
                      option={evaluationResults[username][criteria]}
                    />
                  </Box>
                ))}
              </Td>
              <Td>pass?</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForEvalutationResultListForChallenge;
