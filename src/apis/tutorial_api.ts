import axios from "axios";
import { backendApi } from "./common_api";
import Cookie from "js-cookie";

const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

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