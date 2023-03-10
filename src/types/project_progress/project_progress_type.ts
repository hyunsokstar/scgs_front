// export interface ITypeForProjectProgressList {
//     pk: string;
//     writer: string;
//     task: string;
//     task_status: string;
//     importance: string;
// }

export interface ITypeForProjectProgressList {
    totalPageCount: number;
    ProjectProgressList: [
        {
            pk: string;
            writer: string;
            task: string;
            task_status: string;
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
    task_status: string;
    password: string;
}
