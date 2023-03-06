import axios from "axios";
import { backendApi } from "./common_api";
import Cookie from "js-cookie";
import { QueryFunctionContext } from "@tanstack/react-query";


const instance = axios.create({
  baseURL: `${backendApi}/api/v1/`,
  withCredentials: true,
});

// export const updateEstimateRequire = ({ estimatePk, title, product, manager, email, phone_number, content, estimate_require_completion, memo }: EstimateRequireForm) => {
//   console.log("api estimate_require_completion : ", estimate_require_completion);

//   return instance
//       .put(
//           `/estimates/${estimatePk}`,
//           {
//               title,
//               product,
//               manager,
//               email,
//               phone_number,
//               content,
//               estimate_require_completion,
//               memo,
//           },
//           {
//               headers: {
//                   "X-CSRFToken": Cookie.get("csrftoken") || "",
//               },
//           }
//       )
//       .then((response) => response.data);
// };

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
  console.log("userPk : ", tutorialPk);
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