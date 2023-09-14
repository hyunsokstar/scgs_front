import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {} from "../types/study_note_type";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/challenges`,
  withCredentials: true,
});

export const apiForGetChallengeList = ({ queryKey }: QueryFunctionContext) => {
  const [_, pageNum] = queryKey;

  return instance
    .get("", {
      params: { pageNum: pageNum },
    })
    .then((response) => {
      // response_data = {
      //   listForChallenge: serializer.data,
      //   totalCountForChallengeList: self.totalCountForChallengeList,
      //   perPage: self.perPage,
      // };

      console.log("response : ", response);

      return response.data;
    });
};
