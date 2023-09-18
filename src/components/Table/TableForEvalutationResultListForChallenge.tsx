import React from "react";

interface IProps {
  evaluationResults: {
    [username: string]: {
      [criteria: string]: string;
    };
  };
}

const TableForEvalutationResultListForChallenge: React.FC<IProps> = ({
  evaluationResults,
}: IProps) => {
  if (!evaluationResults || Object.keys(evaluationResults).length === 0) {
    return <div>No data for 평가 결과</div>;
  }

  const usernames = Object.keys(evaluationResults);
  const criteriaSet = new Set<string>();

  // 모든 평가 결과에서 사용된 criteria 수집
  usernames.forEach((username) => {
    Object.keys(evaluationResults[username]).forEach((criteria) => {
      criteriaSet.add(criteria);
    });
  });

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Username</th>
          {[...criteriaSet].map((criteria) => (
            <th key={criteria}>{criteria}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {usernames.map((username) => (
          <tr key={username}>
            <td>{username}</td>
            {[...criteriaSet].map((criteria) => (
              <td key={criteria}>
                {evaluationResults[username][criteria] || "N/A"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableForEvalutationResultListForChallenge;
