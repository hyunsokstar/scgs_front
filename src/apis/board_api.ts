import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {} from "../types/study_note_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});


// 1122
// apiForDeleteSuggestionForBoard
export const apiForDeleteSuggestionForBoard = (suggestionPk: string | number) => {
  // console.log("commentPk : ", commentPk);
  // alert("삭제")
  // alert(suggestionPk)
  return instance
      // .delete(`/study-note/faq-board/comment/${commentPk}/delete`, {
      .delete(`/board/suggestion/${suggestionPk}/delete`, {
        headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
}


// apiForUpdateSuggestionForBoard
export const apiForUpdateSuggestionForBoard = ({ pk, title, content }: any) => {
  // alert(pk)
  return instance
    .put(
      `/board/suggestion/${pk}/update`,
      {
        title: title,
        content: content,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): any => {
      return response.data;
    });
};



export const apiForGetSuggestionListForBoard = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;

  return instance
    .get(`/board/suggestion`, {
      params: { pageNum: pageNum },
    })
    .then((response) => {

        // response_data = {
        //     "listForSuggestion": serializer.data,
        //     "totalCountForSuggestionList": self.totalCountForSuggestionList,
        //     "perPage": self.perPage,
        // }

      console.log("response : ", response);

      return response.data;
    });
};

// apiForCreateSuggestionForBoard
export const apiForCreateSuggestionForBoard = ({
  title,
  content,
}: any) =>
  instance
    .post(
      `/board/suggestion/add`,
      {
        title,
        content,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);