import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { GridState } from "./types";

const gridSlice = createSlice({
    name: "gridSlice",
    reducers: {
        fetchRows: (
            state: GridState,
            action: PayloadAction<{
                transformer: (object: object) => object;
                apiEndpoint: string;
                setPaginationToInitial?: boolean;
            }>
        ) => {
            state.isLoading = true;

            if (action.payload.setPaginationToInitial === true) {
                state.pagination = getInitialState().pagination;
            }
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
                ...state.pagination,
                max: action.payload.pagination.max
            };
            state.isLoading = false;
        },

        setPaginationPage: (state: GridState, action: PayloadAction<number>) => {
            state.pagination.page = action.payload;
        },

        setPaginationLimit: (state: GridState, action: PayloadAction<number>) => {
            state.pagination.limit = action.payload;
        }
    },
    initialState: getInitialState()
});

function getInitialState(): GridState {
    return {
        rows: [{ id: "1", name: "name", slug: "slg" }],
        isLoading: true,
        pagination: {
            max: null,
            page: 0,
            limit: 10
        }
    };
}

export const { actions: gridActions, reducer: gridReducer } = gridSlice;
