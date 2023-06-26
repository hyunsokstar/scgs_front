export interface ITypeForClassRoomRowForStudyNote {
  id: number;
  current_note: number;
  current_page: number;
  writer: {
    pk: number;
    username: string;
    profile_image: string;
  };
  is_approved: boolean;
  created_at_formatted: string;
}

export type type_for_insert_study_note = {
  title: string;
  description: string;
  first_category: string;
  second_category: string;
};

export interface DataForStudyNoteContent {
  pk: number;
  page: number;
  created_at: string;
  title: string;
  file_name?: string | null;
  content: string;
  content_option: string;
  writer: any;
  order: number;
  ref_url1: string;
  ref_url2: string;
  youtube_url?: string;
}

export interface CoWriter {
  pk: number;
  username: string;
  profile_image: string;
}

export interface StudyNoteData {
  note_title: string;
  note_user_name: string;
  exist_page_numbers: number[];
  note_user_profile_image: string;
  data_for_study_note_contents: DataForStudyNoteContent[];
  co_writers_for_approved: CoWriter[];
}

export interface type_for_parameter_for_delete_pages_for_study_note {
  study_note_pk: string | undefined;
  pageNumbersToEdit: number[];
}

export interface StudyNoteContentFormData {
  title: string;
  file: string;
  content: string;
  content_option: string;
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

export enum FirstCategory {
  FRONTEND = "frontend",
  BACKEND = "backend",
  CHALLENGE = "challenge",
  BOILER_PLATE = "boiler-plate",
}

export enum SecondCategory {
  TUTORIAL = "tutorial",
  FRAMEWORK = "framework",
  LIBRARY = "library",
  BOILER_PLATE = "boiler-plate",
  SAMPLE_CODE = "sample-code",
  CODE_REVIEW = "code-review",
  PROGRAMMING_LANGUAGE = "programming-language",
  CHALLENGE = "challenge",
}

export interface TypeForNote {
  pk: number;
  title: string;
  description: string;
  writer: NoteWriterType;
  note_cowriters: TypeForNoteCoWriter[];
  first_category: FirstCategory;
  second_category: SecondCategory;
  count_for_note_contents: number;
  count_for_note_comments: number;
  count_for_qna_boards: number;
  count_for_note_contents_for_subtitle: number;
  count_for_class_list: number;
}

export interface TypeForNoteList {
  noteList: TypeForNote[];
  totalPageCount: number;
  note_count_per_page: number;
  note_writers: string[];
}

export interface typeForParameterForApiForCopySelectedNotesToMyNote {
  selectedRowPksFromOriginalTable: number[];
}

export interface IFormTypeForCreateSubjectTitleForPage {
  content_option: string;
  study_note_pk: number | string | undefined;
  current_page_number: number | string | undefined;
  title: string;
  ref_url1: string;
  ref_url2: string;
  content: string;
  youtube_url?: string;
}

export interface IFormTypeForCreateYoutubeContentForNote {
  content_option: string;
  study_note_pk: number | string | undefined;
  current_page_number: number | string | undefined;
  title: string;
  youtube_url: string;
}

export interface ITypeForListForSubtitleListForNote {
  pk: number;
  page: number;
  title: string;
  file_name: string | null;
  content: string;
  content_option: string;
  ref_url1: string;
  ref_url2: string;
  youtube_url: string;
  writer: {
    pk: number;
    username: string;
    profile_image: string;
  };
  created_at: string;
  order: number;
}

export interface FormTypeForCreateCommentForNote {
  study_note_pk: any;
  comment: string;
}

export interface UserProfileImage {
  pk: number;
  username: string;
  profile_image: string | null;
}

export interface AnswerForQaBoard {
  pk: number;
  question: number;
  content: string;
  writer: UserProfileImage;
  created_at_formatted: string;
}

export interface QnARow {
  pk: string;
  study_note: number;
  title: string;
  content: string;
  page: number;
  writer: {
    pk: number;
    username: string;
    profile_image: null | string;
  };
  created_at_formatted: string;
  updated_at: string;
  answers_for_qa_board: AnswerForQaBoard[];
}

export interface ErrorReportForStudyNoteData {
  pk:number;
  study_note: number;
  writer: UserProfileImage;
  page: number;
  content: string;
  is_resolved: boolean;
  created_at_formatted: string;
  updated_at: string;
}