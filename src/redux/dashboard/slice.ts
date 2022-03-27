import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { DashboardState } from "./types";

const dashboardSlice = createSlice({
    name: "dashboardSlice",
    reducers: {
        initDashboardRequest: state => {
            state.isLoading = true;
        },
        initDashboardSuccess: (
            state,
            action: PayloadAction<{
                numbers: { category: number; post: number; postTranslation: number; categoryTranslation: number };
            }>
        ) => {
            state.statistics.numbers = action.payload.numbers;
            state.isLoading = false;
        },
        initDashboardError: state => {
            state.isLoading = false;
        }
    },
    initialState: getInitialState()
});

function getInitialState(): DashboardState {
    return {
        isLoading: true,
        statistics: {
            numbers: {
                category: null,
                post: null,
                postTranslation: null,
                categoryTranslation: null
            }
        }
    };
}

export const { actions: dashboardActions, reducer: dashboardReducer } = dashboardSlice;
