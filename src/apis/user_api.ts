import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { backendApi } from "./common_api";
import { IUserRow, parameterTypeForCreateUserTaskComment } from "../types/user/user_types";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// 1122

export const apiForGetAllUserNamesWithOutMe = () =>
  instance.get("users/only-user-name-without-me").then((response) => {
    return response.data;
  });


export const apiForGetAllUserNames = () =>
  instance.get("users/only-user-name").then((response) => {
    return response.data;
  });

// apiForDeleteSurvey
export const apiForDeleteUserTaskCommentForPk = (commentPk: string | number) => {
  console.log("commentPk : ", commentPk);
  return instance
    // .delete(`project_progress/comment/${commentPk}`, {
      .delete(`users/comment/${commentPk}/delete`, {
        headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForCreateUserTaskComment = ({
  userPk,
  comment,
}: parameterTypeForCreateUserTaskComment ) =>
  instance
    .post(
      `/users/${userPk}/comment`,
      {
        owner: userPk,
        comment,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForGetCompletedTaskListForPersonalTaskStatus = async ({ queryKey }: QueryFunctionContext) => {
  const [_, userPk] = queryKey;

  return await instance
    .get(`users/${userPk}/task-data-for-completed`)
    .then((response) => response.data);
};

export const apiForGetTaskDataForSelectedUser = async ({ queryKey }: QueryFunctionContext) => {
  const [_, userPk] = queryKey;

  return await instance
    .get(`users/${userPk}/task-data-for-uncompleted`)
    .then((response) => response.data);
};

export const apiForgetDataForTaskInfoPerUser = ({
  queryKey,
}: QueryFunctionContext) => {
  // const [_, pageNum] = queryKey;
  return instance.get(`users/members-task-status`).then((response) => {
    console.log("response : ", response);

    return response.data;
  });
};
export const apiForUpdateEditModeForStudyNoteContent = (
  userPk: string | number
) => {
  console.log("apiForUpdateEditModeForStudyNoteForContent 실행 check");

  return instance
    .put(
      `/users/${userPk}/EditModeForStudyNoteForContent/update`,
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
    return response.data;
  });

export const getUserNamesForSelectOption = () =>
  instance.get("users/only-user-name").then((response) => {
    // console.log("user list response : ", response);
    return response.data;
  });

export const getProfile = ({ queryKey }: QueryFunctionContext) => {
  const [_, userPk] = queryKey;
  // console.log("userPk : ", userPk);
  return instance.get(`users/${userPk}`).then((response) => response.data);
};

// apiForUpdateChallengeMainImage
export const createProfilePhoto = ({
  file,
  userPk,
}: ICreateProfilePhotoVariables) => {
  console.log("createProfilePhoto check !!!!!");

  return instance
    .post(
      `users/${userPk}/photos`,
      { profile_image: file },
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
