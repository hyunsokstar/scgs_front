// task_completed update
import { Switch, SwitchProps } from "@chakra-ui/react";

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
  task_url1: string;
  task_url2: string;
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
  id?: any;
  pk: number | string;
  test_description: string;
  test_passed: boolean;
  test_method?: string;
  test_result_image?: string;
  testers_for_test_for_extra_task?: any;
  testers_for_test?: any;
  test_result_images: TestResultImage[];
  refetch: () => void;
};

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

export type TypeForTaskUrl = {
  id: number;
  task: number;
  task_url: string;
  task_description: string;
};

export interface IOneTaskForProjectTaskType {
  pk: number;
  writer: string;
  task_manager: { pk: number; username: string; profile_image: string };
  task: string;

  in_progress: boolean;
  is_testing: boolean;
  task_completed: boolean;
  current_status: string;

  task_description: string;
  importance: number;
  started_at: string;
  due_date: string;
  started_at_formatted: string;
  elapsed_time_from_started_at: string;
  cash_prize: number;
  is_urgent_request: boolean;
  time_left_to_due_date: string;
  task_images: [
    {
      pk: number;
      image_url: string;
    }
  ];
  due_date_formatted: string;
  test_result_images: TestResultImage[];
  extra_tasks?: extra_task_row_type[] | undefined;
  tests_for_tasks: ItypeFortestRow[];
  task_comments: ITaskComment[];
  task_urls: TypeForTaskUrl[];
}

interface Writer {
  username: string;
  profile_image: string | null;
  task_count: number;
  cash: number;
}

export interface IUncompletedTaskListForCashPrize {
  projectTaskListRefatch?: () => void;
  writers_info?: Writer[];
  totalPageCount: number;
  task_number_for_one_page?: number;
  score_by_tester?: number;
  ProjectProgressList: [
    {
      pk: number;
      task: string;
      task_manager: {
        pk: number;
        username: string;
        profile_image: string;
      };
      writer: string;
      current_status: string;
      is_task_for_cash_prize: boolean;
      task_completed: boolean;
      challegers_for_cach_prize: any[]; // 도전자 정보를 담을 배열
      cash_prize: number;
      check_for_cash_prize: boolean;
    }
  ];
  currentPageNum?: number | undefined;
  setCurrentPageNum?: any;
  count_for_ready?: number;
  count_for_in_progress?: number;
  count_for_in_testing?: number;
}

export interface taskRowForUncompleted {
  score_by_tester?: number;
  id: string;
  writer?: string;
  task_manager: {
    pk: number;
    username: string;
    profile_image: string;
  };
  task_classification: string;
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
  current_status?: string;
  check_result_by_tester: boolean;
  is_task_for_cash_prize: boolean;
  is_task_for_urgent: boolean;
  cash_prize?: number;
}

export interface ITypeForProjectProgressList {
  projectTaskListRefatch?: () => void;
  writers_info?: Writer[];
  totalPageCount: number;
  task_number_for_one_page?: number;
  score_by_tester?: number;
  ProjectProgressList: taskRowForUncompleted[] | any[];
  currentPageNum?: number | undefined;
  setCurrentPageNum?: any;
  count_for_ready?: number;
  count_for_in_progress?: number;
  count_for_in_testing?: number;
  total_task_count_for_today?: number;
  completed_task_count_for_today?: number;
  achievement_rate_for_today?: number;
  checkedRowPks?: any;
  setCheckedRowPks?: any;
  handleCheckboxChange?: any;
}

export interface IFormTypeForProjectProgress {
  task: string;
  writer: string;
  importance: string;
  task_completed: boolean;
  password: string;
  task_manager: number;
  task_classification: string;
  due_date?: string;
  due_date_option?: string;
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
  cash_prize?: number;
  is_urgent_request?: boolean;
}

export interface ITypeForTaskDetailUpdateForm {
  writer: string;
  task: string;
  task_description: string;
  importance: string;
  task_completed: boolean;
  cash_prize: number;
  is_urgent_request: boolean;
  // task_urls: { task_url: string }[];
}

export interface IUserNamesForSelectOption {
  pk: number;
  username: string;
}

export interface IOptionForTaskStatus {
  dateRange: string;
  taskManagerForFiltering: string | number;
  importance: number;
  isRequestedForHelp: boolean;
  isBountyTask: boolean;
}

export type DeadlineOption = "" | "deadlineSoon" | "deadlinePassed";

export interface SwitchButtonForFilterOptionForWhetherToHelpRequestProps
  extends Omit<SwitchProps, "onChange"> {
  isChecked: boolean;
  onToggle: (isChecked: boolean) => void;
}

export type ManagerData = {
  task_manager: string;
  completed_count_for_task: number;
  count_for_testing_task: number;
  uncompleted_count_for_task: number;
  total_count_for_uncompleted_task: number;
  total_count_for_completed_task: number;
  total_count_for_task: number;
};

export type TaskCountForMonth = {
  name: string;
  completedCount: number;
};

export type TaskStaticsResponse = {
  managers: ManagerData[];
  task_count_for_month: TaskCountForMonth[];
};

export interface PieDataForUncompletedTask {
  name: string;
  value: number;
}

export interface TaskManager {
  pk: number;
  username: string;
}

export interface ProjectProgress {
  pk: number;
  task: string;
  task_description: string;
  writer: string;
  task_manager: TaskManager;
  importance: number;
  in_progress: boolean;
  is_testing: boolean;
  task_completed: boolean;
  current_status: string;
  started_at: string;
  due_date: string | null;
  started_at_formatted: string;
  completed_at_formatted: string;
  due_date_formatted: string;
  elapsed_time_from_started_at: string;
  time_consumed_from_start_to_complete: string;
  time_left_to_due_date: string | null;
  check_result_by_tester: boolean;
  score_by_tester: number;
  is_task_for_cash_prize: boolean;
  cash_prize: number;
  task_urls?: TypeForTaskUrl[];
  task_comments: ITaskComment[];
  tests_for_tasks: ItypeFortestRow[];
  extra_tasks?: extra_task_row_type[];
}

// 0612 fix
export interface typeForTaskListForChecked {
  total_count: number;
  ProjectProgressList: IOneTaskForProjectTaskType[];
}

export interface typeForParameterForUpdateTaskMangerForChecked {
  checkedRowPks: number[];
  selectedManagerPk: number;
}

export interface typeForParameterForUpdateTaskImportanceForChecked {
  checkedRowPks: number[];
  importance: number;
}

export interface typeForParameterForUpdateTaskClassificationForChecked {
  checkedRowPks: number[];
  task_classification: string;
}

export interface typeForDueDateUpdateForChecked {
  duration_option:
    | "undetermined"
    | "noon"
    | "evening"
    | "tomorrow"
    | "night"
    | "day-after-tomorrow"
    | "this-week"
    | "this-month";
  checkedRowPks: number[];
}

export interface TaskForTaskStatusForToday {
  id: string;
  task: string;
  in_progress: boolean;
  is_testing: boolean;
  order: number;
  task_manager: TaskManager;
  task_completed: boolean;
  current_status: string;
  is_urgent_request: boolean;
  is_task_for_cash_prize: boolean;
  due_date: string;
}

export interface TaskManager {
  pk: number;
  username: string;
  profile_image: string;
}

export type TaskManagerData = {
  task_manager: string;
  uncompleted_count: number;
  completed_count: number;
};

export interface ITypeForTaskStatusForToday {
  toal_task_count_for_today: number;
  progress_rate: number;
  task_count_for_uncompleted_task_until_yesterday: number;
  task_count_for_ready: number;
  task_count_for_in_progress: number;
  task_count_for_testing: number;
  task_count_for_completed: number;
  morning_tasks: TaskForTaskStatusForToday[] | any | undefined;
  afternoon_tasks: TaskForTaskStatusForToday[] | any | undefined;
  night_tasks: TaskForTaskStatusForToday[] | any | undefined;
  task_count_for_weekdays: TaskCountForWeekdays;
  today_info: TodayInfo;
  task_managers_data: TaskManagerData[];
}

export interface WriterForTaskLog {
  pk: number;
  username: string;
  profile_image: string;
}

export interface TypeForTaskLog {
  id: number;
  writer: WriterForTaskLog;
  taskPk: number;
  task: string;
  completed_at: string;
  completed_at_formatted: string;

  time_distance_from_before_task: number;
  time_distance_from_before_my_task: number;

  interval_between_team_task: string | null;
  interval_between_my_task: string | null;
  time_distance_for_team_task: number;
  time_distance_for_my_task: number;
}

interface WriterData {
  writer: string;
  count: number;
}

interface TaskCountForWeekdays {
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
  Sunday: number;
}

interface TodayInfo {
  date: string;
  dayOfWeek: string;
}

export interface ResponseDataForTaskLog {
  TaskLog: TypeForTaskLog[];
  writers: WriterData[];
  total_today_task_count: number;
  total_today_completed_task_count: number;
  total_today_uncompleted_task_count: number;
  average_number_per_hour: number;
  elapsed_time: string;
  task_count_for_weekdays: TaskCountForWeekdays;
  today_info: TodayInfo;
}

export interface ExtraTaskDetailInfo {
  pk: number;
  task_manager: {
    pk: number;
    username: string;
    profile_image: string;
  };
  task: string;
  task_urls: string[];
  task_url1: string;
  task_url2: string;
  task_status: string;
  importance: number;
  started_at: string;
  completed_at: string | null;
  started_at_formatted: string;
}

export interface DetailForExtraTaskProps {
  extraTaskDetail: ExtraTaskDetailInfo;
}

export type typeForDueDateOption =
  | "undecided"
  | "until-yesterday"
  | "until-noon"
  | "until-evening"
  | "until-tomorrow"
  | "until-the-day-after-tomorrow"
  | "until-this-week"
  | "until-this-month";

export interface Task {
  id: number;
  task: string;
  in_progress: boolean;
  is_testing: boolean;
  order: number;
  task_manager: {
    pk: number;
    username: string;
    profile_image: string | null;
  };
  task_completed: boolean;
  current_status: string;
  is_urgent_request: boolean;
  is_task_for_cash_prize: boolean;
  due_date: string;
}

export interface IPropsForCardForTodayTaskListBySlide {
  title: "until-noon" | "until-evening" | "until-night";
  todos: Task[];
}
