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

export interface ITypeForChallengeRow {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  main_image: string;
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
}
