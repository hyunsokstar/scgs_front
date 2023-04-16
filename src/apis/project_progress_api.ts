import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { backendApi } from "../apis/common_api";
import {
  FormTypeForCreateCommentForTask,
  FormTypeForCreateTest,
  FormTypeForExtraTask,
  IFormTypeForProjectProgress,
  ITypeForTaskDetailUpdate,
} from "../types/project_progress/project_progress_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

interface ICommentTextUpdateApiParameter {
  commentPk: number | string;
  commentText: string;
}

// 1122

export const getDataForTaskStaticsForIsCompleted = () => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: "/project_progress/task-statics",
    params: {},
  };
  return instance.request(config).then((response) => {
    console.log("response for getProgectTasksStatusData: ", response.data);
    return response.data;
  });
};

export const insertCommentForTaskApi = ({
  taskPk,
  task_manager,
  task,
  importance,
}: FormTypeForExtraTask) =>
  instance
    .post(
      `/project_progress/extra_tasks`,
      {
        taskPk,
        task_manager,
        task,
        importance,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const deleteOneCommentForTaskByPkApi = (commentPk: string | number) => {
  console.log("commentPk : ", commentPk);
  return instance
    .delete(`project_progress/comment/${commentPk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const updateCommentTextForTaskApi = ({
  commentPk,
  commentText,
}: ICommentTextUpdateApiParameter) => {
  console.log("updateCommentForTaskApi 실행 check : ", commentText);

  return instance
    .put(
      `/project_progress/comment/${commentPk}/comment/update`,
      {
        comment: commentText,
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

export const updateMutationForCommentEditModeApi = (
  commentPk: string | number
) => {
  console.log("updateMutationForCommentEditModeApi 실행 check");

  return instance
    .put(
      `/project_progress/comment/${commentPk}/edit-mode/update`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      // console.log("response : ", response);
      return response.data;
    });
};

export const updateTestPassedForTestForTask = (taskPk: string | number) => {
  console.log("updateTestPassedForTestForTask 실행 check");

  return instance
    .put(
      `/project_progress/TestForTasks/${taskPk}/update`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      // console.log("response : ", response);
      return response.data;
    });
};

export const updateTesterListByTestPkApi = (testPk: string | number) => {
  console.log("updateProjectTaskCompleted 실행 check");

  return instance
    .put(
      `/project_progress/TestForTasks/${testPk}/update/testers`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      // console.log("response : ", response);
      return response.data;
    });
};

export const deleteOneTestForTask = (testPk: string | number) => {
  console.log("testPk : ", testPk);
  return instance
    .delete(`project_progress/TestForTasks/${testPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const insertTestForTask = ({
  taskPk,
  test_description,
  test_method,
  test_passed,
}: FormTypeForCreateTest) =>
  instance
    .post(
      `/project_progress/${taskPk}/TestForTasks`,
      {
        test_description,
        test_method,
        test_passed,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const updateExtraTaskImportance = ({ taskPk, star_count }: any) => {
  console.log("updateProjectImportance 실행 check");

  return instance
    .put(
      `/project_progress/extra_taks/${taskPk}/importance/update`,
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
      // console.log("response : ", response);
      return response.data;
    });
};

// original updateProjectStatusByDrag to updateExtraTaskStatusUsingSelectBox
export const updateExtraTaskStatusUsingSelectBox = ({
  taskPk,
  task_status,
}: any) => {
  console.log("param : ", taskPk, task_status);

  return instance
    .put(
      `/project_progress/extra_tasks/${taskPk}`,
      {
        task_status: task_status,
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

export const deleteOneExtraTaskForPk = (extraTaskPk: number) => {
  console.log("estimatePk : ", extraTaskPk);
  return instance
    .delete(`project_progress/extra_tasks/${extraTaskPk}`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

interface IOptionForTaskStatus {
  dateRange: string;
  taskManagerForFiltering: string | number;
  importance: number;
  isRequestedForHelp: boolean;
  isBountyTask: boolean;
}

export const getProgectTasksStatusData = ({
  dateRange,
  taskManagerForFiltering,
  importance,
  isRequestedForHelp,
  isBountyTask,
}: IOptionForTaskStatus) => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: "project_progress/task-status",
    params: {
      dateRange,
      taskManagerForFiltering,
      importance,
      isRequestedForHelp,
      isBountyTask,
    },
  };
  return instance.request(config).then((response) => {
    console.log("response for getProgectTasksStatusData: ", response);
    return response;
  });
};

// put for pk
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export const updateProjectApiByPk = ({
  taskPk,
  writer,
  task_description,
  task,
  importance,
  task_completed,
  started_at,
  due_date,
}: ITypeForTaskDetailUpdate) => {
  console.log(
    "data for api requset : ",
    taskPk, // number
    task_description, // string
    writer, // string
    task, // string
    importance, // number
    task_completed, // boolean
    started_at, // string or undefined
    due_date // string or undefined
  );

  console.log(
    "data chekck for api",
    taskPk,
    task_description,
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
        task_description,
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
      // console.log("response : ", response);
      return response.data;
    });
};

export const updateProjectStatusByDrag = ({ taskPk, status_to_move }: any) => {
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
      // console.log("response : ", response);
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
      // console.log("response : ", response);
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
      // console.log("response : ", response);
      return response.data;
    });
};

export const insertExtraTaskByModal = ({
  taskPk,
  task_manager,
  task,
  importance,
}: FormTypeForExtraTask) =>
  instance
    .post(
      `/project_progress/extra_tasks`,
      {
        taskPk,
        task_manager,
        task,
        importance,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const createCommentForTaskApi = ({
  taskPk,
  comment,
}: FormTypeForCreateCommentForTask) =>
  instance
    .post(
      `/project_progress/${taskPk}/comment`,
      {
        task: taskPk,
        comment,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const insertProjectProgressRow = ({
  task,
  writer,
  importance,
  task_completed,
  password,
  task_manager,
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
        task_manager,
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
  const [_, pageNum, selectedPeriodOptionForUncompletedTaskList] = queryKey;

  console.log(
    "selectedPeriodOptionForUncompletedTaskList : ",
    selectedPeriodOptionForUncompletedTaskList
  );

  return (
    instance
      // .get(`project_progress/uncompleted?page=${pageNum}`)
      .get("project_progress/uncompleted", {
        params: {
          page: pageNum,
          selectedPeriodOptionForUncompletedTaskList,
        },
      })
      .then((response) => {
        const response_data = {
          writers_info: response.data.writers_info,
          count_for_ready: response.data.count_for_ready,
          count_for_in_progress: response.data.count_for_in_progress,
          count_for_in_testing: response.data.count_for_in_testing,
          totalPageCount: response.data.totalPageCount,
          ProjectProgressList: response.data.ProjectProgressList,
        };

        return response_data;
      })
  );
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
        count_for_ready: response.data.count_for_ready,
        count_for_in_progress: response.data.count_for_in_progress,
        count_for_in_testing: response.data.count_for_in_testing,
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
      // console.log("response : ", response);
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
      // console.log("response : ", response);
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

export const createTestResultImageForTest = ({ testPk, image_url }: any) => {
  console.log("test result image check :", testPk, image_url);

  return instance
    .post(
      "medias/test-result-image/create",
      { testPk, image_url },
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
