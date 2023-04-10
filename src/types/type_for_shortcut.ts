export interface Writer {
  pk: number;
  username: string;
  profile_image: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Shortcut {
  id: number;
  writer: Writer;
  shortcut: string;
  description: string | null;
  classification: "front" | "back";
  tags: Tag[];
}

export interface ShortcutListResponse {
  success: boolean;
  shortcut_list: Shortcut[];
}

export interface TypeForInsertToShortcutApi {
  shortcut: string;
  description: string;
  classification: string;
}
