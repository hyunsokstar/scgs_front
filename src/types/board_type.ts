// 1122
export interface ITypeForFaqRow {
  id: number;
  title: string;
  content: string;
  writer: {
    pk: number;
    username: string;
    profile_image: any;
  };
  created_at_formatted: string;
  updated_at_formatted: string;
}

export interface ITypeForDataForFaq {
  listForFaqBoard: ITypeForFaqRow[];
  totalCountForFaqBoard: number;
  perPage: number;
}

export interface Writer {
  pk: number;
  username: string;
  profile_image: any;
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
      profile_image: any;
    };
    content: string;
    created_at: string;
  }>;
}
