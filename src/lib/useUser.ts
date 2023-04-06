import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";

import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../reducers/userSlice";
import { RootState } from "../store";


export default function useUser() {
    const dispatch = useDispatch();
    const {loginUser, isLoggedIn} = useSelector(
        (state: RootState) => state.loginInfo
      );

    const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
        retry: false,
    });

    // console.log("get user data : ", data);

    if(isLoggedIn) {
        dispatch(login(data))
    } else {
        dispatch(logout())
    }

    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: loginUser.username !=="",  // 에러가 없으면 로그인 상태임
    };
}
