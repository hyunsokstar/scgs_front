interface IUser {
  pk: number;
  username: string;
  profile_image: string;
}

export interface ISurveyOption {
  id: number;
  content: string;
  survey: number;
}

export interface ISurveyRow {
  id: number;
  title: string;
  description: string;
  writer: IUser;
  survey_options: ISurveyOption[];
  created_at: string;
}

export interface ITypeForDataForSurveyList {
  listForSurvey: ISurveyRow[];
  totalCountForSurveyList: number;
  perPage: number;
}

export interface ISurveyOptionCount {
  option_content: string;
  count: number;
}

export interface ISurveyDetail {
  id: number;
  title: string;
  description: string;
  writer: {
    pk: number;
    username: string;
    profile_image: string;
  } | null;
  created_at: string;
  survey_options: ISurveyOption[];
  count_for_options: ISurveyOptionCount[];
}

export interface parameteryForCreateSurveyOption {
  surveyId: any;
  newOption: string;
}

export interface parameteryForCreateSurveyAnswer {
  surveyId: any;
  surveyOptionId: any;
}

export interface IParameterTypeForCreateSurvey {
  title: string;
  description: string;
}
