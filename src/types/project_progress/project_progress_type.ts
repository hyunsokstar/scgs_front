// task_completed update
export interface IResponseTypeForProjectTaskUpdate {
  result: {
    success: boolean;
    message: string;
  };
}

export interface IOneTaskForProjectTaskType {
  pk: string;
  writer: string;
  task: string;
  task_completed: boolean;
  importance: number;
  started_at: string;
  due_date: string;
  task_manager?: { pk: number; username: string };
  started_at_formatted: string;
  elapsed_time_from_started_at: string;
  task_images: [
    {
      pk: number;
      task: number;
      image_url: string;
    }
  ];
}

export interface ITypeForProjectProgressList {
  projectTaskListRefatch?: () => void;
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
