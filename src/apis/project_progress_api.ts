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
// apiForGetTaskLogList
// http://127.0.0.1:8000/api/v1/project_progress/task-log
export const apiForGetTaskLogList = async ({
  queryKey,
}: QueryFunctionContext): Promise<any> => {
  const [_, pageNum] = queryKey;
  const data = await instance
    .get(`project_progress/task-log?page=${pageNum}`)
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

export const apiForgetTaskStatusForToday = () => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: "project_progress/task-status-view-for-today",
    params: {},
  };

  return instance.request(config).then((response) => {
    console.log("response for getProgectTasksStatusData: ", response);
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
}: QueryFunctionContext) => {
  const [_, checkedRowPks] = queryKey;
  // console.log("체크 pks for task list : ", checkedRowPks);

  return instance
    .get("project_progress/task-list-for-checked", {
      params: {
        checkedRowPks, // 이름이 동일하게 맞춰짐
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
      // console.log("response : ", response);
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
      // console.log("response : ", response);
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
      // console.log("response : ", response);
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

export const apiForUpdateScoreByTester = ({
  pk,
  scoreByTesterForUpdate,
}: any) => {
  console.log(
    "parameter check for apiForUpdateScoreByTester : ",
    pk,
    scoreByTesterForUpdate
  );

  return instance
    .put(
      `/project_progress/${pk}/score-by-tester/update`,
      { score_by_tester: scoreByTesterForUpdate },
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
      // console.log("response : ", response);
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
  ] = queryKey;

  return instance
    .get("project_progress/uncompleted", {
      params: {
        page: pageNum,
        selectedPeriodOptionForUncompletedTaskList,
        username_for_search,
        task_status_for_search,
        due_date_option_for_filtering,
        rating_for_filter_option,
        isForUrgent,
        checkForCashPrize,
        groupByOption,
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
