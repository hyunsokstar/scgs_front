interface Author {
  pk: number;
  username: string;
  profile_image: string;
}

export type ITechNote = {
  pk: number;
  task: number;
  author: Author | null;
  title: string;
  note_content_count: number;
  category: string;
  like_count: number;
  view_count: number;
  created_at: string;
};

export type ITechNoteListResponse = {
  total_count_for_tech_note_table_rows: number;
  tech_note_list_for_page: ITechNote[];
};

// IUpdateFormTypeForTechNoteInfo
export type IUpdateFormTypeForTechNoteInfo = {
  techNotePk: number;
  tech_note_description?: string;
  category_option?: string;
};

export type IFormTypeForCreateTechNoteList = {
  taskPk?: string | number
  tech_note_description?: string;
  category_option?: string;
};

export interface TechNoteContentRowType {
  pk: number;
  tech_note: number;
  note_content_title: string;
  note_content_file: string;
  note_content_content: string;
  created_at: string;
}

export interface TechNoteContentListType {
  success: string;
  tech_note_title: string;
  data: TechNoteContentRowType[];
}

export interface ITypeForCreateTechNoteContent {
  note_content_fk: string | number | undefined;
  note_content_title: string;
  note_content_file: string;
  note_content_content: string;
}
