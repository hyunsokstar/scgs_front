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
    console.log("response.data : ", response.data);
    return response.data;
  });
};

// create api-docu
// insertApiDocuApi
// export const insertToApiDocuApi = ({
//   url,
//   description,
//   classification,
// }: TypeForInsertToApiDocuApi) =>
//   instance
//     .post(
//       `/project_progress/${taskPk}/TestForTasks`,
//       {
//         test_description,
//         test_method,
//         test_passed,
//       },
//       {
//         headers: {
//           "X-CSRFToken": Cookie.get("csrftoken") || "",
//         },
//       }
//     )
//     .then((response) => response.data);
