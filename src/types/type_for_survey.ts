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
  count_for_1th_option: number; // 추가
  count_for_2th_option: number; // 추가
  count_for_3th_option: number; // 추가
  count_for_4th_option: number; // 추가
  count_for_5th_option: number; // 추가
}

export interface ISurveyOption {
  id: number;       // 옵션의 고유 ID
  content: string; // 옵션의 내용 또는 텍스트
  survey: number;  // 옵션이 속한 설문 조사의 ID
}



  