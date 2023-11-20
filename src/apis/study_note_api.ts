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
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// 1122
// apiForMyLikeNoteList
export const apiForMyLikeNoteList = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [_] = queryKey;

  return await instance
    .get(`study-note/my-like-note-list`, {
      params: {},
    })
    .then((response) => response.data);
};


// apiForLikeEventForStudyNote
export const apiForLikeEventForStudyNote = ({
  noteId,
}: any) => {

  return instance
    .post(
      `/study-note/${noteId}/like`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

// apiForMyLikeNoteList
export const apiForGetBookMarkList = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [_] = queryKey;

  return await instance
    .get(`study-note/mybookmark`, {
      params: {
        // currentPage,
      },
    })
    .then((response) => response.data);
};

export const apiForBookMarkEventForStudyNote = ({
  noteId,
}: any) => {

  return instance
    .post(
      `/study-note/${noteId}/bookmark`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};


// apiForReorderingForRoadMapContentListByDnd
//  roadMapId, updatedRoadMapOrderList
export const apiForReorderingForRoadMapContentListByDnd = ({
  roadMapId,
  updatedRoadMapOrderList,
}: any) => {
  console.log("hi");

  return instance
    .put(
      `study-note/roadmap/content/order/update`,
      {
        roadMapId,
        updatedRoadMapOrderList
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

// ForDeleteRoadMapContentForCheckedIds
export const apiForDeleteRoadMapContentForCheckedIds = (
  roadMapId: number,
  checkedIdsForRoadMapContent: number[]
) => {
  return instance
    .delete(`/study-note/roadmap/content/delete-for-checked-ids`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
      data: { roadMapId, checkedIdsForRoadMapContent }, // 데이터를 요청에 첨부
    })
    .then((response) => response.data);
};

// apiForRegisterRoadMapFromCheckedNoteIds
export const apiForRegisterRoadMapFromCheckedNoteIds = ({
  roadMapId,
  checkedIdsForNoteList,
}: any) =>
  instance
    .post(
      `/study-note/roadmap/register-from-checked-note-ids`,
      {
        roadMapId,
        checkedIdsForNoteList,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForGetRoadMapContentListForRoadMapIdForRegister = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, roadMapId] = queryKey;
  // const params = new URLSearchParams();

  return await instance
    .get(`study-note/roadmap/${roadMapId}/content/for-register`)
    .then((response) => {
      return response.data;
    });
};

export const apiForRoadMapContentList = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, roadMapId] = queryKey;

  return await instance
    .get(`study-note/roadmap/${roadMapId}/content`)
    .then((response) => {
      return response.data;
    });
};

export const apiForgetCandidateStudyNoteListForRegisterRoadMap = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, roadMapId, pageNum] = queryKey;
  const params = new URLSearchParams();
  params.append("page", pageNum as string);
  params.append("roadMapId", roadMapId as string);
  // params.append("first_category", first_category as string);

  return await instance
    .get(`study-note/for-register-roadmap?${params}`)
    .then((response) => {
      return response.data;
    });
};

// apiForDeleteRoadMap
export const apiForDeleteRoadMap = (roadMapId: string | number) => {
  return instance
    .delete(`/study-note/roadmap/${roadMapId}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// apiForRegisterRoadMapFromCheckedNoteIds
export const apiForCreateRoadMap = ({ title, subTitle }: any) =>
  instance
    .post(
      `/study-note/roadmap/create`,
      {
        title,
        subTitle,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForRoadMapList = ({ queryKey }: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;

  return instance
    .get(`/study-note/roadmap`, {
      params: { pageNum: pageNum },
    })
    .then((response) => {
      return response.data;
    });
};

export const apiForCopyOneOfNoteToMe = ({ studyNotePk }: any) => {
  console.log("selectedRowPksFromOriginalTable at api : ", studyNotePk);

  return instance
    .post(
      `/study-note/copy-one-of-note-to-me`,
      {
        studyNotePk,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForUpdateCoWriterIsTaskingForNote = ({
  studyNotePk,
  coWriterId,
}: any) => {
  return instance
    .put(
      `/study-note/${coWriterId}/update-is-tasking-for-cowriter`,
      { studyNotePk, coWriterId },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      console.log("response : ", response);
      return response.data;
    });
};

// apiForUpdateSuggestionForBoard
export const apiForUpdateSuggestion = ({ pk, title, content }: any) => {
  // alert(pk)
  return instance
    .put(
      `/study-note/suggestion/${pk}/update`,
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

// apiForDeleteSuggestionForNote
export const apiForDeleteSuggestionForNote = (
  suggestionPk: string | number
) => {
  // console.log("commentPk : ", commentPk);
  // alert("삭제")
  // alert(suggestionPk)
  return (
    instance
      // .delete(`/study-note/faq-board/comment/${commentPk}/delete`, {
      .delete(`/study-note/suggestion/${suggestionPk}/delete`, {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      })
      .then((response) => response.data)
  );
};

export const apiForDeleteCommentForSuggestion = (
  commentPk: string | number
) => {
  // console.log("commentPk : ", commentPk);
  // alert("삭제")
  // alert(commentPk)
  return (
    instance
      // .delete(`/study-note/faq-board/comment/${commentPk}/delete`, {
      .delete(`/study-note/suggestion/comment/${commentPk}/delete`, {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      })
      .then((response) => response.data)
  );
};

// apiForUpdateChallengeRef
export const apiForUpdateCommentForSuggestion = ({
  commentPk,
  editedContent,
}: any) => {
  return instance
    .put(
      `/study-note/suggestion/comment/${commentPk}/update`,
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

// apiForDeleteCommentForFaqForBoard
export const apiForDeleteCommentForFaqBoard = (commentPk: string | number) => {
  console.log("commentPk : ", commentPk);
  return instance
    .delete(`/study-note/faq-board/comment/${commentPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// apiForUpdateCommentForSuggestionForBoard
export const apiForUpdateCommentForFaq = ({
  commentPk,
  editedContent,
}: any) => {
  return instance
    .put(
      `/study-note/faq-board/comment/${commentPk}/update`,
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

export const apiForAddCommentForFaqBoardForNote = ({ faqPk, content }: any) => {
  return instance
    .post(
      `/study-note/faq-board/${faqPk}/comment/add`,
      { content },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

// apiForGetCommentListForFaqBoardForNote
export const apiForGetCommentListForFaqBoardForNote = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, faqPk] = queryKey;

  return instance
    .get(`/study-note/faq-board/${faqPk}/comment`, {
      params: {},
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

// apiForGetCommentListForSuggestionForNote 구현중
export const apiForGetCommentListForSuggestionForNote = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, suggestionPk] = queryKey;

  console.log("suggestionPk : ", suggestionPk);

  return instance
    .get(`/study-note/suggestion/${suggestionPk}/comment`, {
      params: {},
    })
    .then((response) => {
      return response.data;
    });
};

// apiForCreateCommentForSuggestion
export const apiForAddCommentForSuggestionForNote = ({
  suggestionPk,
  content,
}: any) => {
  // alert(content);

  return instance
    .post(
      `/study-note/suggestion/${suggestionPk}/comment/add`,
      { content },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

// apiForSearchSurveyListBySearchWords
export const apiForSearchSurgesttionListBySearchWords = ({
  study_note_pk,
  searchWords,
}: any) => {
  return instance
    .get(`study-note/${study_note_pk}/suggestion/search`, {
      params: {
        study_note_pk: study_note_pk,
        searchWords: searchWords,
      },
    })
    .then((response) => response.data);
};

// apiForCreateStudySuggestionForBoard
export const apiForCreateStudyNoteSuggestion = ({
  study_note_pk,
  title,
  content,
}: any) =>
  instance
    .post(
      `/study-note/${study_note_pk}/suggestion/add`,
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

export const apiForGetSuggestionListForNote = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, study_note_pk, pageNum] = queryKey;

  return instance
    .get(`/study-note/${study_note_pk}/suggestion`, {
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

export const apiForWithdrawClassRoomForNote = (
  study_note_pk: string | number
) => {
  return instance
    .delete(`study-note/${study_note_pk}/classroom/withdraw`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForDeleteClassRegistrationForNote = (
  classRoomId: string | number
) => {
  return instance
    .delete(`study-note/classroom/${classRoomId}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForDeleteCommentForErrorReort = (
  commentPk: string | number
) => {
  // console.log("faqPk : ", faqPk);
  return instance
    .delete(`study-note/error-report/comment/${commentPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// apiForAddCommentForSuggestionForNote 구현중
export const apiForAddCommentForErrorReportForNote = ({
  error_report_pk,
  content,
}: any) => {
  // alert(content);

  return instance
    .post(
      `/study-note/error-report/${error_report_pk}/comment/add`,
      { content },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForSearchStudyNoteListBySearchWords = ({
  searchWords,
}: any) => {
  return instance
    .get(`study-note/search`, {
      params: {
        // study_note_pk: study_note_pk,
        searchWords: searchWords,
      },
    })
    .then((response) => response.data);
};

export const apiForSearchErrorReportListBySearchWords = ({
  study_note_pk,
  searchWords,
}: any) => {
  return instance
    .get(`study-note/${study_note_pk}/error-report/search`, {
      params: {
        study_note_pk: study_note_pk,
        searchWords: searchWords,
      },
    })
    .then((response) => response.data);
};

export const apiForSearchQnaListBySearchWords = ({
  study_note_pk,
  searchWords,
}: any) => {
  return instance
    .get(`study-note/${study_note_pk}/qna/search`, {
      params: {
        study_note_pk: study_note_pk,
        searchWords: searchWords,
      },
    })
    .then((response) => response.data);
};

export const apiForDeleteNoteFaq = (faqPk: string | number) => {
  // console.log("faqPk : ", faqPk);
  return instance
    .delete(`study-note/faq/${faqPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// apiForUpdateFaqForBoard
export const apiForUpdateNoteFaq = ({ pk, title, content }: any) => {
  return instance
    .put(
      `/study-note/faq/${pk}/update`,
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

// api 함수 for search

// apiForSearchSurgesttionListBySearchWords
export const apiForSearchFaqListBySearchWords = ({
  study_note_pk,
  searchWords,
}: any) => {
  return instance
    .get(`study-note/${study_note_pk}/faq/search`, {
      params: {
        study_note_pk: study_note_pk,
        searchWords: searchWords,
      },
    })
    .then((response) => response.data);
};

// apiForCreateStudyNoteFaq
export const apiForCreateStudyNoteFaq = ({
  study_note_pk,
  title,
  content,
}: any) =>
  instance
    .post(
      `/study-note/${study_note_pk}/FAQBoard/add`,
      {
        study_note_pk,
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

export const apiForUpdateStudyNoteSubtitle = ({
  pk,
  title,
  content,
  ref_url1,
  ref_url2,
  youtube_url,
}: any) => {
  return instance
    .put(
      `/study-note/content/${pk}/update-subtitle`,
      {
        title,
        content,
        ref_url1,
        ref_url2,
        youtube_url,
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

export const apiForDeleteErrorReportByPk = (
  error_report_pk: string | number
) => {
  console.log("error_report_pk : ", error_report_pk);
  return (
    instance
      // .delete(`project_progress/comment/${commentPk}`, {
      .delete(`study-note/error-report/${error_report_pk}/delete`, {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      })
      .then((response) => response.data)
  );
};

export const apiForUpdateErrorReportForNote = ({ errorPk, content }: any) => {
  console.log("apiForUpdateErrorReportForNote 실행 check : ", content);

  return instance
    .put(
      `/study-note/error-report/${errorPk}/update`,
      {
        content,
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

export const apiForCreateErrorReportForNote = ({
  study_note_pk,
  page,
  content,
}: any) =>
  instance
    .post(
      `/study-note/${study_note_pk}/create-error-report`,
      {
        study_note_pk,
        page,
        content,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForGetErrorReportListForStudyNote = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, study_note_pk, pageNum] = queryKey;
  return instance
    .get(`/study-note/${study_note_pk}/error-report-list`, {
      params: { pageNum },
    })
    .then((response) => {
      // console.log("response for error report list : ",response);

      const response_data = {
        errorReportList: response.data.errorReportList,
        perPage: response.data.perPage,
        totalErrorReportCount: response.data.totalErrorReportCount,
      };

      // console.log("response_data : ", response_data);

      // return response.data;
      return response_data;
    });
};

export const apiForGetErrorReportListForPageForStudyNote = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, study_note_pk, currentPage] = queryKey;
  console.log("currentPage : ", currentPage);

  return instance
    .get(`/study-note/${study_note_pk}/error-report/${currentPage}`, {})
    .then((response) => {
      // const response_data = {
      //   errorReportList: response.data.errorReportList,
      //   perPage: response.data.perPage,
      //   totalErrorReportCount: response.data.totalErrorReportCount,
      // };

      return response.data;
      // return response_data;
    });
};

export const apiForDeleteCommentForQuestionForNote = (comment_pk: number) => {
  console.log("comment_pk : ", comment_pk);

  return instance
    .delete(`study-note/answer-for-qaboard/${comment_pk}/delete-comment`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

interface IPropsForapiForUpdateCommentForQuestionForNote {
  commentPk: number;
  content: string;
}

export const apiForUpdateCommentForQuestionForNote = ({
  commentPk,
  content,
}: IPropsForapiForUpdateCommentForQuestionForNote) => {
  console.log("updateCommentForTaskApi 실행 check : ", content);

  return instance
    .put(
      `/study-note/answer-for-qaboard/${commentPk}/update-comment`,
      {
        content,
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

export const apiForAddCommentForQuestionForNote = ({
  question_pk,
  content,
}: any) => {
  // alert(content);

  return instance
    .post(
      `/study-note/qa-board/${question_pk}/add-comment`,
      { content },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForDeleteQuestionForNote = (commentPk: string | number) => {
  // console.log("commentPk : ", commentPk);
  return instance
    .delete(`study-note/qa-board/${commentPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForUpdateQuestionForNote = ({
  question_pk,
  title,
  content,
  page,
}: any) => {
  // alert("실행 check");
  console.log("question_pk : ", question_pk);
  console.log("content : ", content);
  console.log("page : ", page);

  return instance
    .put(
      `/study-note/qa-board/${question_pk}/update`,
      {
        title,
        content,
        page,
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

// apiForCreateQuestionForNote
export const apiForCreateQuestionForNote = ({
  study_note_pk,
  title,
  content,
  page,
}: any) =>
  instance
    .post(
      `/study-note/${study_note_pk}/create-question`,
      {
        study_note_pk,
        title,
        content,
        page,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForGetQnABoardList = ({ queryKey }: QueryFunctionContext) => {
  const [_, study_note_pk, pageNum] = queryKey;
  // console.log("pageNum : ", pageNum);

  return instance
    .get(`/study-note/${study_note_pk}/qa-list`, {
      params: { pageNum },
    })
    .then((response) => {
      // console.log("response for qa : ", response);
      return response.data;
    });
};

export const apiForGetFAQBoardList = ({ queryKey }: QueryFunctionContext) => {
  const [_, study_note_pk, pageNum] = queryKey;
  return instance
    .get(`/study-note/${study_note_pk}/FAQBoard`, {
      params: { pageNum: pageNum },
    })
    .then((response) => {
      const response_data = {
        faqList: response.data.faqList,
        perPage: response.data.perPage,
        totalFaqCount: response.data.totalFaqCount,
      };

      // console.log("response_data : ", response_data);
      return response_data;
    });
};

export const apiForLoadSavedPageForThisNote = ({ study_note_pk }: any) => {
  console.log("study_note_pk : ", study_note_pk);
  return instance
    .get(`/study-note/class-room/load-saved-page/${study_note_pk}`, {
      params: {},
    })
    .then((response) => {
      return response.data;
    });
};

export const apiForRegisterClassRoomForStudyNote = ({
  study_note_pk,
  current_page = 1,
  registration_option,
}: any) =>
  instance
    .post(
      `/study-note/${study_note_pk}/class-room`,
      {
        note: study_note_pk,
        current_page,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

// "is_registered": is_registered,
// "class_room_list": serializer.data
export const apiForGetClassRoomList = ({ queryKey }: QueryFunctionContext) => {
  const [_, study_note_pk] = queryKey;
  // console.log("pageNum : ", pageNum);
  return instance
    .get(`/study-note/${study_note_pk}/class-room`, {
      params: {},
    })
    .then((response) => {
      return response.data;
    });
};

export const apiForUpdateStudyNote = ({
  study_note_pk,
  title,
  description,
  first_category,
  second_category,
}: any) => {
  console.log("apiForUpdateStudyNote excute check !");

  return instance
    .put(
      `/study-note/`,
      {
        study_note_pk,
        title,
        description,
        first_category,
        second_category,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForUpdateCommentForNote = ({ commentPk, commentText }: any) => {
  console.log("apiForUpdateCommentForNote 실행 check : ", commentText);

  return instance
    .put(
      `/study-note/comment/${commentPk}/update-comment`,
      {
        comment: commentText,
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

export const apiForCreateCommentForNote = ({
  study_note_pk,
  comment,
}: FormTypeForCreateCommentForNote) =>
  instance
    .post(
      `/study-note/${study_note_pk}/create-comment`,
      {
        note: study_note_pk,
        comment,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const deleteOneCommentForNoteByPkApi = (commentPk: string | number) => {
  return instance
    .delete(`study-note/comment/${commentPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForEditModeForStudyNoteBriefingBoard = (commentPk: any) => {
  console.log(
    "apiForEditModeForStudyNoteBriefingBoard 실행 check : ",
    commentPk
  );

  return instance
    .put(
      `/study-note/comment/${commentPk}/update-edit-mode`,
      {},
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

export const apiForGetCommentListForNote = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, study_note_pk] = queryKey;
  // console.log("pageNum : ", pageNum);
  return instance
    .get(`/study-note/${study_note_pk}/comment/get-comment-list`, {
      params: {},
    })
    .then((response) => {
      return response.data;
    });
};

export const apiForGetSubTitleListForNote = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, study_note_pk] = queryKey;
  // console.log("pageNum : ", pageNum);
  return instance
    .get(`/study-note/${study_note_pk}/content/get-subtitle-list`, {
      params: {},
    })
    .then((response) => {
      return response.data;
    });
};

export const apiForCreateNoteContentForYoutube = ({
  study_note_pk,
  current_page_number,
  content_option,
  title,
  youtube_url,
}: IFormTypeForCreateYoutubeContentForNote) =>
  instance
    .post(
      `/study-note/${study_note_pk}/content/create-youtube-content-for-note`,
      {
        study_note_pk,
        current_page_number,
        content_option,
        title,
        youtube_url,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForCreateSubTitleForNote = ({
  study_note_pk,
  current_page_number,
  content_option,
  title,
  ref_url1,
  ref_url2,
  content,
  youtube_url,
}: IFormTypeForCreateSubjectTitleForPage) =>
  instance
    .post(
      `/study-note/${study_note_pk}/content/create-sub-title-for-page`,
      {
        study_note_pk,
        current_page_number,
        content_option,
        title,
        ref_url1,
        ref_url2,
        content,
        youtube_url,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForCancleCoWriterForOtherUserNote = (pk: number) => {
  return instance
    .delete(`study-note/CoWriter/${pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForRegisterForCoWriterForOtherUserNote = ({ notePk }: any) => {
  return instance
    .post(
      `/study-note/${notePk}/register-for-co-writer`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForUpdateForUpdateIsApprovedForNoteCoWriter = (
  cowriterPk: any
) => {
  console.log("cowriterPk :::::::::::::::::::::::", cowriterPk);

  return instance
    .put(
      "/study-note/update-is-approved-for-cowriter",
      { cowriterPk },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      console.log("response : ", response);
      return response.data;
    });
};

// apiForCopyOneOfNoteToMe
export const apiForCopySelectedNotesToMyNote = ({
  selectedRowPksFromOriginalTable,
}: typeForParameterForApiForCopySelectedNotesToMyNote) => {
  console.log(
    "selectedRowPksFromOriginalTable at api : ",
    selectedRowPksFromOriginalTable
  );

  // return Promise.resolve(); // Placeholder return statement
  return instance
    .post(
      `/study-note/copy-selected-notes-to-my-note`,
      {
        selectedRowPksFromOriginalTable,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForGetTechNoteListForSelectedRowPks = async ({
  queryKey,
}: QueryFunctionContext<any>): Promise<any> => {
  const [_, selectedRowPksFromOriginalTable] = queryKey;
  const params = new URLSearchParams();

  // todo 1: selectedRowPks를 StudyNoteAPIViewForCheckedRows로 보내기
  params.append(
    "selectedRowPksFromOriginalTable",
    selectedRowPksFromOriginalTable.join(",")
  );

  return await instance
    .get(`study-note/get-study-note-for-checked-rows/`, { params })
    .then((response) => {
      console.log("response.data check check : ", response.data);
      return response.data;
    });
};

export const apiForGetStudyNoteListForMe = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, pageNumForMe] = queryKey;

  const params = new URLSearchParams();
  params.append("page", pageNumForMe as string);

  return await instance.get(`study-note/for-me/?${params}`).then((response) => {
    console.log("response.data : ", response.data);
    return response.data;
  });
};

export const apiForGetStudyNoteList = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, pageNum, selectedNoteWriter, first_category, second_category] =
    queryKey;
  const params = new URLSearchParams();
  params.append("page", pageNum as string);
  params.append("first_category", first_category as string);
  params.append("second_category", second_category as string);
  params.append("selectedNoteWriter", selectedNoteWriter as string); // Add selectedNoteWriter to

  return await instance.get(`study-note/?${params}`).then((response) => {
    return response.data;
  });
};

export const apiForGetStudyNoteListForCopyMode = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, pageNum, selectedNoteWriter] = queryKey;

  const params = new URLSearchParams();
  params.append("page", pageNum as string);
  params.append("selectedNoteWriter", selectedNoteWriter as string); // Add selectedNoteWriter to params

  return await instance
    .get(`study-note/get-study-note-list-for-copy-mode?${params}`)
    .then((response) => {
      return response.data;
    });
};

export const apiForUpdateNoteContentsPageForSelected = ({
  direction,
  study_note_pk,
  pageNumbersToEdit,
  pageNumbersToMove,
}: any) => {
  console.log(direction, study_note_pk, pageNumbersToEdit, pageNumbersToMove);

  return instance
    .put(
      `study-note/${study_note_pk}/contents/UpdateNoteContentsPageForSelected`,
      { direction, study_note_pk, pageNumbersToEdit, pageNumbersToMove },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForUpdateStudyNoteContent = ({
  pk,
  title,
  file_name,
  content,
}: any) => {
  return instance
    .put(
      `/study-note/contents/${pk}`,
      {
        title: title,
        file_name: file_name,
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

export const ForSearchContentListForStudyNote = ({
  study_note_pk,
  searchTerm,
}: parameterForSearchContentListForStudynote) => {
  return instance
    .get("study-note/content/search", {
      params: {
        study_note_pk: study_note_pk,
        searchTerm: searchTerm,
      },
    })
    .then((response) => response.data);
};

export const apiForReOrderForStudyNoteContentsForSpecificNoteAndPage = ({
  study_note_pk,
  currentPage,
  items,
}: ListPropsForContentOrdering) => {
  console.log("hi");

  return instance
    .put(
      `study-note/${study_note_pk}/contents/update/re-order-for-contents`,
      {
        currentPage,
        reordered_contents_list: items,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForOrderPlusOneForNoteContent = (order_pk: number) => {
  console.log("order_pk : ", order_pk);
  return instance
    .put(
      `study-note/contents/${order_pk}/order-plus-one-for-note-content`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForOrderMinusOneForNoteContent = (order_pk: number) => {
  console.log("order_pk : ", order_pk);
  return instance
    .put(
      `study-note/contents/${order_pk}/order-minus-one-for-note-content`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiFordeleteOneStudyNoteContent = (pk: number) => {
  console.log("pk : ", pk);
  return instance
    .delete(`study-note/contents/${pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForCreateStudyNoteContents = ({
  study_note_pk,
  current_page_number,
  title,
  file,
  content,
  content_option,
}: StudyNoteContentFormData) =>
  instance
    .post(
      `/study-note/${study_note_pk}/contents`,
      {
        study_note_pk,
        current_page_number,
        title,
        file,
        content,
        content_option,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForPlusOnePageForSelectedPagesForStudyNoteContents = ({
  study_note_pk,
  pageNumbersToEdit,
}: type_for_parameter_for_delete_pages_for_study_note) => {
  console.log(
    "study_note_pk , selectedButtonsData : ",
    study_note_pk,
    pageNumbersToEdit
  );

  return instance
    .put(
      `study-note/${study_note_pk}/contents/plus-one-page-for-selected-page`,
      { pageNumbersToEdit },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForMinusOnePageForSelectedPagesForStudyNoteContents = ({
  study_note_pk,
  pageNumbersToEdit,
}: type_for_parameter_for_delete_pages_for_study_note) => {
  console.log(
    "study_note_pk , pageNumbersToEdit : ",
    study_note_pk,
    pageNumbersToEdit
  );

  return instance
    .put(
      `study-note/${study_note_pk}/contents/minus-one-page-for-selected-page`,
      { pageNumbersToEdit },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForGetStuyNoteContentList = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, study_note_pk, currentPage] = queryKey;

  return await instance
    .get(`study-note/${study_note_pk}/${currentPage}`, {
      params: {
        // currentPage,
      },
    })
    .then((response) => response.data);
};

export const apiFordeleteStudyNoteContentsForSelectedPages = ({
  study_note_pk,
  pageNumbersToEdit,
}: type_for_parameter_for_delete_pages_for_study_note) => {
  console.log(
    "study_note_pk , pageNumbersToEdit : ",
    study_note_pk,
    pageNumbersToEdit
  );

  return instance
    .delete(`study-note/${study_note_pk}/contents/delete-page`, {
      data: pageNumbersToEdit, // 요청 본문에 selectedButtonsData 추가
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiFordeleteStudyNoteContentsForChecked = (
  pageNumbersToEdit: number[]
) => {
  console.log("study_note_pk , pageNumbersToEdit : ", pageNumbersToEdit);

  return instance
    .delete("study-note/contents/delete-for-checked", {
      data: pageNumbersToEdit, // [1,2,3,5]
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiFordeleteOneStudyNote = (pk: number) => {
  console.log("pk : ", pk);
  return instance
    .delete(`study-note/${pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForCreateStudyNote = ({
  title,
  description,
  first_category,
  second_category,
}: type_for_insert_study_note) =>
  instance
    .post(
      `/study-note/`,
      {
        title,
        description,
        first_category,
        second_category,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
