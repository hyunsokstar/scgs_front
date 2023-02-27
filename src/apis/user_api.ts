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
