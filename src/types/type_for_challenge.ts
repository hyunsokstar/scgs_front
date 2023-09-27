export interface IChallengeRefRow {
  id: number;
  url: string;
  description: string;
}

export interface ITypeForChallengeRefData {
  challengeRefList: IChallengeRefRow[]
}

// api type
export interface IParameterTyperForApiForUpdateForEvaluateResultForChallenge {
  challengeId: number | string;
  userName: string;
  criteria: string;
}

// 그외
export interface IWriter {
  pk: number;
  username: string;
  profile_image: string | null;
}

export interface IEvaluationCriteria {
  id: number;
  item_description: string;
  selected?: boolean;
}

export interface ChallengeResultRow {
  id: number;
  challenger: IWriter;
  challenge: number;
  pass_status: boolean;
  comment: string;
  created_at: string; // ISO 8601 형식의 날짜 문자열
  created_at_formatted: string;
  github_url1: string;
  github_url2: string;
  note_url: string;
}

export interface ITypeForChallengeRow {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  main_image: string;
  challenge_results: ChallengeResultRow[];
  writer: {
    pk: number;
    username: string;
    profile_image: string | null;
  };
  created_at: string;
  created_at_formatted: string;
  evaluation_criterials: IEvaluationCriteria[];
  started_at: string;
  deadline: string;
  count_for_challenge_results: number
}

export interface ITypeForChallengeData {
  listForChallenge: ITypeForChallengeRow[];
  totalCountForChallengeList: number;
  perPage: number;
}

export interface ITypeForCreateChallengeParameter {
  title: string;
  subtitle: string;
  description: string;
  main_image: string;
}

export interface ITypeForEvaluationCriteriaRow {
  id: number | string;
  item_description: string;
  selected?: boolean;
}

interface EvaluationResults {
  [username: string]: {
    [criteria: string]: "pass" | "fail" | "undecided";
  };
}

export interface ChallengeCommentRow {
  id: number;
  challenge: number;
  writer: IWriter;
  writer_classfication: string;
  comment: string;
}

export interface ITypeForChallengeDetail {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  main_image: string;
  writer: IWriter; // writer 타입 추가
  created_at: string;
  created_at_formatted: string;
  evaluation_criterials: IEvaluationCriteria[];
  evaluation_results: EvaluationResults;
  is_exist_for_evaluation_result: boolean;
  challenge_results: ChallengeResultRow[];
  challenge_comments: ChallengeCommentRow[];
  github_url1: string;
  github_url2: string;
  note_url: string;
}

export interface IParameterTypeForUpdateChallenge {
  challengeId: string | number;
  title: string;
  subtitle: string;
  description: string;
}

export interface IParameterTypeForUpdateChallengeMetaInfo {
  challengeResultId: string | number;
  github_url1: string;
  github_url2: string;
  note_url: string;
}

export interface IPrameterForApiForCreateChallengeComment {
  challengeId: string | number;
  participant_username: string;
  commentText: string;
}

export interface IPrameterForUpdateChallengeRef {
  challengeRefId: string | number;
  urlText: string;
  descriptionText: string;
}