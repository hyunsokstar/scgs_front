import axios from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { EstimateRequire, EstimateRequireForm } from "./types";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
});

// estimate 리스트 요청
export const getEstimates = () => instance.get("estimates/").then((response) => response.data);

export const getOneEstimate = async ({ queryKey }: QueryFunctionContext) => {
    const [_, estimatePk] = queryKey;
    console.log("roomPestimatePk : ", estimatePk);
    return await instance.get(`estimates/${estimatePk}`).then((response) => response.data);
};

export const getRooms = () => instance.get("rooms/").then((response) => response.data);

export const getRoom = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    console.log("roomPk : ", roomPk);
    return instance.get(`rooms/${roomPk}`).then((response) => response.data);
};

export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
    const [_, roomPk] = queryKey;
    return instance.get(`rooms/${roomPk}/reviews`).then((response) => response.data);
};

export const getUsersList = () => instance.get(`users`).then((response) => response.data);

export const getMe = () => instance.get(`users/me`).then((response) => response.data);

// export const logOut = () => instance.post(`users/log-out`).then((response) => response.data);
export const logOut = () =>
    instance
        .post(`users/log-out`, null, {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        })
        .then((response) => response.data);

//
// export interface IUsernameLoginSuccess {
//     ok: string;
// }
// export interface IUsernameLoginError {
//     error: string;
// }

//

// interface EstimateRequireForm {
//   title: string;
//   product: string;
//   manager: string;
//   email: string;
//   phone_number: string;
//   content: string;
//   estimate_require_completion: string;
//   memo: string;
// }

// export const getRoomReviews = ({ queryKey }: QueryFunctionContext) => {
//   const [_, roomPk] = queryKey;
//   return instance
//     .get(`rooms/${roomPk}/reviews`)
//     .then((response) => response.data);
// };

export const updateEstimateRequire = (
    // { queryKey }: QueryFunctionContext,
    { estimatePk, title, product, manager, email, phone_number, content, estimate_require_completion, memo }: EstimateRequireForm
) => {
    // const [_, estimatePk] = queryKey;

    console.log("api estimate_require_completion : ", estimate_require_completion);

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

export const insertEstimateRequire = ({ title, product, manager, email, phone_number, content, estimate_require_completion, memo }: EstimateRequire) =>
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

export interface IUsernameLoginVariables {
    username: string;
    password: string;
}

export const usernameLogIn = ({ username, password }: IUsernameLoginVariables) =>
    instance
        .post(
            `/users/log-in`,
            { username, password },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);

export const getAmenities = () => instance.get(`rooms/amenities`).then((response) => response.data);
export const getCategories = () => instance.get(`categories`).then((response) => response.data);

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
    file: FileList;
    uploadURL: string;
}

export const uploadImage = ({ file, uploadURL }: IUploadImageVarialbes) => {
    const form = new FormData();
    form.append("file", file[0]);
    return axios
        .post(uploadURL, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((response) => response.data);
};

export interface ICreatePhotoVariables {
    description: string;
    file: string;
    roomPk: string;
}

export const createPhoto = ({ description, file, roomPk }: ICreatePhotoVariables) =>
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
