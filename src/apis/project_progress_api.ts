import axios, { AxiosResponse } from "axios";
import Cookie from "js-cookie";

import { QueryFunctionContext } from "@tanstack/react-query";
import { backendApi } from "../apis/common_api";
import { IFormTypeForProjectProgress, IResponseTypeForProjectTaskUpdate } from "../types/project_progress/project_progress_type";



const instance = axios.create({
    baseURL: `${backendApi}/api/v1/`,
    withCredentials: true,
});

// export const updateProjectImportance = ((taskPk: any, star_count: any) => {
export const updateProjectImportance = (({ taskPk, star_count }: any) => {
    console.log("updateProjectImportance 실행 check");

    return instance.put(`/project_progress/${taskPk}/importance/update`, {
        star_count: star_count
    },
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }).then((response): any => {
            console.log("response : ", response);
            return response.data
        })

})

export const updateProjectTaskCompleted = ((taskPk: string) => {
    console.log("updateProjectTaskCompleted 실행 check");

    return instance.put(`/project_progress/${taskPk}/completed/update`, {},
        {
            headers: {
                "X-CSRFToken": Cookie.get("csrftoken") || "",
            },
        }).then((response): AxiosResponse => {
            console.log("response : ", response);
            return response.data
        })
})

export const insertProjectProgressRow = ({
    task,
    writer,
    importance,
    task_completed,
    password
}: IFormTypeForProjectProgress) =>
    instance
        .post(
            `/project_progress/`,
            {
                task,
                writer,
                importance,
                task_completed,
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