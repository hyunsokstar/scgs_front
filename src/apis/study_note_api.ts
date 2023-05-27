import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {
  ListPropsForContentOrdering,
  parameterForSearchContentListForStudynote,
  StudyNoteContentFormData,
  type_for_insert_study_note,
  type_for_parameter_for_delete_pages_for_study_note,
  type_for_study_note_list_row,
} from "../types/study_note_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// 1122
// apiForUpdateNoteContentsPageForSelected
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

export const getStudyNoteList = async ({
  queryKey,
}: QueryFunctionContext): Promise<type_for_study_note_list_row[]> => {
  const [_, pageNum] = queryKey;
  return await instance.get(`study-note/?page=${pageNum}`).then((response) => {
    console.log("response.data : ", response.data);
    return response.data;
  });
};

export const apiForCreateStudyNote = ({
  title,
  description,
}: type_for_insert_study_note) =>
  instance
    .post(
      `/study-note/`,
      {
        title,
        description,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
