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
      // console.log("response : ", response);
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
  // console.log("commentPk : ", commentPk);
  return instance
    .delete(`study-note/comment/${commentPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// ForStudyNoteBriefingBoard
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
  const [_, pageNum, selectedNoteWriter] = queryKey;

  const params = new URLSearchParams();
  params.append("page", pageNum as string);
  params.append("selectedNoteWriter", selectedNoteWriter as string); // Add selectedNoteWriter to params

  return await instance.get(`study-note/?${params}`).then((response) => {
    console.log("response.data : ", response.data);
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
      console.log("response.data : ", response.data);
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
  // console.log("study_note_pk : ", study_note_pk);

  return await instance
    .get(`study-note/${study_note_pk}`, {
      params: {
        currentPage,
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
  second_category
}: type_for_insert_study_note) =>
  instance
    .post(
      `/study-note/`,
      {
        title,
        description,
        first_category,
        second_category
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
