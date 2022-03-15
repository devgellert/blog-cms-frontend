import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { UIState } from "./types";
import { AlertColor } from "@mui/material/Alert/Alert";

const uiSlice = createSlice({
    name: "uiSlice",
    reducers: {
        displaySnackbar: (state: UIState, action: PayloadAction<{ type: AlertColor; text: string }>) => {
            state.snackbarConfig = {
                ...action.payload,
                isOpen: true
            };
        },
        hideSnackbar: (state: UIState) => {
            state.snackbarConfig.isOpen = false;
        }
    },
    initialState: getInitialState()
});

function getInitialState(): UIState {
    return {
        snackbarConfig: {
            type: "success",
            text: "",
            isOpen: false
        }
    };
}

export const { actions: uiActions, reducer: uiReducer } = uiSlice;
