import { createSlice } from "@reduxjs/toolkit";
//
import { AppState } from "./types";

const appSlice = createSlice<AppState, any, any>({
    name: "appSlice",
    reducers: {},
    initialState: {
        test: true
    }
});

export default appSlice;
