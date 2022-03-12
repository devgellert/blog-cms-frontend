import { createSlice } from "@reduxjs/toolkit";
//
import { AppState } from "./types";

const appSlice = createSlice<AppState, any, any>({
    name: "appSlice",
    reducers: {},
    initialState: {}
});

export default appSlice;
