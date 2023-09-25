import React from "react";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import ToggleButtonForUpdateResultForEvaluationForChallenge from "../ToggleButton/ToggleButtonForUpdateResultForEvaluationForChallenge";
import {
  ChallengeCommentRow,
  ChallengeResultRow,
} from "../../types/type_for_challenge";
import ToggleButtonForUpdatePassedForChallengeResult from "../ToggleButton/ToggleButtonForUpdatePassedForChallengeResult";
import LinkButtonsForReferenceForChallengeResult from "../Buttons/LinkButtonsForReferenceForChallengeResult";
import { EditIcon } from "@chakra-ui/icons"; // 수정 아이콘을 가져오기
import useUser from "../../lib/useUser";
import ModalButtonForUpdateChallengeResultMetaInfo from "../modal/ModalButtonForUpdateChallengeResultMetaInfo";
import ModalButtonForCommentList from "../modal/ModalButtonForCommentList";

interface IProps {
  challengeId: number | string;
  evaluationResults: {
    [username: string]: {
      [criteria: string]: string;
    };
  };
  challenge_results: ChallengeResultRow[];
  challenge_comments: ChallengeCommentRow[];
}

const TableForEvalutationResultListForChallenge: React.FC<IProps> = ({
  challengeId,
  evaluationResults,
  challenge_results,
  challenge_comments,
}: IProps) => {
  const { userLoading, user: loginUser, isLoggedIn } = useUser();

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

  console.log("criteriaSet : ", criteriaSet);
  console.log("challenge_results : ", challenge_results);

  return (
    <Box width="100%">
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Evalutation Crieteria</Th>
            <Th>Passed</Th>
            <Th>Reference</Th>
            <Th>Comment</Th>
          </Tr>
        </Thead>
        <Tbody>
          {usernames.map((username) => (
            <Tr key={username}>
              <Td>{username}</Td>
              <Td key={username}>
                {[...criteriaSet].map((criteria) => (
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    gap={2}
                    m={2}
                  >
                    <Text>{criteria}</Text>
                    <ToggleButtonForUpdateResultForEvaluationForChallenge
                      challengeId={challengeId}
                      userName={username}
                      criteria={criteria}
                      option={evaluationResults[username][criteria]}
                    />
                  </Box>
                ))}
              </Td>

              {challenge_results
                ? challenge_results.map((row) => {
                    if (row.challenger.username) {
                      // return <Box>{row.pass_status ? "passed" : "fail"}</Box>;
                      return (
                        <>
                          <Td>
                            {challenge_results
                              ? challenge_results.map((row) => {
                                  if (row.challenger.username === username) {
                                    // return <Box>{row.pass_status ? "passed" : "fail"}</Box>;
                                    return (
                                      <Box>
                                        <ToggleButtonForUpdatePassedForChallengeResult
                                          challengeResultId={row.id}
                                          passed={row.pass_status}
                                        />
                                      </Box>
                                    );
                                  }
                                })
                              : "no result"}
                          </Td>
                          <Td>
                            <Box display={"flex"} gap={2}>
                              <LinkButtonsForReferenceForChallengeResult
                                github_url1={row.github_url1}
                                github_url2={row.github_url2}
                                note_url={row.note_url}
                              />
                              {row.challenger.username ===
                              loginUser.username ? (
                                <ModalButtonForUpdateChallengeResultMetaInfo
                                  challengeResultId={row.id}
                                  github_url1={row.github_url1}
                                  github_url2={row.github_url2}
                                  note_url={row.note_url}
                                />
                              ) : (
                                ""
                              )}
                            </Box>
                          </Td>
                          <Td>
                            <ModalButtonForCommentList
                              challengeId={challengeId}
                              participant_username = {row.challenger.username}
                              commentListForChallenge={challenge_comments}
                            />
                          </Td>
                        </>
                      );
                    }
                  })
                : "no result"}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TableForEvalutationResultListForChallenge;
