import axios, { AxiosResponse } from "axios";
import { backendApi } from "./common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";

import {
  Shortcut,
  ShortcutsResponse,
  TypeForInsertToShortcutApi,
  TypeForUpdateFormForShortcut,
  formTypeForCreateRelatedShortcut,
} from "../types/type_for_shortcut";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// 1122

// apiForDeleteRelatedShortcutForCheckedRow
export const apiForDeleteRelatedShortcutForCheckedRow = (
  selectedRows: number[]
) => {
  console.log("checkedRowPks: ", selectedRows);

  return instance
    .delete("shortcut/related-shortcut/delete-for-chekced-row", {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
      data: { selectedRows }, // 요청 데이터를 `data` 필드에 포함
    })
    .then((response) => response.data);
};


export const apiForDeleteRelatedShortcutByPk = (
  related_shortcut_pk: number
) => {
  console.log("related_shortcut_pk : ", related_shortcut_pk);
  return instance
    .delete(`shortcut/related-shortcut/${related_shortcut_pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForCreateRelatedShortcut = ({
  shortcutId,
  shortcut_content,
  description,
}: formTypeForCreateRelatedShortcut) =>
  instance
    .post(
      `/shortcut/${shortcutId}`,
      {
        shortcutId,
        shortcut_content,
        description,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getRelatedShortCutList = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, shortcut_pk] = queryKey;
  return await instance
    .get(`shortcut/${shortcut_pk}`)
    .then((response) => response.data);
};

export const api_for_get_shortcut_list = async ({
  queryKey,
}: QueryFunctionContext): Promise<ShortcutsResponse> => {
  // const [_, pageNum] = queryKey;
  return await instance.get("shortcut").then((response) => {
    console.log("response.data 11111111 : ", response.data);
    return response.data;
  });
};

export const apiForUpdateShortcut = ({
  shortcutId,
  shortcut,
  description,
  classification,
  tags,
}: TypeForUpdateFormForShortcut) => {

  console.log("shortcut : ", shortcut);

  return instance
    .put(
      `/shortcut/${shortcutId}`,
      {
        shortcut,
        description,
        classification,
        tags,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): any => {
      return response.data;
    });
};

export const apiForinsertToShortcut = ({
  description,
  classification,
  tags,
}: TypeForInsertToShortcutApi) => {
  console.log("description : ", description);
  console.log("classification : ", classification);
  console.log("tags : ", tags);

  // 중간에 다른 리턴값 설정 하면 type 에러 발생함
  // if (url) {
  // } else {
  //   alert("url 이 없습니다");
  //   return;
  // }

  return instance
    .post(
      `/shortcut/`,
      {
        description,
        classification,
        tags,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiFordeleteShortcut = (shortcut_pk: number) => {
  console.log("shortcut_pk : ", shortcut_pk);
  return instance
    .delete(`shortcut/${shortcut_pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};
