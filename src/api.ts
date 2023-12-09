import axios from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { EstimateRequire, EstimateRequireForm } from "./types";
import { backendApi } from "./apis/common_api";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

export const deleteEstimateListForCheck = (ids_to_delete: number[]) => {
  console.log("ids_to_delete : ", ids_to_delete);

  return axios
    .delete(`${backendApi}/api/v1/estimates/delete`, {
      data: {
        ids: ids_to_delete,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteOneEstimates = (estimatePk: number) => {
  console.log("estimatePk : ", estimatePk);
  return instance
    .delete(`estimates/${estimatePk}`)
    .then((response) => response.data);
};

// export const getEstimates = () => instance.get("estimates/").then((response) => response.data);
export const getEstimates = ({ queryKey }: QueryFunctionContext) => {
  console.log("estimate 요청 확인 at api");

  const [_, pageNum] = queryKey;
  // console.log("pageNum : ", pageNum);
  return instance.get(`estimates/?page=${pageNum}`).then((response) => {
    console.log("response at api: ", response);

    const response_data = {
      total_count: response.data.totalCount,
      data: response.data.estimateRequires,
    };

    return response_data;
  });
};

export const getOneEstimate = async ({ queryKey }: QueryFunctionContext) => {
  const [_, estimatePk] = queryKey;
  return await instance
    .get(`estimates/${estimatePk}`)
    .then((response) => response.data);
};

export const getRooms = () =>
  instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  console.log("roomPk : ", roomPk);
  return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
  const [_, roomPk] = queryKey;
  return instance
    .get(`rooms/${roomPk}/reviews`)
    .then((response) => response.data);
};

// export const getUsersList = () => instance.get(`users`).then((response) => response.data);

export const loginCheck = () =>
  instance.get(`users/login-check`).then((response) => {
    // to fix
    // console.log("response for loginCheck : ", response);

    return response.data;
  });


export const logOutApi = () =>
  instance
    .post(`users/log-out`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const updateEstimateRequire = ({
  estimatePk,
  title,
  product,
  manager,
  email,
  phone_number,
  content,
  estimate_require_completion,
  memo,
}: EstimateRequireForm) => {
  console.log(
    "api estimate_require_completion : ",
    estimate_require_completion
  );

  return instance
    .put(
      `/estimates/${estimatePk}`,
      {
        title,
        product,
        manager,
        email,
        phone_number,
        content,
        estimate_require_completion,
        memo,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
};

export const insertEstimateRequire = ({
  title,
  product,
  manager,
  email,
  phone_number,
  content,
  estimate_require_completion,
  memo,
}: EstimateRequire) =>
  instance
    .post(
      `/estimates/`,
      {
        title,
        product,
        manager,
        email,
        phone_number,
        content,
        estimate_require_completion,
        memo,
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getAmenities = () =>
  instance.get(`rooms/amenities`).then((response) => response.data);
export const getCategories = () =>
  instance.get(`categories`).then((response) => response.data);

export interface IUploadRoomVariables {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export const uploadRoom = (variables: IUploadRoomVariables) =>
  instance
    .post(`rooms/`, variables, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const getUploadURL = () =>
  instance
    .post(`medias/photos/get-url`, null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export interface IUploadImageVarialbes {
  file: any;
  uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVarialbes) => {
  console.log("uploadURL:", uploadURL);
  console.log("file:", file);

  const form = new FormData();
  form.append("file", file);

  if (file) {
    return axios
      .post(uploadURL, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  } else {
    alert("파일이 없습니다 ! ");
    return axios
      .post(uploadURL, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  }

  // return axios
  //     .post(uploadURL, form, {
  //         headers: {
  //             "Content-Type": "multipart/form-data",
  //         },
  //     })
  //     .then((response) => response.data);
};

export interface ICreatePhotoVariables {
  description: string;
  file: string;
  roomPk: string;
}

export const createPhoto = ({
  description,
  file,
  roomPk,
}: ICreatePhotoVariables) =>
  instance
    .post(
      `rooms/${roomPk}/photos`,
      { description, file },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);
