import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { backendApi } from "../apis/common_api";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

export const getTechNoteList = ({ queryKey }: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;
  return instance
    .get(`project_progress/uncompleted?page=${pageNum}`)
    .then((response) => {
      console.log("response : ", response);
    
    
      return response;
    });
};
