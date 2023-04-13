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