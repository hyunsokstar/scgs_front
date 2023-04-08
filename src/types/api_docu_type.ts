import { AxiosResponse } from "axios";

export interface type_for_docu_list_row {
  id: number;
  url: string;
  description: string;
  classification: string;
}

export interface type_for_api_for_api_docu_list {
  success: boolean;
  api_docu_list: type_for_docu_list_row[];
}
