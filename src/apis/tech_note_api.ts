import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { backendApi } from "../apis/common_api";
import {
  IFormTypeForCreateTechNoteList,
  ITypeForCreateTechNoteContent,
  IUpdateFormTypeForTechNoteInfo,
} from "../types/tech_note_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// 1122
export const apiFordeleteTechNoteContentByPk = (techNoteContentPk: number | string) => {
  // console.log("testPk : ", testPk);
  return instance
    .delete(`tech_note/tech-note-content/${techNoteContentPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const createNoteContent = ({
  note_content_fk,
  note_content_title,
  note_content_file,
  note_content_content,
}: ITypeForCreateTechNoteContent) =>
  instance
    .post(
      `/tech_note/${note_content_fk}`,
      {
        tech_note: note_content_fk,
        note_content_title:note_content_title,
        note_content_file:note_content_file,
        note_content_content:note_content_content,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getTechNoteList = ({ queryKey }: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;
  return instance.get(`tech_note?page=${pageNum}`).then((response) => {
    // console.log("response : ", response);
    const response_data = {
      total_count_for_tech_note_table_rows:
        response.data.total_count_for_tech_note_table_rows,
      tech_note_list_for_page: response.data.tech_note_list_for_page,
    };

    return response_data;
  });
};

export const updateTechNoteInfoByPk = ({
  techNotePk,
  category_option,
  tech_note_description,
}: IUpdateFormTypeForTechNoteInfo) => {
  console.log("updateTechNoteInfoByPk 실행 : ", techNotePk);

  return instance
    .put(
      "tech_note/",
      {
        techNotePk,
        tech_note_description,
        category_option,
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

export const deleteTechNoteListByPk = (techNotePk: number) => {
  // console.log("testPk : ", testPk);
  return instance
    .delete(`tech_note/${techNotePk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const createApiForTechNoteList = ({
  category_option,
  tech_note_description,
}: IFormTypeForCreateTechNoteList) => {
  console.log("createForTechNoteList 실행");

  return instance
    .post(
      "tech_note/",
      {
        title: tech_note_description,
        category: category_option,
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

// 1122
export const updateLikeForTechNote = (techNotePk: number) => {
  return instance
    .put(
      `/tech_note/${techNotePk}/like`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      return response.data;
    });
};

export const apiForupdateViewCountForTechNote = (techNotePk: number) => {
  return instance
    .put(
      `/tech_note/${techNotePk}/view-count/update`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      return response.data;
    });
};

export const getTechNoteContentListByPk = async ({ queryKey }: QueryFunctionContext) => {
  const [_, note_content_fk] = queryKey;
  console.log("note_content_fk : ", note_content_fk);

  return await instance
    .get(`tech_note/${note_content_fk}`)
    .then((response) => response.data);
};
