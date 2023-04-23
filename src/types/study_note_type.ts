interface Writer {
    pk: number;
    username: string | null;
    profile_image: string;
  }

export type type_for_study_note_list_row = {
    pk: number;
    title: string;
    description: string;
    writer: Writer;
};