interface Writer {
  pk: number;
  username: string | null;
  profile_image: string;
}

export type type_for_study_note_list_row = {
  pk: number;
  title: string;
  description: string;
  writer: Writer;
};

export type type_for_insert_study_note = {
  title: string;
  description: string;
};

export interface type_for_study_note_content {
  pk: number;
  title: string;
  file_name: string | null;
  content: string;
  writer: number | null;
  created_at: string;
}

