import axios, { AxiosResponse } from "axios";
import { backendApi } from "../apis/common_api";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";
import {} from "../types/study_note_type";
import {
  IParameterTypeForUpdateChallengeMetaInfo,
  IParameterTyperForApiForUpdateForEvaluateResultForChallenge,
  IPrameterForApiForCreateChallengeComment,
  ITypeForCreateChallengeParameter,
  ITypeForEvaluationCriteriaRow,
} from "../types/type_for_challenge";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/challenges`,
  withCredentials: true,
});

// 1122
export const apiForDeleteCommentForChallenge = (commentId: string | number) => {
  console.log("commentId : ", commentId);

  return instance
    .delete(`/challenge-comment/${commentId}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForCreateCommentForChallenge = ({
  challengeId,
  commentText,
  participant_username,
}: IPrameterForApiForCreateChallengeComment) => {
  return instance
    .post(
      `${challengeId}/challenge-comment/create`,
      { commentText, participant_username },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const apiForUpdateChallengeResultMetaInfo = ({
  challengeResultId,
  github_url1,
  github_url2,
  note_url,
}: IParameterTypeForUpdateChallengeMetaInfo) => {
  alert(challengeResultId);
  return instance
    .put(
      `challenge-result/${challengeResultId}/update`,
      {
        github_url1,
        github_url2,
        note_url,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): any => {
      return response.data;
    });
};

// apiForUpdateChallengeMetaInfo
export const apiForUpdateChallenge = ({
  challengeId,
  title,
  subtitle,
  description,
}: any) => {
  // alert(pk)
  return instance
    .put(
      `${challengeId}/update`,
      {
        title: title,
        subtitle: subtitle,
        description: description,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): any => {
      return response.data;
    });
};

export const apiForDeleteChallengeByPk = (challenge_id: string | number) => {
  console.log("challenge_id : ", challenge_id);

  return instance
    .delete(`${challenge_id}/delete`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

export const apiForUpdateForPassedForChallegeResult = ({
  challengeResultId,
}: any) => {
  console.log(
    "challengeId for update passed for challenge result : ",
    challengeResultId
  );

  return instance
    .put(
      `/${challengeResultId}/passed/update`,
      {},
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      console.log("response : ", response);
      return response.data;
    });
};

// apiForUpdateForPassedForChallengeResult
export const apiForUpdateEvaluateResultForChallenge = ({
  challengeId,
  userName,
  criteria,
}: IParameterTyperForApiForUpdateForEvaluateResultForChallenge) => {
  console.log(
    "challengeId, username, criteria : ",
    challengeId,
    userName,
    criteria
  );

  return instance
    .put(
      `/${challengeId}/update/evaluate-result`,
      { userName, criteria },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response): AxiosResponse => {
      console.log("response : ", response);
      return response.data;
    });
};

export const apiForWithDrawlForChallenge = (challengeId: number | string) => {
  return instance
    .delete(`${challengeId}/withdrawl`, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);
};

// apiForCreateSurveyOptionForSurvey
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

// apiForGetDetailForSurvey
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
      return response.data;
    });
};
