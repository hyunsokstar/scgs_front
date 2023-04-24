import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {
  type_for_insert_study_note,
  type_for_study_note_list_row,
} from "../types/study_note_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// apiForGetStuyNoteContentList
export const apiForGetStuyNoteContentList = async ({
  queryKey,
}: QueryFunctionContext) => {

  const [_, study_note_pk] = queryKey;
  console.log("study_note_pk : ", study_note_pk);

  return await instance
    .get(`study-note/${study_note_pk}`)
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
