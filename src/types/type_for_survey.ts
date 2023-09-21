interface IUser {
  pk: number;
  username: string;
  profile_image: string;
}

interface ISurveyOption {
  id: number;
  content: string;
  survey: number;
}

interface ISurvey {
  id: number;
  title: string;
  description: string;
  writer: IUser;
  survey_options: ISurveyOption[];
  created_at: string;
}

interface ISurveyList extends Array<ISurvey> {}

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
