import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import { type_for_study_note_list_row } from "../types/study_note_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

export const getStudyNoteList = async ({
  queryKey,
}: QueryFunctionContext): Promise<type_for_study_note_list_row[]> => {
  const [_, pageNum] = queryKey;
  return await instance.get(`study-note/?page=${pageNum}`).then((response) => {
    console.log("response.data : ", response.data);
    return response.data;
  });
};
