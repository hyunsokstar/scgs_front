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
export const apiForCreateCommentForSuggestionForBoard = ({
  suggestionId,
  content,
}: any) => {
  return instance
    .post(
      `/board/suggestion/${suggestionId}/comment/create`,
      { content },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForDeleteCommentForSuggestionForBoard = (
  commentPk: string | number
) => {
  console.log("commentPk : ", commentPk);
  return instance
    .delete(`/board/suggestion/comment/${commentPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForUpdateCommentForSuggestionForBoard = ({
  id,
  editedContent,
}: any) => {
  return instance
    .put(
      `/board/suggestion/comment/${id}/update`,
      { editedContent },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      // console.log("response : ", response);
      return response.data;
    });
};

// apiForGetCommentListForSuggestionForBoard 구현중
export const apiForGetCommentListForSuggestionForBoard = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, suggestionId] = queryKey;

  console.log("suggestionId : ", suggestionId);

  return instance
    .get(`/board/suggestion/${suggestionId}/comment`, {
      params: {},
    })
    .then((response) => {
      return response.data;
    });
};

// apiForDeleteSuggestionForBoard
export const apiForDeleteSuggestionForBoard = (
  suggestionPk: string | number
) => {
  // console.log("commentPk : ", commentPk);
  // alert("삭제")
  // alert(suggestionPk)
  return (
    instance
      // .delete(`/study-note/faq-board/comment/${commentPk}/delete`, {
      .delete(`/board/suggestion/${suggestionPk}/delete`, {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      })
      .then((response) => response.data)
  );
};

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
export const apiForCreateSuggestionForBoard = ({ title, content }: any) =>
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
