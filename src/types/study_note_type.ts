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

// export interface type_for_study_note_content {
//   pk: number;
//   title: string;
//   file_name: string | null;
//   content: string;
//   writer: number | null;
//   created_at: string;
// }

export interface DataForStudyNoteContent {
  pk: number;
  title: string;
  file_name: string | null;
  content: string;
  writer: number | null;
  created_at: string;
  page: number;
}

export interface StudyNoteData {
  exist_page_numbers: number[];
  data_for_study_note_contents: DataForStudyNoteContent[];
}

export interface type_for_parameter_for_delete_pages_for_study_note {
  study_note_pk: string | undefined;
  selectedButtonsData: number[];
}