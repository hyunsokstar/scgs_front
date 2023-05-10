import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";

import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {} from "../types/api_docu_type";
import {
  LongTermPlanContentList,
  formTypeForCreatePlan,
  list_for_long_term_plan,
} from "../types/type_for_plan_maker";
import { log } from "console";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});
// 1122

export const apiFordeletePlanContentsForChecked = (
  idsForDeleteContentsForChecked: number[]
) => {
  console.log("study_note_pk , idsForDeleteContentsForChecked : ", idsForDeleteContentsForChecked);

  return instance
    .delete("plan-maker/contents/delete-for-checked", {
      data: idsForDeleteContentsForChecked, // [1,2,3,5]
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForUpdatePlanContentsForChecked = (
  checkedRowsForUpdate:LongTermPlanContentList,
) => {
  console.log("checkedRowsForUpdate: ", checkedRowsForUpdate);

  return instance
    .put(
      "plan-maker/update-plan-contents-for-checked",
      {
        checkedRowsForUpdate,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const api_for_get_long_term_plan_list = async ({
  queryKey,
}: QueryFunctionContext): Promise<list_for_long_term_plan> => {
  const [_, pageNum] = queryKey;

  return await instance.get(`plan-maker/?page=${pageNum}`).then((response) => {
    console.log("response.data : ", response.data);
    return response.data;
  });
};

// 1122
export const getContentsListForPlan = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, plan_pk] = queryKey;
  // console.log("roomPestimatePk : ", taskPk);
  return await instance
    .get(`plan-maker/${plan_pk}/contents`)
    .then((response) => response.data);
};

export const apiForCreatePlan = ({
  title,
  description,
  category,
}: formTypeForCreatePlan) => {
  console.log("category : ", category);

  return instance
    .post(
      `/plan-maker/`,
      {
        title,
        description,
        category,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiFordeleteOnePlan = (plan_pk: number) => {
  console.log("plan_pk : ", plan_pk);
  return instance
    .delete(`plan-maker/${plan_pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};
