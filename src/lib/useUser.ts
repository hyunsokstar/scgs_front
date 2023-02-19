import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";
import { IUser } from "../types";


export default function useUser() {
    // const { isLoading, data, isError } = useQuery(["me"], getMe, {
    const { isLoading, data, isError } = useQuery<IUser>(["me"], getMe, {
        retry: false,
    });
    return {
        userLoading: isLoading,
        user: data,
        isLoggedIn: !isError,  // 에러가 없으면 로그인 상태임
    };
}
