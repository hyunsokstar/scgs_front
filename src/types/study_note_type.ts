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
  title: string;
  file_name?: string | null;
  content: string;
  content_option: string;
  youtube_url?: string;
  writer: any;
  ref_url1: string;
  ref_url2: string;
  created_at: string;
  order: number;
}

export interface CoWriter {
  id: number;
  username: string;
  profile_image: string;
  is_tasking: boolean;
  current_page: number;
  task_description: string;
}

export interface StudyNoteData {
  note_title: string;
  subtitle_for_page: string;
  note_user_name: string;
  note_user_profile_image: string;
  exist_page_numbers: number[];
  data_for_study_note_contents: DataForStudyNoteContent[];
  co_writers_for_approved: CoWriter[];
  question_count_for_current_page: number;
  authority_for_writing_note_contents: boolean;
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
  total_count_for_comments: number;
  total_count_for_qna_board: number;
  total_count_for_subtitle: number;
  total_count_for_faq_list: number;
  total_count_for_class_list: number;
  total_count_for_suggestion_list: number;
  total_count_for_error_report_list: number;
}

export interface DataTyprForNoteList {
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
  profile_image: any;
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
  pk: number;
  study_note: number;
  writer: UserProfileImage;
  page: number;
  content: string;
  is_resolved: boolean;
  created_at_formatted: string;
  updated_at: string;
}

export interface RowTypeForRoadmapList {
  id: number;
  writer: UserProfileImage;
  title: string;
  sub_title: string;
}

export interface DataTypeForRoadMapList {
  listForRoadMap: RowTypeForRoadmapList[];
  totalCount: number;
  perPage: number;
}

export interface RowTypeForRoadMapContent {
  id: number;
  writer: UserProfileImage;
  study_note: TypeForNote;
}

export interface DataTypeForRoadMapContentList {
  road_map_contents: RowTypeForRoadMapContent[];
}

export interface TypeForBasicStudyNote {
  id: number;
  title: string;
  description: string;
  writer: UserProfileImage;
  created_at: string;
  first_category: string;
  second_category: string;
}

export interface RowTypeForRoadMapContentForRegister {
  id: number;
  writer: UserProfileImage;
  study_note: TypeForBasicStudyNote;
}

export interface DataTypeForRoadMapContentListForRegister {
  road_map_contents: RowTypeForRoadMapContentForRegister[];
}
