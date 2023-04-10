import axios, { AxiosResponse } from "axios";
import { backendApi } from "./common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";

import {
  Shortcut,
  ShortcutListResponse,
  TypeForInsertToShortcutApi,
} from "../types/type_for_shortcut copy";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

export const api_for_get_shortcut_list2 = async ({
  queryKey,
}: QueryFunctionContext): Promise<ShortcutListResponse> => {
  const [_, pageNum] = queryKey;
  return await instance.get(`shortcut2/?page=${pageNum}`).then((response) => {
    // console.log("response.data : ", response.data);
    return response.data;
  });
};


export const apiForinsertToShortcut2 = ({
  shortcut,
  description,
  classification,
}: TypeForInsertToShortcutApi) => {
  console.log("shortcut : ", shortcut);
  console.log("description : ", description);
  console.log("classification : ", classification);

  // 중간에 다른 리턴값 설정 하면 type 에러 발생함
  // if (url) {
  // } else {
  //   alert("url 이 없습니다");
  //   return;
  // }

  return instance
    .post(
      `/shortcut2/`,
      {
        shortcut,
        description,
        classification
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiFordeleteShortcut2 = (shortcut_pk: number) => {
  console.log("shortcut_pk : ", shortcut_pk);
  return instance
    .delete(`shortcut2/${shortcut_pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};