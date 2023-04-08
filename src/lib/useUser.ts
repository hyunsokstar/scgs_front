import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../reducers/userSlice";
import { RootState } from "../store";
import { useState } from "react";

export default function useUser() {
  const dispatch = useDispatch();

  const [logoutSuccess, setlogoutSuccess] = useState(false);

  const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
    retry: false,
  });
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  console.log("get user data : ", data);
  console.log("isError : ", isError);

//   if (!isError) {
//     dispatch(login(data));
//   } 

  console.log("loginUser : ", loginUser);

  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
