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
  position: string;

  selected?: boolean;
  is_new_row?: boolean;
  profile_image?: string;
}
