import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {} from "../types/study_note_type";
import {
  ITypeForCreateChallengeParameter,
  ITypeForEvaluationCriteriaRow,
} from "../types/type_for_challenge";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/challenges`,
  withCredentials: true,
});
// 1122
export const apiForWithDrawlForChallenge = (challengeId: number | string) => {
  return instance
    .delete(`${challengeId}/withdrawl`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// apiForRegisterForChallenge
export const apiForRegisterForChallenge = ({ challengeId }: any) =>
  instance
    .post(
      `/${challengeId}/register`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const apiForGetDetailForChallenge = ({
  queryKey,
}: QueryFunctionContext) => {
  const [_, challengeId] = queryKey;

  return instance.get(`${challengeId}/detail`, {}).then((response) => {
    // response_data = {
    //   listForChallenge: serializer.data,
    //   totalCountForChallengeList: self.totalCountForChallengeList,
    //   perPage: self.perPage,
    // };

    return response.data;
  });
};

interface IParameterTypeForSaveEvalutationCriteria {
  challengeId: number | string;
  RowsDataForSave: ITypeForEvaluationCriteriaRow[];
}

export const apiForCreateEvaluateCriteriaForChallenge = ({
  challengeId,
  RowsDataForSave,
}: any) => {
  console.log("challengeId : ", challengeId);
  console.log("rowsDataForChallenge for save: ", RowsDataForSave);

  return instance
    .post(
      `${challengeId}/evaluation-criteria/save`,
      {
        RowsDataForSave,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => {
      console.log("response.data at api", response.data);

      return response.data;
    });
};

export const apiForCreateChallenge = ({
  title,
  subtitle,
  description,
  main_image,
}: ITypeForCreateChallengeParameter) => {
  console.log("api for create challenge main image check !!");
  console.log("Title:", title);
  console.log("Subtitle:", subtitle);
  console.log("Description:", description);
  console.log("Main Image:", main_image);

  return instance
    .post(
      `create`,
      {
        title,
        subtitle,
        description,
        main_image,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => {
      console.log("response.data api: ", response.data);

      return response.data;
    });
};

export const apiForUpdateChallengeMainImage = ({ challengeId, file }: any) => {
  console.log("api for create challenge main image check !!");

  return instance
    .put(
      `${challengeId}/update/main_image`,
      { image_to_update: file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => {
      console.log("response.data api: ", response.data);

      return response.data;
    });
};

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

      return response.data;
    });
};
