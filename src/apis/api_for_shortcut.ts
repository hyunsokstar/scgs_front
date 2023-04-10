import axios, { AxiosResponse } from "axios";
import { backendApi } from "./common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";

import { Shortcut, ShortcutListResponse } from "../types/type_for_shortcut";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

export const api_for_get_shortcut_list = async ({
  queryKey,
}: QueryFunctionContext): Promise<ShortcutListResponse> => {
  const [_, pageNum] = queryKey;
  return await instance.get(`shortcut/?page=${pageNum}`).then((response) => {
    console.log("response.data : ", response.data);
    return response.data;
  });
};