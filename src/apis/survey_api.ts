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

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/survey`,
  withCredentials: true,
});

// 1122
export const apiForGetSurveyList = ({
    queryKey,
  }: QueryFunctionContext) => {
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