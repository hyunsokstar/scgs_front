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
// apiForRegisterForChallenge
export const apiForCreateFaqForBoard = ({ title, content }: any) =>
  instance
    .post(
      `/board/faq-bard/create`,
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

export const apiForDeleteForCommentForFaqForBoard = (commentPk: string | number) => {
  console.log("commentPk : ", commentPk);
  return instance
      .delete(`/board/faq-board/comment/${commentPk}/delete`, {
        headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// apiForUpdateCommentForFaqForBoard
export const apiForUpdateCommentForFaqForBoard = ({
  commentId,
  editedContent,
}: any) => {
  return instance
    .put(
      `/board/faq-board/comment/${commentId}/update`,
      { editedContent },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      return response.data;
    });
};

// apiForCreateCommentForFaqForBoard 구현중
export const apiForCreateCommentForFaqForBoard = ({
  faqId,
  content,
}: any) => {
  // alert(content);

  return instance
    .post(
      `/board/faq-board/${faqId}/comment/create`,
      { content },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

// apiForGetCommentListForFaqForBoard 구현중
export const apiForGetCommentListForFaqForBoard = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, faqId] = queryKey;

  console.log("faqId : ", faqId);

  return instance
    .get(`board/faq-board/${faqId}/comment`, {
      params: {},
    })
    .then((response) => {
      return response.data;
    });
};

// apiForDeleteFaqForBoard
export const apiForDeleteFaqForBoard = (faqId: string | number) => {
  // console.log("faqId : ", faqId);
  return instance
    .delete(`board/faq-board/${faqId}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// apiForUpdateFaqForBoard
export const apiForUpdateFaqForBoard = ({ id, title, content }: any) => {
  return instance
    .put(
      `/board/faq-board/${id}/update`,
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

// apiForGetFaqListForBoard
export const apiForGetFaqListForBoard = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;

  return instance
    .get(`/board/faq-board`, {
      params: { pageNum: pageNum },
    })
    .then((response) => {
      // response_data = {
      //     "listForSuggestion": serializer.data,
      //     "totalCountForSuggestionList": self.totalCountForSuggestionList,
      //     "perPage": self.perPage,
      // }

      return response.data;
    });
};

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

// apiForGetChallengeList
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

      return response.data;
    });
};

// apiForCreateFaqForBoard
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
