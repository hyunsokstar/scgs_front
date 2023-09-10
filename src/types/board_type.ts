export interface Writer {
    pk: number;
    username: string;
    profile_image: string | null;
  }
  
  export interface TypeForSuggestionsForBoard {
    id: number;
    title: string;
    content: string;
    writer: Writer;
    created_at_formatted: string;
    updated_at_formatted: string;
  }
  
  
  