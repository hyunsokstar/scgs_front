export type ITechNote = {
  pk: number;
  author: string | null;
  title: string;
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
  tech_note_description?: string;
  category_option?: string;
};

export interface TechNoteContentRowType {
  tech_note: number;
  title: string;
  file: string;
  content: string;
  created_at: string;
}

export interface TechNoteContentListType {
  success: string;
  data: TechNoteContentRowType[];
}
