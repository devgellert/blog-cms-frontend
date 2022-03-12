import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { AuthState, LoginState } from "./types";
import { ApiUser } from "../../types/api";

const authSlice = createSlice({
    name: "authSlice",
    reducers: {
        login: (state: AuthState, action: PayloadAction<{ username: string; password: string }>) => {
            state.loginState = LoginState.IN_PROGRESS;
        },
        refreshJwt: (state: AuthState) => {
            state.loginState = LoginState.REFRESHING;
        },
        setLoginState: (state: AuthState, action: PayloadAction<LoginState>) => {
            state.loginState = action.payload;
        },
        setUser: (state: AuthState, action: PayloadAction<ApiUser>) => {
            state.user = action.payload;
        }
    },
    initialState: getInitialState()
});

function getInitialState(): AuthState {
    return {
        user: null,
        loginState: LoginState.REFRESHING
    };
}

export const { actions: authActions, reducer: authReducer } = authSlice;
