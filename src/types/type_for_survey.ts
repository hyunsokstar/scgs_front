export interface ISurvey {
    id: number;
    title: string;
    description: string;
    writer: {
      pk: number;
      username: string;
      profile_image: string;
    } | null;
    created_at: string;
  }