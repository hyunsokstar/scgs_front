// task_completed update

export interface FormTypeForCreateCommentForTask {
  taskPk: string | number;
  comment: string;
}

export interface FormTypeForCreateTest {
  taskPk?: number | string | undefined;
  test_description: string;
  test_method: "browser" | "postman" | "test_code";
  test_passed: boolean;
}

export interface FormTypeForExtraTask {
  taskPk?: string | number | undefined;
  task_manager: number;
  task: string;
  importance: string;
}

export interface extra_task_row_type {
  pk: number;
  task: string;
  task_status: string;
  task_manager: {
    pk: number;
    username: string;
    profile_image: string;
  };
  importance: string;
  started_at: string;
  completed_at: string;
  started_at_formatted?: string;
}

export interface ITypeForTestsForTask {
  pk: number;
  task: string;
  task_status: string;
  task_manager: {
    pk: number;
    username: string;
    profile_image: string;
  };
  importance: string;
  started_at: string;
  completed_at: string;
  started_at_formatted?: string;
}

export interface IResponseTypeForProjectTaskUpdate {
  result: {
    success: boolean;
    message: string;
  };
}

export type ItypeFortestRow = {
  pk: number | string;
  test_description: string;
  test_passed: boolean;
  test_method?: string;
  test_result_image?: string;
  testers_for_test?: any;
  test_result_images: TestResultImage[];
};

// export type type_for_row_for_testers{

// }

interface IWriter {
  pk: number;
  username: string;
  profile_image: string;
}

export interface ITaskComment {
  id: number;
  task: number;
  writer: IWriter;
  comment: string;
  like_count: number;
  created_at: string;
  created_at_formatted: string;
  is_edit_mode: boolean;
}

export default interface TestResultImage {
  pk: number;
  image_url: string;
}

export interface IOneTaskForProjectTaskType {
  pk: string;
  writer: string;
  task_manager?: { pk: number; username: string; profile_image: string };
  task: string;
  task_description: string;
  task_completed: boolean;
  importance: number;
  started_at: string;
  due_date: string;
  started_at_formatted: string;
  elapsed_time_from_started_at: string;
  task_images: [
    {
      pk: number;
      task: number;
      image_url: string;
    }
  ];
  test_result_images: TestResultImage[];
  extra_tasks?: extra_task_row_type[] | undefined;
  tests_for_tasks: ItypeFortestRow[];
  task_comments: ITaskComment[];
}

interface Writer {
  username: string;
  profile_image: string | null;
  task_count: number;
}

export interface ITypeForProjectProgressList {
  projectTaskListRefatch?: () => void;
  writers_info?: Writer[];
  totalPageCount: number;
  ProjectProgressList: [
    {
      pk: string;
      writer?: string;
      task_manager: {
        pk: number;
        username: string;
      };
      task: string;
      in_progress: boolean;
      is_testing: boolean;
      task_completed: boolean;
      importance: number;
      started_at: string;
      started_at_formatted: string;
      completed_at_formatted?: string;
      due_date_formatted: string;
      elapsed_time_from_started_at: string;
      time_consumed_from_start_to_complete?: string;
      time_left_to_due_date?: string;
      due_date?: string;
    }
  ];
  currentPageNum?: number | undefined;
  setCurrentPageNum?: any;
  count_for_ready?: number;
  count_for_in_progress?: number;
  count_for_in_testing?: number;
}

export interface IFormTypeForProjectProgress {
  task: string;
  writer: string;
  importance: string;
  task_completed: boolean;
  password: string;
  task_manager: number;
}

export interface ITypeForTaskDetailUpdate {
  taskPk?: string | undefined;
  writer: string;
  task: string;
  task_description: string;
  importance: string | number;
  task_completed: boolean;
  started_at?: string;
  due_date?: Date | undefined;
}

export interface ITypeForTaskDetailUpdateForm {
  writer: string;
  task: string;
  task_description: string;
  importance: string;
  task_completed: boolean;
}

export interface IUserNamesForSelectOption {
  pk: number;
  username: string;
}