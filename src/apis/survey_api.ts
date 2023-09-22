import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";

import {
  parameteryForCreateSurveyOption,
  parameteryForCreateSurveyAnswer,
  IParameterTypeForCreateSurvey,
} from "../types/type_for_survey";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/survey`,
  withCredentials: true,
});

// 1122
// apiForSearchSurveyListBySearchWords
export const apiForSearchSurveyListBySearchWords = ({
  searchWords,
}: any) => {
  return instance
    .get(`search`, {
      params: {
        searchWords: searchWords,
      },
    })
    .then((response) => response.data);
};

// apiForDeleteSurvey
export const apiForDeleteSurvey = (surveyId: string | number) => {
  console.log("surveyId : ", surveyId);
  return instance
    // .delete(`project_progress/comment/${surveyId}`, {
      .delete(`${surveyId}/delete`, {
        headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// apiForCreateSurvey
export const apiForCreateSurvey = ({
  title,
  description,
}: IParameterTypeForCreateSurvey) =>
  instance
    .post(
      `/create`,
      { title, description },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForCreateSurveyAnswer = ({
  surveyId,
  surveyOptionId,
}: parameteryForCreateSurveyAnswer) =>
  instance
    .post(
      `survey-answer/create`,
      {
        surveyId,
        surveyOptionId,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

// apiForCreateSurveyOptionForSurvey
export const apiForCreateSurveyOptionForSurvey = ({
  surveyId,
  newOption,
}: parameteryForCreateSurveyOption) =>
  instance
    .post(
      `/${surveyId}/survey-option/create`,
      {
        newOption,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

// apiForGetDetailForSurvey
export const apiForGetDetailForSurvey = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, selectedSurveyId] = queryKey;

  return instance.get(`${selectedSurveyId}`, {}).then((response) => {
    // response_data = {
    //   listForChallenge: serializer.data,
    //   totalCountForChallengeList: self.totalCountForChallengeList,
    //   perPage: self.perPage,
    // };

    return response.data;
  });
};

export const apiForGetSurveyList = ({ queryKey }: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;

  return instance
    .get(``, {
      params: { pageNum: pageNum },
    })
    .then((response) => {
      // response_data = {
      //   suggestionList: serializer.data,
      //   totalSuggestionCount: self.totalSuggestionCount,
      //   perPage: self.perPage,
      // };

      return response.data;
    });
};
