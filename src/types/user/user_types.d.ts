// {
//   "pk": 1,
//   "name": "",
//   "email": "terecal@daum.net",
//   "profileImages": [
//       {
//           "pk": 12,
//           "file": "https://imagedelivery.net/GDnsAXwwoW7vpBbDviU8VA/da247423-8dcd-4ae7-b7c1-ac44928b4c00/public"
//       }
//   ]
// }

export interface IUserProfile {
  pk: string;
  name: string;
  email: string;
  position: { pk: string; position_name: string };
  profileImages: [{ pk: string; file?: string }];
  about_me: string;
  skill_for_frameWork: [{ pk: number; frame_work_name: string }];
}

export interface IUserRow {
  pk: number;
  name: string;
  username: string;
  email: string;
  profileImages?: [
    {
      pk: number;
      file: string;
    }
  ];
  admin_level: number;
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  position?: any;
  selected?: boolean;
  is_new_row?: boolean;
  profile_image?: string;
}

export type TaskInfoPerUser = {
  username: string;
  profile_image: string | null;
  position: string | null;
  cash: number;
  total_count_for_task: number;
  total_count_for_task: number;
  uncompleted_count_for_task: number;
  completed_count_for_task: number;

  total_count_for_task_for_today: number;
  count_for_uncompleted_task_for_today: number;
  count_for_completed_task_for_today: number;

  task_in_progress: string;
};

export type TypeForDataForTaskInfoPerUser = User[];


export interface parameterTypeForCreateUserTaskComment {
  userPk: string | number | undefined;
  comment: string;
}

export interface Writer {
  pk: number;
  username: string;
  profile_image: string | null;
}

export interface UserTaskComment {
  id: number;
  writer: Writer;
  comment: string;
  like_count: number;
  created_at: string;
  created_at_formatted: string;
}

export interface UserInfo {
  id: number;
  username: string;
  profile_image: string;
  position: string | null;
  cash: number;
  total_count_for_task: number;
  uncompleted_count_for_task: number;
  completed_count_for_task: number;
  total_count_for_task_for_today: number;
  count_for_uncompleted_task_for_today: number;
  count_for_completed_task_for_today: number;
  task_in_progress: string;
  user_task_comments: UserTaskComment[];
}

export interface TaskManager {
  pk?: number;
  username: string;
}

export interface ProjectProgress {
  pk: number;
  task_classification: string;
  task: string;
  writer: string;
  task_manager: TaskManager;
  importance: number;
  in_progress: boolean;
  is_testing: boolean;
  task_completed: boolean;
  current_status: string;
  started_at: string;
  due_date: string;
  started_at_formatted: string;
  completed_at_formatted: string;
  due_date_formatted: string;
  elapsed_time_from_started_at: string;
  time_consumed_from_start_to_complete: string;
  time_left_to_due_date: string;
  check_result_by_tester: boolean;
  score_by_tester: number;
  is_task_for_cash_prize: boolean;
  is_task_for_urgent: boolean;
  cash_prize: number;
}

export type typeForUncompletedTaskListForPersonalTaskStatus = {
  user_info: UserInfo;
  ProjectProgressList: ProjectProgress[];
  task_number_for_one_page: number;
  totalPageCount: number;
  count_for_ready: number;
  count_for_in_progress: number;
  count_for_in_testing: number;
};