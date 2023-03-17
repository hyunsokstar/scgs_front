interface Row {
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
  position: number;

  selected?: boolean;
  is_new_row?: boolean;
  profile_image?: string;
}