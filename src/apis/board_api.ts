import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {} from "../types/study_note_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

export const apiForGetSuggestionListForBoard = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;

  return instance
    .get(`/board/suggestion`, {
      params: { pageNum: pageNum },
    })
    .then((response) => {
      console.log("response : ", response);

      return response.data;
    });
};