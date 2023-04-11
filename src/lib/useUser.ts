import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../reducers/userSlice";
import { RootState } from "../store";
import { useState } from "react";

export default function useUser() {
  const dispatch = useDispatch();


  const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
    retry: false,
  });
  const { loginUser, isLoggedIn } = useSelector(
    (state: RootState) => state.loginInfo
  );

  console.log("data : ", data);

  // if (!isError) {
  //   dispatch(login(data));
  // }

  // console.log("get user data : ", data);
  // console.log("isError : ", isError);

  // if (isError) {
  //   dispatch(logout());
  // }

  if (!isError && !isLoading && data) {
    dispatch(login(data));
  } else {
    dispatch(logout());
  }

  console.log("loginUser at useuser : ", loginUser);

  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError && isLoggedIn,
  };
}
