import axios from "axios";
import { backendApi } from "./common_api";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";


const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

export const deleteOneTutorial = (tutorialPk: number) => {
  console.log("tutorial : ", tutorialPk);
  return instance.delete(`tutorials/${tutorialPk}`, {
    headers: {
      "X-CSRFToken": Cookie.get("csrftoken") || "",
    },
  }).then((response) => response.data);
};


interface ITypeForTutorialUpdate {
  pk: number;
  tutorial_image: string;
  title: string;
  price: string;
  frontend_framework_option: string;
  backend_framework_option: string;
  description: string;
  teacher: string;
  tutorial_url: string;
}

export const plusTutorialLike = ((tutorialPk: number) => {
  console.log("updateTutorialLike api 호출 함수 실행 2");

  return instance.put(`/tutorials/${tutorialPk}/like`, {},
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }).then((response) => response.data);

})

export const minusTutorialLike = ((tutorialPk: number) => {
  console.log("updateTutorialLike api 호출 함수 실행 2");

  return instance.put(`/tutorials/${tutorialPk}/unlike`, {},
    {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    }).then((response) => response.data);

})

export const updateTutorial = ({ pk, tutorial_image, title, teacher, price, description, frontend_framework_option, backend_framework_option, tutorial_url }: ITypeForTutorialUpdate) =>
  instance
    .put(
      `/tutorials/${pk}`,
      {
        title,
        tutorial_image,
        teacher,
        price,
        description,
        frontend_framework_option,
        backend_framework_option,
        tutorial_url
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);

export const getOneTutorialData = ({ queryKey }: QueryFunctionContext) => {
  const [_, tutorialPk] = queryKey;
  // console.log("userPk : ", tutorialPk);
  return instance.get(`tutorials/${tutorialPk}`).then((response) => response.data);
};

export const getTutorialsList = () => instance.get(`tutorials`).then((response) => response.data);


export interface TypeForCreateTutorial {
  tutorial_image: string,
  title: string,
  teacher: string,
  price: string,
  description: string,
  frontend_framework_option: string,
  backend_framework_option: string,
  tutorial_url: string
}

export const createTutorial = ({ tutorial_image, title, teacher, price, description, frontend_framework_option, backend_framework_option, tutorial_url }: TypeForCreateTutorial) =>
  instance
    .post(
      `/tutorials/`,
      {
        title,
        tutorial_image,
        teacher,
        price,
        description,
        frontend_framework_option,
        backend_framework_option,
        tutorial_url
      },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.data);