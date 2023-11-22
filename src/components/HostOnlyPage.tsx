import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../lib/useUser";

export default function useHostOnlyPage() {
    const { loginUser, userLoading } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
      if (!userLoading) {
      }
    }, [userLoading, loginUser, navigate]);
    return;
}
