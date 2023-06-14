export type type_for_insert_study_note = {
  title: string;
  description: string;
};

export interface DataForStudyNoteContent {
  pk: number;
  title: string;
  file_name: string | null;
  content: string;
  writer: number | null;
  created_at: string;
  page: number;
  order: number;
}

// export interface CoWriter {
//   username: string;
//   is_approved: boolean;
// }

export interface StudyNoteData {
  note_title: string;
  note_user_name: string;
  exist_page_numbers: number[];
  data_for_study_note_contents: DataForStudyNoteContent[];
  co_writers_for_approved: String[];
}

export interface type_for_parameter_for_delete_pages_for_study_note {
  study_note_pk: string | undefined;
  pageNumbersToEdit: number[];
}

export interface StudyNoteContentFormData {
  title: string;
  file: string;
  content: string;
  study_note_pk: number | string | undefined;
  current_page_number: number | string | undefined;
}

export interface parameterForSearchContentListForStudynote {
  study_note_pk: string | undefined;
  searchTerm: string;
}

export interface type_for_content_list_from_search_result {
  pk: number;
  title: string;
  content: string;
  order: number;
  page: number;
  file_name: string;
  created_at: string;
}

export interface ListItemPropsForContentOrdering {
  order: number;
  title: string;
  content_pk: number;
}

export interface ListPropsForContentOrdering {
  study_note_pk: string | undefined;
  currentPage: number;
  items: any;
}

export interface NoteWriterType {
  pk: number;
  username: string;
  profile_image: string;
}

export interface TypeForNoteCoWriter {
  id: number;
  writer: NoteWriterType;
  study_note: number;
  is_approved: boolean;
  created_at: string;
}

// export type type_for_study_note_list_row = {
//   pk: number;
//   title: string;
//   description: string;
//   writer: Writer;
//   studyNoteListRefatch?: () => void;
// };

export interface TypeForNote {
  pk: number;
  title: string;
  description: string;
  writer: NoteWriterType;
  note_cowriters: TypeForNoteCoWriter[];
  count_for_note_contents: number;
}

export interface TypeForNoteList {
  noteList: TypeForNote[];
  totalPageCount: number;
  note_count_per_page: number;
}

export interface typeForParameterForApiForCopySelectedNotesToMyNote {
  selectedRowPksFromOriginalTable: number[];
}
