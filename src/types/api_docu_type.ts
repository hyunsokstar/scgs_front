import { AxiosResponse } from "axios";

interface IWriter {
  pk: number;
  username: string;
  profile_image: string;
}

export interface type_for_docu_list_row {
  id: number;
  writer: IWriter;
  url: string;
  description: string;
  classification: string;
}

export interface type_for_api_for_api_docu_list {
  success: boolean;
  totalCount: number;
  api_docu_list: type_for_docu_list_row[];
}

export interface TypeForInsertToApiDocuApi {
  url: string;
  description: string;
  classification: string;
}
