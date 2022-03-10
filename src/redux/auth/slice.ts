import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { AuthState } from "./types";

const authSlice = createSlice({
    name: "authSlice",
    reducers: {
        login: (state: AuthState, action: PayloadAction<{ username: string; password: string }>) => {
            state.isLoginInProgress = true;
        }
    },
    initialState: getInitialState()
});

function getInitialState(): AuthState {
    return {
        user: null,
        isLoginInProgress: false
    };
}

export const { actions: authActions, reducer: authReducer } = authSlice;
