// export interface Writer {
//   pk: number;
//   username: string;
//   profile_image: string;
// }

// export interface Tag {
//   id: number;
//   name: string;
// }

// export interface Shortcut {
//   id: number;
//   writer: Writer;
//   shortcut: string;
//   description: string | null;
//   classification: "front" | "back";
//   tags: Tag[];
// }

// export interface ShortcutListResponse {
//   success: boolean;
//   shortcut_list: Shortcut[];
// }

export interface Writer {
  pk: number;
  username: string;
  profile_image: any;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Shortcut {
  id: number;
  writer: Writer;
  shortcut: string;
  description: string;
  classification: string;
  tags: Tag[];
  related_shortcut_count?: number;
}

export interface ShortcutsResponse {
  totalCount: number;
  shortcut_list: Shortcut[];
}

export interface TypeForInsertToShortcutApi {
  shortcut: string;
  description: string;
  classification: string;
  tags: string[];
}

export interface TypeForUpdateFormForShortcut {
  shortcutId: number;
  shortcut: string;
  description: string;
  classification: string;
  tags: string[];
}

type WriterType = {
  pk: number;
  username: string;
  profile_image: string;
};

export type RelatedShortcutType = {
  id: number;
  shortcut_content: string;
  description: string;
  created_at: string;
  shortcut: number;
};

export type OriginalShortcutType = {
  id: number;
  writer: WriterType;
  shortcut: string;
  description: string;
  classification: string;
  tags: string[];
  related_shortcut_count: number;
};

export type ResponseTypeForApiForRelatedShortCutList = {
  data_for_original_shortcut: OriginalShortcutType;
  data_for_related_shortcut?: RelatedShortcutType[];
};
