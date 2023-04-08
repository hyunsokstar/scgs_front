import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import { ApiDocuListResponse, type_for_api_for_api_docu_list } from "../types/api_docu_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

export const get_api_docu_list = ({
  queryKey,
}: QueryFunctionContext): ApiDocuListResponse => {
  const [_, pageNum] = queryKey;
  return instance.get(`api-docu/?page=${pageNum}`).then((response) => {
    return response;
  });
};
