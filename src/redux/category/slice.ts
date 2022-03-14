import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { CategoryState, CreateNewCategoryPayload } from "./types";
import { ApiCategory } from "../../types/api";

const categorySlice = createSlice({
    name: "categorySlice",
    reducers: {
        initializeCategoryCreatePage: (state: CategoryState) => {
            state.isCategoryCreatePageLoading = true;
        },
        initializeCategoryCreatePageSuccess: (
            state: CategoryState,
            action: PayloadAction<{ categories: ApiCategory[] }>
        ) => {
            state.isCategoryCreatePageLoading = false;
            state.parentCategories = action.payload.categories;
        },
        setIsCategoryCreatePageLoading: (state: CategoryState, action: PayloadAction<boolean>) => {
            state.isCategoryCreatePageLoading = action.payload;
        }
    },
    initialState: {
        isCategoryCreatePageLoading: true,
        parentCategories: null as null | ApiCategory[]
    }
});

export const { actions: categoryActions, reducer: categoryReducer } = categorySlice;
