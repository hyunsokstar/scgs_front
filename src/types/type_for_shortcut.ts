
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

export type formTypeForCreateRelatedShortcut = {
  shortcutId: number;
  shortcut_content: string;
  description: string;
};

export type rowTypeForShortCutHubList = {
  id: number;
  title: string;
  description: string;
  writer: WriterType;
  total_count_for_shortcut_hub_contents: number;
  created_at: string;
}

export interface IRowForTag {
  id: number;
  name: string;
}


export interface IRowForShortCutList {
  id: number;
  writer: Writer;
  description: string;
  classification: string;
  tags: IRowForTag[]
  related_shortcut_count: number
}

export interface IRowForShortCutHubContentList {
  id: number;
  shortcut: IRowForShortCutList;
  shortcut_hub: number;
  writer: number;
  order: number
  created_at: string;
}

export type ITypeForDataForShortCutHub = {
  listForShortCutHub: rowTypeForShortCutHubList[]
  totalCountForShortCutHub: number;
  perPageForShortCutHub: number;
}

// dataForShortCutHubContent
export interface IDataTypeForShortCutHubContent {
  listForShortCutHubContent: IRowForShortCutHubContentList[];
  perPageForShortCutHubContent: number;
  totalCountForShortCutHubContent: number;
}