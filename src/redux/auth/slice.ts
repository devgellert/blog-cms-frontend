import { createSlice } from "@reduxjs/toolkit";
//
import { AuthState } from "./types";

const authSlice = createSlice<AuthState, any, any>({
    name: "authSlice",
    reducers: {},
    initialState: getInitialState()
});

function getInitialState(): AuthState {
    return {
        user: null
    };
}

export default authSlice;
