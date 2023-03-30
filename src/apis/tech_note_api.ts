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
    .get(`tech_note?page=${pageNum}`)
    .then((response) => {
      console.log("response : ", response)
      const response_data = {
        total_count_for_tech_note_table_rows: response.data.total_count_for_tech_note_table_rows,
        tech_note_list_for_page: response.data.tech_note_list_for_page
      }
    
      return response_data;
    });
};

export const updateTechNoteInfoByPk = ({ taskPk, status_to_move }: any) => {
    console.log(
      "updateProjectStatusByDrag 실행 status_to_move check : ",
      status_to_move
    );
  
    return instance
      .put(
        `/project_progress/${taskPk}/update_project_status_page/update`,
        {
          status_to_move: status_to_move,
        },
        {
          headers: {
            "X-CSRFToken": Cookie.get("csrftoken") || "",
          },
        }
      )
      .then((response): any => {
        // console.log("response : ", response);
        return response.data;
      });
  };