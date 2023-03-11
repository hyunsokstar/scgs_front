
// task_completed update 
export interface IResponseTypeForProjectTaskUpdate {
    result: {
        success: boolean;
        message: string;
    }
}


export interface ITypeForProjectProgressList {
    pageProgressListRefatch?: () => void;
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
            elapsed_time_from_started_at: string;
        }
    ];
}

export interface IFormTypeForProjectProgress {
    task: string;
    writer: string;
    importance: string;
    task_completed: boolean;
    password: string;
}

