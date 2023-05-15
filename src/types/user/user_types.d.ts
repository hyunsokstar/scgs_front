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
