export interface IEvaluationCriteria {
  id: number;
  item_description: string;
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
