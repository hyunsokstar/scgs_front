import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {

} from "../types/api_docu_type";
import { list_for_long_term_plan } from "../types/type_for_plan_maker";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

export const api_for_get_long_term_plan_list = async ({
    queryKey,
  }: QueryFunctionContext): Promise<list_for_long_term_plan> => {
    const [_, pageNum] = queryKey;

    return await instance.get(`plan-maker/?page=${pageNum}`).then((response) => {
      console.log("response.data : ", response.data);
      return response.data;
    });

  };