import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface LoginState {
  isLoggedIn: boolean;
  loginUser: any
}

const initialState: LoginState = {
  isLoggedIn: false,
  loginUser: { username: "" },
};

export const loginInfoSlice = createSlice({
  name: "loginInfo",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.loginUser = action.payload;
    },
    logout: (state) => {
      console.log("logout 요청 확인")
      state.isLoggedIn = false;
    },
  },
});

export default loginInfoSlice.reducer;

export const { login, logout } = loginInfoSlice.actions;
