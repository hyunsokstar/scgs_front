import { useQuery } from "@tanstack/react-query";
import { loginCheck } from "../api";
import { IResponseDataForLoginCheck } from "../types";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../reducers/userSlice";
import { RootState } from "../store";
import { useState } from "react";

export default function useUser() {
  const dispatch = useDispatch();

  const { isLoading, data, isError } = useQuery<IResponseDataForLoginCheck>(
    ["loginCheck"],
    loginCheck,
    {
      retry: false,
    }
  );
  
  // const { loginUser, isLoggedIn } = useSelector(
  //   (state: RootState) => state.loginInfo
  // );

  if (!isError && !isLoading && data) {
    dispatch(login(data));
  } else {
    dispatch(logout());
  }

  // console.log("loginUser at useuser : ", loginUser);

  return {
    userLoading: isLoading,
    loginUser: data,
    isLoggedIn: !isError,
  };
}
