import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { GridState } from "./types";

const gridSlice = createSlice({
    name: "gridSlice",
    reducers: {
        fetchRows: (
            state: GridState,
            action: PayloadAction<{
                page: number;
                limit: number;
                transformer: (object: object) => object;
                apiEndpoint: string;
            }>
        ) => {
            state.isLoading = true;
        },

        fetchRowsSuccess: (
            state: GridState,
            action: PayloadAction<{
                rows: object[];
                pagination: {
                    max: number;
                };
            }>
        ) => {
            state.rows = action.payload.rows;
            state.pagination = {
                max: action.payload.pagination.max
            };
            state.isLoading = false;
        }
    },
    initialState: getInitialState()
});

function getInitialState(): GridState {
    return {
        rows: [{ id: "1", name: "name", slug: "slg" }],
        isLoading: true,
        pagination: null
    };
}

export const { actions: gridActions, reducer: gridReducer } = gridSlice;