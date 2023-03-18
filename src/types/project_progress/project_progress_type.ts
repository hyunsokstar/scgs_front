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
  started_at_formatted: string;
  elapsed_time_from_started_at: string;
}

export interface ITypeForProjectProgressList {
  projectTaskListRefatch?: () => void;
  totalPageCount: number;
  ProjectProgressList: [
    {
      pk: string;
      writer: string;
      task: string;
      task_completed: boolean;
      importance: number;
      started_at: string;
      started_at_formatted: string;
      due_date_formatted: string;
      elapsed_time_from_started_at: string;
      time_left_to_due_date?: string;
      due_date?: string;
    }
  ];
  currentPageNum?: number | undefined;
  setCurrentPageNum?: any;
}

export interface IFormTypeForProjectProgress {
  task: string;
  writer: string;
  importance: string;
  task_completed: boolean;
  password: string;
}
