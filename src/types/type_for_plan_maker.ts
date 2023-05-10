export type Writer = {
  pk: number;
  username: string;
  profile_image: string;
};

export type row_for_long_term_plan = {
  pk: number;
  title: string;
  description: string;
  category: "project" | "study";
  writer: Writer;
  created_at?: string; // ISO 8601 format
};

export type list_for_long_term_plan = row_for_long_term_plan[];

export interface formTypeForCreatePlan {
  title: string;
  description: string;
  category: "project" | "study" | "event";
}

export type LongTermPlanContent = {
  id: number;
  start: string;
  end: string;
  name: string;
  progress: number;
  displayOrder: number;
  dependencies?: string;
  long_term_plan?: number;
  selected?: boolean;
  [key: string]: any; // 인덱스 서명 추가
};
export type LongTermPlanContentList = LongTermPlanContent[];


