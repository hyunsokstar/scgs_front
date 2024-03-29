import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {
  TypeForInsertToApiDocuApi,
  type_for_api_for_api_docu_list,
} from "../types/api_docu_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});


export const get_api_docu_list = async ({
  queryKey,
}: QueryFunctionContext): Promise<type_for_api_for_api_docu_list> => {
  const [_, pageNum] = queryKey;
  return await instance.get(`api-docu/?page=${pageNum}`).then((response) => {
  // return await instance.get("api-docu/?page=2").then((response) => {
    return response.data;
  });
};

export const apiFordeleteOneProjectTask = (api_docu_pk: number) => {
  console.log("api_docu_pk : ", api_docu_pk);
  return instance
    .delete(`api-docu/${api_docu_pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// create api-docu
// insertApiDocuApi
export const insertToApiDocuApi = ({
  classification,
  description,
  url,
}: TypeForInsertToApiDocuApi) => {
  console.log("classification : ", classification);
  console.log("description : ", description);
  console.log("url : ", url);

  // 중간에 다른 리턴값 설정 하면 type 에러 발생함
  // if (url) {
  // } else {
  //   alert("url 이 없습니다");
  //   return;
  // }

  return instance
    .post(
      `/api-docu/`,
      {
        classification,
        description,
        url,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};
