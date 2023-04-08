import { AxiosResponse } from "axios";

export interface type_for_docu_list_row {
  id: number;
  classification: string;
  url: string;
  description: string;
}

export interface type_for_api_for_api_docu_list {
  success: boolean;
  data: type_for_docu_list_row[];
}

export type ApiDocuListResponse = Promise<
  AxiosResponse<type_for_api_for_api_docu_list>
>;