import axios from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { EstimateRequire, EstimateRequireForm } from "../types";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
    withCredentials: true,
});

export interface ISingup {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface IUsernameLoginVariables {
    username: string;
    password: string;
}

export interface ICreateProfilePhotoVariables {
    file: string;
    userPk: string;
}

// export const getRoom = ({ queryKey }: QueryFunctionContext) => {
//     const [_, roomPk] = queryKey;
//     console.log("roomPk : ", roomPk);
//     return instance.get(`rooms/${roomPk}`).then((response) => response.data);
// };

export const getProfile = ({ queryKey }: QueryFunctionContext) => {
    const [_, userPk] = queryKey;
    console.log("userPk : ", userPk);
    return instance.get(`users/${userPk}`).then((response) => response.data);
};



export const createProfilePhoto = ({ file, userPk }: ICreateProfilePhotoVariables) => {
    console.log("createProfilePhoto check !!!!!");

    return instance
        .post(
            `users/${userPk}/photos`,
            { file },
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

export const loginCheck = () => instance.get(`users/me`).then((response) => response.data);

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

export const signUp = ({ name, username, email, password }: ISingup) =>
    instance
        .post(
            `/users/`,
            { name, username, email, password },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);
