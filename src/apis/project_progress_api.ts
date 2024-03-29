import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import { backendApi } from "../apis/common_api";
import {
  FormTypeForCreateCommentForTask,
  FormTypeForCreateTest,
  FormTypeForExtraTask,
  IFormTypeForExtraTask,
  IFormTypeForProjectProgress,
  ITypeForTaskDetailUpdate,
  typeForDueDateUpdateForChecked,
  typeForParameterForUpdateTaskClassificationForChecked,
  typeForParameterForUpdateTaskImportanceForChecked,
  typeForParameterForUpdateTaskMangerForChecked,
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

export const getInProgressTaskList = ({ queryKey }: QueryFunctionContext) => {
  const [
    _,
    pageNum,
    selectedPeriodOptionForUncompletedTaskList,
    username_for_search,
    task_status_for_search,
    due_date_option_for_filtering,
    rating_for_filter_option,
    groupByOption,
    isForUrgent,
    checkForCashPrize,
    is_task_due_date_has_passed,
  ] = queryKey;

  return instance
    .get("project_progress/in_progress", {
      params: {
        page: pageNum,
        selectedPeriodOptionForUncompletedTaskList,
        username_for_search,
        task_status_for_filter: task_status_for_search,
        due_date_option_for_filtering,
        rating_for_filter_option,
        isForUrgent,
        checkForCashPrize,
        groupByOption,
        is_task_due_date_has_passed,
      },
    })
    .then((response) => {
      const response_data = {
        ProjectProgressList: response.data.ProjectProgressList,
        totalPageCount: response.data.totalPageCount,
        task_number_for_one_page: response.data.task_number_for_one_page,
        writers_info: response.data.writers_info,
        count_for_ready: response.data.count_for_ready,
        count_for_in_progress: response.data.count_for_in_progress,
        count_for_in_testing: response.data.count_for_in_testing,
        total_task_count_for_today: response.data.total_task_count_for_today,
        completed_task_count_for_today:
          response.data.completed_task_count_for_today,
        achievement_rate_for_today: response.data.achievement_rate_for_today,
        count_for_duedate_passed: response.data.count_for_duedate_passed,
      };

      return response_data;
    });
};

export const apiForCreateExtraManagerForTask = ({
  targetTaskId,
  userNameForRegister,
}: any) =>
  instance
    .post(
      `/project_progress/${targetTaskId}/add-extra-manager`,
      {
        userNameForRegister,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForDeleteExtraManagerForTask = (extraManagerId: any) => {
  console.log("extraManagerId : ", extraManagerId);
  return (
    instance
      // .delete(`project_progress/comment/${commentPk}`, {
      .delete(`project_progress/extra-manager/${extraManagerId}/delete`, {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      })
      .then((response) => response.data)
  );
};

export const apiForGetUserListWithoutOwnerUser = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, ownerUser, extra_managers, pageNum] = queryKey;

  const extraManagersString = JSON.stringify(extra_managers);

  const data = await instance
    .get(`users/manager-list-without-main-manager/${ownerUser}`, {
      params: { extra_managers: extraManagersString, pageNum: pageNum },
    })
    .then((response) => response.data);

  return data;
};

export const apiForRevertExtraTaskFromSelectedOne = ({
  checkedRowsForConvertForRevert,
  selectedTargetPk,
}: any) => {
  return instance
    .post(
      `/project_progress/selected-one/checked-tasks/revert-task`,
      { checkedRowsForConvertForRevert, selectedTargetPk },
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

export const apiForGetTaskListForTaskIntergrationForSelectedOne = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, pageNum, selectedTaskPk] = queryKey;

  console.log("selectedTaskPk : ", selectedTaskPk);

  const data = await instance
    // .get("project_progress/getTaskListForTaskIntegration/<int:selectedTaskPk>", {
    .get(
      `project_progress/taskListForTaskIntergrationForSelectedOne/${selectedTaskPk}`,
      {
        params: { pageNum },
      }
    )
    .then((response) => response.data);

  return data;
};

export const apiForTransformCheckedTasksToSupplementTaskForSelected = ({
  checkedRowsForConvert,
  selectedTaskPk,
}: any) => {
  return instance
    .post(
      `/project_progress/transform/checked-tasks/target-task`,
      { checkedRowsForConvert, selectedTaskPk },
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

// apiForSearchTargetTaskListBySearchWords
export const apiForSearchTargetTaskListBySearchWords = ({
  searchWords,
  checkedRowPks,
}: any) => {
  console.log("searchWords", searchWords);
  console.log("checkedRows : ", checkedRowPks);

  return instance
    .get(`project_progress/target-tasks-for-intergration/by-search-word`, {
      params: {
        searchWords: searchWords,
        checkedRowPks: checkedRowPks,
      },
    })
    .then((response) => response.data);
};

export const apiForGetTargetTaskInfoForTaskIntergrationByPk = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, selectedTargetPk] = queryKey;

  console.log("target task 요청 !");

  const data = await instance
    .get(`project_progress/target-task/${selectedTargetPk}`, {
      params: {},
    })
    .then((response) => response.data);

  return data;
};

// apiForGetTargetTaskListForTaskIntegration
export const apiForGetTargetTaskListForTaskIntegration = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, pageNum, checkedRowPks] = queryKey;

  console.log("checkedRowPks : ", checkedRowPks);

  const data = await instance
    .get("project_progress/getTaskListForTaskIntegration", {
      params: { pageNum: pageNum, checkedRowPks: checkedRowPks },
    })
    .then((response) => response.data);

  return data;
};

export const apiForDeleteCompletedTasksForChecked = (
  checkedRowPks: number[]
) => {
  console.log("study_note_pk , selectedButtonsData : ", checkedRowPks);

  return instance
    .delete("project_progress/delete-complted-tasks-for-chkeck", {
      data: checkedRowPks, // [1,2,3,5]
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// TestResultImageForCompletedTask
export const createResultImageForCompletedTask = ({
  image_url,
  taskPk,
}: any) => {
  console.log("createProfilePhoto check !!!!!");

  return instance
    .post(
      "medias/create-result-image-for-completed-task",
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

export const apiForUpdateTaskDueDateByPk = ({ id, due_date_option }: any) => {
  return instance
    .put(
      `/project_progress/${id}/update-due-date-by-due-date-option`,
      { due_date_option },
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

export const createRefImageForExtraTask = ({ image_url, taskPk }: any) => {
  console.log("createProfilePhoto check !!!!!");

  return instance
    .post(
      "medias/ref-image-for-extra-task/upload",
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

export const apiForDeleteCompletedTaskForChecked = (
  checkedRowPks: number[]
) => {
  console.log("study_note_pk , selectedButtonsData : ", checkedRowPks);
  return instance
    .delete("project_progress/delete-for-checked", {
      data: checkedRowPks, // [1,2,3,5]
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForInsertTestForExtraTask = ({
  taskPk,
  test_description,
  test_method,
  test_passed,
}: FormTypeForCreateTest) =>
  instance
    .post(
      // `/project_progress/${taskPk}/TestForTasks`,
      `/project_progress/ExtraTask/${taskPk}/add-test-for-extra-task`,
      {
        taskPk,
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

export const apiForInsertTestResultImageForExtraTask = ({
  testPk,
  image_url,
}: any) => {
  console.log("test result image check :", testPk, image_url);

  return instance
    .post(
      "medias/TestResultImageForExtraTask",
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

export const apiForDeleteTestForExtraTask = (testPk: string | number) => {
  console.log("testPk : ", testPk);
  return (
    instance
      // .delete(`project_progress/TestForTasks/${testPk}/delete`, {
      .delete(`project_progress/TestForExtraTask/${testPk}/delete`, {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      })
      .then((response) => response.data)
  );
};

export const apiForupdateTesterListForExtraTask = (testPk: string | number) => {
  console.log("updateProjectTaskCompleted 실행 check");

  return instance
    .put(
      `/project_progress/TestForExtraTask/${testPk}/update-testers`,
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

export const apiForUpdateTestPassedForExtraTask = (taskPk: string | number) => {
  console.log("apiForUpdateTestPassedForExtraTask 실행 check");

  return instance
    .put(
      `/project_progress/TestForExtraTask/${taskPk}/update-test-passed`,
      // `/project_progress/TestForTasks/${taskPk}/update`,
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

export const apiForUpdateCommentForExtraTask = ({
  commentPk,
  commentText,
}: ICommentTextUpdateApiParameter) => {
  console.log("updateCommentForTaskApi 실행 check : ", commentText);

  return instance
    .put(
      `/project_progress/extra-task/comment/${commentPk}/update`,
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
      return response.data;
    });
};

export const apiForDeleteCommentForExtraTaskByPk = (
  commentPk: string | number
) => {
  console.log("commentPk : ", commentPk);
  return instance
    .delete(`project_progress/extra-task/comment/${commentPk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForInsertCommentForExtraTask = ({
  taskPk,
  comment,
}: FormTypeForCreateCommentForTask) =>
  instance
    .post(
      `/project_progress/extra-task/${taskPk}/comment`,
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

export const apiForUpdateEditModeForExtraTaskComment = (
  commentPk: string | number
) => {
  console.log("apiForUpdateEditModeForExtraTaskComment 실행 check");
  return instance
    .put(
      `/project_progress/extra-task/${commentPk}/update-edit-mode`,
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

export const apiForCreateTaskUrlForExtaTask = (extraTaskPk: any) =>
  instance
    .post(
      `/project_progress/${extraTaskPk}/create-task-url-for-extra-task`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForDeleteTaskUrlForExtraTaskWithPk = (
  project_pk: string | number
) => {
  console.log("estimatePk : ", project_pk);

  return instance
    .delete(`project_progress/task-url-for-extra-task/${project_pk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForDeleteTaskUrlForTaskWithPk = (
  project_pk: string | number
) => {
  console.log("estimatePk : ", project_pk);

  return instance
    .delete(`project_progress/task-url-for-task/${project_pk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForDeleteExtraTaskUrlForTaskWithPk = (
  project_pk: string | number
) => {
  console.log("estimatePk : ", project_pk);

  return instance
    .delete(`project_progress/task-url-for-extra-task/${project_pk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForUpdateTaskUrlForExtraTaskForPk = ({
  pk,
  taskUrlForUpdate,
}: any) => {
  console.log("parameter check : ", pk, taskUrlForUpdate);

  return instance
    .put(
      `/project_progress/task-url-for-extra-task/${pk}/update`,
      { pk, taskUrlForUpdate },
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

export const apiForUpdateTaskUrlForTaskForPk = ({
  pk,
  taskUrlForUpdate,
}: any) => {
  console.log("parameter check : ", pk, taskUrlForUpdate);

  return instance
    .put(
      `/project_progress/task-url-for-task/${pk}/update`,
      { pk, taskUrlForUpdate },
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
export const apiForCreateTaskUrlForTask = (taskPk: any) =>
  instance
    .post(
      `/project_progress/${taskPk}/create-task-urk-for-task-pk`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

// 1002
export const apiForUpdateExtraTask = ({
  pk,
  task,
  task_description,
  task_manager,
  task_status,
}: IFormTypeForExtraTask) => {
  console.log(
    "parameter to backend :: ",
    pk,
    task,
    task_description,
    task_manager,
    task_status
  );

  const payload = {
    pk,
    task,
    task_description,
    task_manager,
    task_status,
  };

  return instance
    .put(`/project_progress/extra_tasks/${pk}`, payload, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForExtraTaskDetail = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, ExtraTaskPk] = queryKey;
  // console.log("roomPestimatePk : ", taskPk);
  return await instance
    .get(`project_progress/extra_tasks/${ExtraTaskPk}`)
    .then((response) => response.data);
};

// http://127.0.0.1:8000/api/v1/project_progress/task-log
export const apiForGetTaskLogList = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, filterOptionForUserNameForTaskLogList, selectedDay] = queryKey;
  const data = await instance
    .get(`project_progress/task-log`, {
      params: {
        filterOptionForUserNameForTaskLogList,
        selectedDay,
      },
    })
    .then((response) => response.data);

  return data;
};

// apiForUpdateTaskOrder
export const apiForUpdateTaskDueDateAndOrder = ({
  taskPk,
  time_option,
  orgin_task_id,
  ordering_option,
}: any) => {
  console.log(`
  check parameter for apiForUpdateTaskDueDateAndOrder 
  taskPk : ${taskPk}
  time_option : ${time_option}
  order_for_update : ${orgin_task_id}
  order_for_update : ${ordering_option}
  `);

  return instance
    .put(
      "project_progress/update-task-time-option-and-order",
      {
        taskPk,
        time_option,
        orgin_task_id,
        ordering_option,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

// http://127.0.0.1:8000/api/v1/project_progress/task-status-view-for-today
export const apiForgetTaskStatusForToday = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, checkedPksForUserList, selectedDay] = queryKey;

  // alert(checkedPksForUserList)
  console.log("checkedPksForUserList : ", checkedPksForUserList);
  console.log("selectedDay : ", selectedDay);

  // const config: AxiosRequestConfig = {
  //   method: "get",
  //   url: "project_progress/task-status-view-for-today",
  //   params: {checkedPksForUserList},
  // };

  // return instance
  //   .get("project_progress/task-status-view-for-today", {
  //     params: { checkedPksForUserList },
  //   })
  //   .then((response) => {
  //     // console.log("response for getProgectTasksStatusData: ", response);
  //     return response.data;
  //   });

  const config: AxiosRequestConfig = {
    method: "get",
    url: `project_progress/task-status-view-for-today?checkedPksForUserList=${checkedPksForUserList}`,
    params: {selectedDay}
  };

  return instance.request(config).then((response) => {
    return response.data;
  });
};

// apiForGetDataForDailyTaskCountForPersonalUser
export const apiForGetDataForDailyTaskCountForPersonalUser = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, userPk] = queryKey;
  console.log("roomPk : ", userPk);
  return instance
    .get(`project_progress/${userPk}/daily-task-count`)
    .then((response) => response.data);
};

export const apiForGetTaskListForCheckedPks = ({
  queryKey,
}: QueryFunctionContext<any>): any => {
  const [_, checkedRowPks] = queryKey;

  const numericCheckedRowPks = checkedRowPks.map(Number);

  return instance
    .get("project_progress/task-list-for-checked", {
      params: {
        checkedRowPks: numericCheckedRowPks.join("|"),
      },
    })
    .then((response) => {
      const response_data = {
        total_count: response.data.total_count,
        ProjectProgressList: response.data.ProjectProgressList,
      };

      return response_data;
    });
};


export const apiForUpdateTaskDueDate = ({ taskPk, duration_option }: any) => {
  console.log("apiForUpdateTaskDueDate check !!!!!!!!!!!!!");
  console.log("taskPk: ", taskPk);

  return instance
    .put(
      "project_progress/update-task-due-date",
      {
        taskPk,
        duration_option,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForUpdateTaskDueDateForChecked = ({
  duration_option,
  checkedRowPks,
}: typeForDueDateUpdateForChecked) => {
  console.log("checkedRowPks: ", checkedRowPks);

  return instance
    .put(
      "project_progress/update-task-due-date-for-checked",
      {
        duration_option,
        checkedRowPks,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForDeleteTasksForChecked = (checkedRowPks: number[]) => {
  console.log("study_note_pk , selectedButtonsData : ", checkedRowPks);

  return instance
    .delete("project_progress/delete-for-checked", {
      data: checkedRowPks, // [1,2,3,5]
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const updateCashPrizeForTask = ({
  taskPk,
  cash_prize_for_update,
}: any) => {
  // console.log("updateProjectImportance 실행 check");
  console.log("updateCashPrizeForTask 실행 check");

  return instance
    .put(
      `/project_progress/${taskPk}/cash_prize/update`,
      {
        cash_prize_for_update: cash_prize_for_update,
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

export const update_task_for_is_task_for_cash_prize = (taskPk: string) => {
  console.log("update_task_for_is_task_for_cash_prize 실행 check");

  return instance
    .put(
      `/project_progress/${taskPk}/is_task_for_cash_prize/update`,
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

export const update_task_for_is_task_for_urgent = (taskPk: string) => {
  console.log("update_task_for_is_task_for_urgent 실행");

  return instance
    .put(
      `/project_progress/${taskPk}/is_task_for_urgent/update`,
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

// data_for_completed_tasks_for_pie_chart
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

// CommentForTaskView;
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
      return response.data;
    });
};

// UpdateViewForCommentEdit
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
      return response.data;
    });
};

export const updateChallengerListByTaskPkApi = (testPk: string | number) => {
  console.log("updateProjectTaskCompleted 실행 check");

  return instance
    .put(
      `/project_progress/${testPk}/challengers-for-cash-prize/update`,
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
      `/project_progress/extra_tasks/${taskPk}/update-extrak-task-prgoress-status`,
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
  cash_prize,
  is_urgent_request,
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
    due_date, // string or undefined
    cash_prize,
    is_urgent_request
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
    due_date,
    cash_prize,
    is_urgent_request
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
        cash_prize,
        is_urgent_request,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

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
      return response.data;
    });
};

export const apiForUpdateScoreByTester = ({
  id,
  scoreByTesterForUpdate,
  cashInfoForUpdate,
  username,
}: any) => {
  console.log(
    "parameter check for apiForUpdateScoreByTester : ",
    id,
    scoreByTesterForUpdate,
    cashInfoForUpdate,
    username
  );

  return instance
    .put(
      `/project_progress/${id}/score-update-by-tester`,
      {
        score_by_tester: scoreByTesterForUpdate,
        cashInfoForUpdate,
        username: username,
      },
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

export const apiForUpdateTaskManagerForCheckedTasks = ({
  checkedRowPks,
  selectedManagerPk,
}: typeForParameterForUpdateTaskMangerForChecked) => {
  console.log(checkedRowPks, selectedManagerPk);

  return instance
    .put(
      "/project_progress/update-task-manager-for-checked",
      { checkedRowPks, task_manager: selectedManagerPk },
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

export const apiForUpdateTaskClassificationForChecked = ({
  checkedRowPks,
  task_classification,
}: typeForParameterForUpdateTaskClassificationForChecked) => {
  console.log(checkedRowPks, task_classification);

  return instance
    .put(
      // "/project_progress/update-task-importance-for-checked",
      "/project_progress/update-task-clasification-for-checked",
      { checkedRowPks, task_classification: task_classification },
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

// apiForUpdateCoWriterIsTaskingForNote
export const apiForUpdateTaskImportanceForChecked = ({
  checkedRowPks,
  importance,
}: typeForParameterForUpdateTaskImportanceForChecked) => {
  console.log(checkedRowPks, importance);

  return instance
    .put(
      "/project_progress/update-task-importance-for-checked",
      { checkedRowPks, importance: importance },
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

export const api_for_update_check_for_cash_prize = ({
  taskPk,
  taskMangerPk,
  cash_prize,
}: any) => {
  return instance
    .put(
      `/project_progress/${taskPk}/check_for_cash_prize/update`,
      { taskMangerPk, cash_prize },
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

export const apiForUpdateTaskCheckResultByTester = (taskPk: string) => {
  return instance
    .put(
      `/project_progress/${taskPk}/check-result/update`,
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
  task_classification,
  due_date_option,
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
        task_classification,
        due_date_option,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getCompletedTaskList = ({ queryKey }: QueryFunctionContext) => {
  const [
    _,
    pageNum,
    selectedPeriodOptionForUncompletedTaskList,
    username_for_search,
  ] = queryKey;
  // console.log("pageNum : ", pageNum);
  return instance
    .get("project_progress/completed", {
      params: {
        page: pageNum,
        selectedPeriodOptionForUncompletedTaskList,
        username_for_search,
      },
    })
    .then((response) => {
      const response_data = {
        ProjectProgressList: response.data.ProjectProgressList,
        totalPageCount: response.data.totalPageCount,
        task_number_for_one_page: response.data.task_number_for_one_page,
        writers_info: response.data.writers_info,
        count_for_ready: response.data.count_for_ready,
        count_for_in_progress: response.data.count_for_in_progress,
        count_for_in_testing: response.data.count_for_in_testing,
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
        task_number_for_one_page: response.data.task_number_for_one_page,
        ProjectProgressList: response.data.ProjectProgressList,
      };

      return response_data;
    });
};

export const getTasksWithCashPrize = ({ queryKey }: QueryFunctionContext) => {
  const [
    _,
    pageNum,
    selectedPeriodOptionForUncompletedTaskList,
    username_for_search,
  ] = queryKey;

  return instance
    .get("project_progress/tasks-with-cash-prize", {
      params: {
        page: pageNum,
        selectedPeriodOptionForUncompletedTaskList,
        username_for_search,
      },
    })
    .then((response) => {
      const response_data = {
        ProjectProgressList: response.data.ProjectProgressList,
        totalPageCount: response.data.totalPageCount,
        task_number_for_one_page: response.data.task_number_for_one_page,
        writers_info: response.data.writers_info,
        count_for_ready: response.data.count_for_ready,
        count_for_in_progress: response.data.count_for_in_progress,
        count_for_in_testing: response.data.count_for_in_testing,
      };

      return response_data;
    });
};

export const getUncompletedTaskList = ({ queryKey }: QueryFunctionContext) => {
  const [
    _,
    pageNum,
    selectedPeriodOptionForUncompletedTaskList,
    username_for_search,
    task_status_for_search,
    due_date_option_for_filtering,
    rating_for_filter_option,
    isForUrgent,
    checkForCashPrize,
    groupByOption,
    is_task_due_date_has_passed,
  ] = queryKey;

  return instance
    .get("project_progress/uncompleted", {
      params: {
        page: pageNum,
        selectedPeriodOptionForUncompletedTaskList,
        username_for_search,
        task_status_for_filter: task_status_for_search,
        due_date_option_for_filtering,
        rating_for_filter_option,
        isForUrgent,
        checkForCashPrize,
        groupByOption,
        is_task_due_date_has_passed,
      },
    })
    .then((response) => {
      const response_data = {
        ProjectProgressList: response.data.ProjectProgressList,
        totalPageCount: response.data.totalPageCount,
        task_number_for_one_page: response.data.task_number_for_one_page,
        writers_info: response.data.writers_info,
        count_for_ready: response.data.count_for_ready,
        count_for_in_progress: response.data.count_for_in_progress,
        count_for_in_testing: response.data.count_for_in_testing,
        total_task_count_for_today: response.data.total_task_count_for_today,
        completed_task_count_for_today:
          response.data.completed_task_count_for_today,
        achievement_rate_for_today: response.data.achievement_rate_for_today,
        count_for_duedate_passed: response.data.count_for_duedate_passed,
      };

      return response_data;
    });
};

export const getUncompletedTaskListForMe = ({
  queryKey,
}: QueryFunctionContext) => {
  // console.log("getProjectProgressList 요청 확인 at api");

  const [_, pageNum, task_status_for_search, due_date_option_for_filtering] =
    queryKey;
  console.log(
    "due_date_option_for_filtering : ",
    due_date_option_for_filtering
  );

  return instance
    .get(`project_progress/uncompleted/for-me?page=${pageNum}`, {
      params: {
        task_status_for_search,
        due_date_option_for_filtering,
      },
    })
    .then((response) => {
      console.log("api result for uncompleted task list: ", response);

      const response_data = {
        ProjectProgressList: response.data.ProjectProgressList,
        task_number_for_one_page: response.data.task_number_for_one_page,
        totalPageCount: response.data.totalPageCount,
        count_for_ready: response.data.count_for_ready,
        count_for_in_progress: response.data.count_for_in_progress,
        count_for_in_testing: response.data.count_for_in_testing,
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
      return response.data;
    });
};

export const deleteOneRefImageForExtraTask = (ref_image_pk: number) => {
  console.log("ref_image_pk : ", ref_image_pk);
  return instance
    .delete(`medias/ref-image-for-extra-task/${ref_image_pk}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

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
