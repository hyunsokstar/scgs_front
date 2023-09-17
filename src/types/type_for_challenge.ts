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
}