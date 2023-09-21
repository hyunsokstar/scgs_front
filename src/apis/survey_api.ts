import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {
  IFormTypeForCreateSubjectTitleForPage,
  ListPropsForContentOrdering,
  parameterForSearchContentListForStudynote,
  StudyNoteContentFormData,
  type_for_insert_study_note,
  type_for_parameter_for_delete_pages_for_study_note,
  typeForParameterForApiForCopySelectedNotesToMyNote,
  IFormTypeForCreateYoutubeContentForNote,
  FormTypeForCreateCommentForNote,
} from "../types/study_note_type";
import {
  parameteryForCreateSurveyOption,
  parameteryForCreateSurveyAnswer,
} from "../types/type_for_survey";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/survey`,
  withCredentials: true,
});

// 1122
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
