import axios from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { backendApi } from "../apis/common_api";
import { IFormTypeForProjectProgress } from "../types/project_progress/project_progress_type";

const instance = axios.create({
    baseURL: `${backendApi}/api/v1/`,
    withCredentials: true,
});

export const insertProjectProgressRow = ({
    task,
    writer, 
    importance,
    task_status,
    password
}: IFormTypeForProjectProgress) =>
    instance
        .post(
            `/project_progress/`,
            {
                task,
                writer, 
                importance,
                task_status,
                password
            },
            {
                headers: {
                    "X-CSRFToken": Cookie.get("csrftoken") || "",
                },
            }
        )
        .then((response) => response.data);

export const getProjectProgressList = ({ queryKey }: QueryFunctionContext) => {
    // console.log("getProjectProgressList 요청 확인 at api");

    const [_, pageNum] = queryKey;
    // console.log("pageNum : ", pageNum);
    return instance.get(`project_progress/?page=${pageNum}`).then((response) => {
        // console.log("response at api: ", response);

        const response_data = {
            totalPageCount: response.data.totalPageCount,
            ProjectProgressList: response.data.ProjectProgressList,
        };

        return response_data;
    });
};