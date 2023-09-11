export interface Writer {
  pk: number;
  username: string;
  profile_image: string | null;
}

export interface TypeForSuggestionRow {
  id: number;
  title: string;
  content: string;
  writer: Writer;
  created_at_formatted: string;
  updated_at_formatted: string;
}

export interface ITypeForDataForSuggestions {
  listForSuggestion: TypeForSuggestionRow[];
  totalCountForSuggestionList: number;
  perPage: number;
}

export interface ITypeForCommentListForSuggestionForBoard {
  comments: Array<{
    id: number;
    writer: {
      pk: number;
      username: string;
      profile_image: string | null;
    };
    content: string;
    created_at: string;
  }>;
}
