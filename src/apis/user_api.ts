import axios from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { backendApi } from "./common_api";
import { IUserRow } from "../types/user/user_types";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// 타입 추가
export interface ISingup {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface IUsernameLoginVariables {
  username: string;
  password: string;
}

export interface ICreateProfilePhotoVariables {
  file: string;
  userPk: string;
}

export const deleteOneProjectTask = (project_pk: number) => {
  console.log("estimatePk : ", project_pk);
  return instance
    .delete(`project_progress/${project_pk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// api 추가 1122
export const getOneProjectTask = async ({ queryKey }: QueryFunctionContext) => {
  const [_, taskPk] = queryKey;
  // console.log("roomPestimatePk : ", taskPk);
  return await instance
    .get(`project_progress/${taskPk}`)
    .then((response) => response.data);
};

export const getUsersList = () =>
  instance.get("users").then((response) => {
    // console.log("user list response : ", response);
    return response.data;
  });

export const getUserNamesForCreate = () =>
  instance.get("users/only-user-name").then((response) => {
    // console.log("user list response : ", response);
    return response.data;
  });

export const getProfile = ({ queryKey }: QueryFunctionContext) => {
  const [_, userPk] = queryKey;
  // console.log("userPk : ", userPk);
  return instance.get(`users/${userPk}`).then((response) => response.data);
};

export const createProfilePhoto = ({
  file,
  userPk,
}: ICreateProfilePhotoVariables) => {
  console.log("createProfilePhoto check !!!!!");

  return instance
    .post(
      `users/${userPk}/photos`,
      { file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => {
      console.log("response.data api: ", response.data);

      return response.data;
    });
};

export const loginCheck = () =>
  instance.get(`users/me`).then((response) => response.data);

export const usernameLogIn = ({
  username,
  password,
}: IUsernameLoginVariables) =>
  instance
    .post(
      `/users/log-in`,
      { username, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const signUp = ({ name, username, email, password }: ISingup) =>
  instance
    .post(
      `/users/`,
      { name, username, email, password },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

interface ISaveMultiUserData {
  name: string;
  username: string;
  email: string;
  admin_level: number;
  position: number;
}

export const saveMultiUserUsingDataGrid = (
  data_for_multi_user_save: IUserRow[]
) => {
  return instance
    .post("/users/multi-users", data_for_multi_user_save, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const deleteMultiUserListForCheck = (
  ids_to_delete: number[] | undefined
) => {
  console.log("ids_to_delete : ", ids_to_delete);

  return axios
    .delete(`${backendApi}/api/v1/users/multi-users/delete`, {
      data: {
        user_ids: ids_to_delete,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((error) => {
      console.log("axios error : ", error);
    });
};
