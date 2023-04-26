import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {
  type_for_insert_study_note,
  type_for_parameter_for_delete_pages_for_study_note,
  type_for_study_note_list_row,
} from "../types/study_note_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// export const getCompletedTaskList = ({ queryKey }: QueryFunctionContext) => {
//   const [
//     _,
//     pageNum,
//     selectedPeriodOptionForUncompletedTaskList,
//     username_for_search,
//   ] = queryKey;
//   // console.log("pageNum : ", pageNum);
//   return instance
//     .get("project_progress/completed", {
//       params: {
//         page: pageNum,
//         selectedPeriodOptionForUncompletedTaskList,
//         username_for_search,
//       },
//     })
//     .then((response) => {
//       const response_data = {
//         ProjectProgressList: response.data.ProjectProgressList,
//         totalPageCount: response.data.totalPageCount,
//         task_number_for_one_page: response.data.task_number_for_one_page,
//         writers_info: response.data.writers_info,
//         count_for_ready: response.data.count_for_ready,
//         count_for_in_progress: response.data.count_for_in_progress,
//         count_for_in_testing: response.data.count_for_in_testing,
//       };

//       return response_data;
//     });
// };

// apiForGetStuyNoteContentList
export const apiForGetStuyNoteContentList = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, study_note_pk, currentPage] = queryKey;
  console.log("study_note_pk : ", study_note_pk);

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
  selectedButtonsData,
}: type_for_parameter_for_delete_pages_for_study_note) => {
  console.log(
    "study_note_pk , selectedButtonsData : ",
    study_note_pk,
    selectedButtonsData
  );

  return instance
    .delete(`study-note/contents/${study_note_pk}`, {
      data: selectedButtonsData, // 요청 본문에 selectedButtonsData 추가
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
