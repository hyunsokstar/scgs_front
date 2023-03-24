import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { backendApi } from "../apis/common_api";
import {
  IFormTypeForProjectProgress,
  IResponseTypeForProjectTaskUpdate,
} from "../types/project_progress/project_progress_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// put for pk
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const updateProjectApiByPk = ({
  taskPk,
  writer,
  task,
  importance,
  task_completed,
  started_at,
  due_date,
}: any) => {
  console.log(
    "data for api requset : ",
    taskPk,
    writer,
    task,
    importance,
    task_completed,
    started_at,
    due_date
  );

  console.log(
    "data chekck for api",
    taskPk,
    writer,
    task,
    importance,
    task_completed,
    started_at,
    due_date
  );

  return instance
    .put(
      `/project_progress/${taskPk}`,
      {
        taskPk,
        writer,
        task,
        importance,
        task_completed,
        started_at,
        due_date,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

// export const updateProjectImportance = ((taskPk: any, star_count: any) => {
export const updateProjectImportance = ({ taskPk, star_count }: any) => {
  console.log("updateProjectImportance 실행 check");

  return instance
    .put(
      `/project_progress/${taskPk}/importance/update`,
      {
        star_count: star_count,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): any => {
      console.log("response : ", response);
      return response.data;
    });
};

export const updateProjectTaskCompleted = (taskPk: string) => {
  console.log("updateProjectTaskCompleted 실행 check");

  return instance
    .put(
      `/project_progress/${taskPk}/completed/update`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      console.log("response : ", response);
      return response.data;
    });
};

export const updateProjectInProgress = (taskPk: string) => {
  console.log("updateProjectTaskCompleted 실행 check");

  return instance
    .put(
      `/project_progress/${taskPk}/in_progress/update`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      console.log("response : ", response);
      return response.data;
    });
};

export const updateProjectIsTesting = (taskPk: string) => {
  console.log("updateProjectTaskCompleted 실행 check");

  return instance
    .put(
      `/project_progress/${taskPk}/is_testing/update`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      console.log("response : ", response);
      return response.data;
    });
};

export const insertProjectProgressRow = ({
  task,
  writer,
  importance,
  task_completed,
  password,
  task_manager
}: IFormTypeForProjectProgress) =>
  instance
    .post(
      `/project_progress/`,
      {
        task,
        writer,
        importance,
        task_completed,
        password,
        task_manager
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getCompletedTaskList = ({ queryKey }: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;
  // console.log("pageNum : ", pageNum);
  return instance
    .get(`project_progress/completed?page=${pageNum}`)
    .then((response) => {
      // console.log("api result for completed task list: ", response);

      const response_data = {
        totalPageCount: response.data.totalPageCount,
        ProjectProgressList: response.data.ProjectProgressList,
      };

      return response_data;
    });
};

export const getCompletedTaskListForMe = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;
  // console.log("pageNum : ", pageNum);
  return instance
    .get(`project_progress/completed/for-me?page=${pageNum}`)
    .then((response) => {
      // console.log("api result for completed task list: ", response);

      const response_data = {
        totalPageCount: response.data.totalPageCount,
        ProjectProgressList: response.data.ProjectProgressList,
      };

      return response_data;
    });
};

export const getUncompletedTaskList = ({ queryKey }: QueryFunctionContext) => {

  const [_, pageNum] = queryKey;
  return instance
    .get(`project_progress/uncompleted?page=${pageNum}`)
    .then((response) => {

      const response_data = {
        totalPageCount: response.data.totalPageCount,
        ProjectProgressList: response.data.ProjectProgressList,
      };

      return response_data;
    });
};

export const getUncompletedTaskListForMe = ({
  queryKey,
}: QueryFunctionContext) => {
  // console.log("getProjectProgressList 요청 확인 at api");

  const [_, pageNum] = queryKey;
  // console.log("pageNum : ", pageNum);
  return instance
    .get(`project_progress/uncompleted/for-me?page=${pageNum}`)
    .then((response) => {
      // console.log("api result for uncompleted task list: ", response);

      const response_data = {
        totalPageCount: response.data.totalPageCount,
        ProjectProgressList: response.data.ProjectProgressList,
      };

      return response_data;
    });
};

export const updateProjectDueDate = ({ taskPk, due_date }: any) => {
  console.log("updateProjectImportance 실행 check");

  return instance
    .put(
      `/project_progress/${taskPk}/due_date/update`,
      {
        due_date: due_date,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): any => {
      console.log("response : ", response);
      return response.data;
    });
};

export const updateProjectStartedAt = ({
  taskPk,
  started_at_for_update,
}: any) => {
  console.log("updateProjectImportance 실행 check");

  return instance
    .put(
      `/project_progress/${taskPk}/started_at/update`,
      {
        started_at_for_update: started_at_for_update,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): any => {
      console.log("response : ", response);
      return response.data;
    });
};

// interface ICreateProfilePhotoVariables {
//   file: string;
//   userPk: string;
// }

export const deleteOneRefImageForTask = (ref_image_pk: number) => {
  console.log("ref_image_pk : ", ref_image_pk);
  return instance
    .delete(`medias/ref-image-for-task/${ref_image_pk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const createRefImageForTask = ({ image_url, taskPk }: any) => {
  console.log("createProfilePhoto check !!!!!");

  return instance
    .post(
      "medias/ref-image-for-task/upload",
      { taskPk, image_url },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => {
      console.log("response for createRefImageForTask api: ", response.data);

      return response.data;
    });
};
