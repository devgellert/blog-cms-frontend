import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { CategoryOption, CategoryState } from "./types";
import { ApiCategory, ApiCategoryTranslation } from "../../types/api";
import { postActions } from "../post/slice";

export type InitCategoryOptionsFlow = "category-create-page" | "post-create-page" | "category-edit-page";

const categorySlice = createSlice({
    name: "categorySlice",
    reducers: {
        initCategoryOptionsRequest: (
            state: CategoryState,
            { payload: { flow } }: PayloadAction<{ flow: InitCategoryOptionsFlow }>
        ) => {
            if (flow === "category-create-page") {
                state.isCategoryCreatePageLoading = true;
            }
            if (flow === "category-edit-page") {
                state.isCategoryEditPageLoading = true;
            }
        },
        initCategoryOptionsSuccess: (
            state: CategoryState,
            { payload: { flow, options } }: PayloadAction<{ options: CategoryOption[]; flow: InitCategoryOptionsFlow }>
        ) => {
            state.categoryOptions = options;

            if (flow === "category-create-page") {
                state.isCategoryCreatePageLoading = false;
            }

            if (flow === "category-edit-page") {
                state.isCategoryEditPageLoading = false;
            }
        },
        setIsCategoryCreatePageLoading: (state: CategoryState, action: PayloadAction<boolean>) => {
            state.isCategoryCreatePageLoading = action.payload;
        },
        setIsCategoryDetailsPageLoading: (state: CategoryState, action: PayloadAction<boolean>) => {
            state.isCategoryCreatePageLoading = action.payload;
        },
        initializeCategoryDetailsPage: (state: CategoryState, action: PayloadAction<{ id: number }>) => {
            state.isCategoryDetailsLoading = true;
        },
        initializeCategoryDetailsPageSuccess: (
            state: CategoryState,
            action: PayloadAction<{ category: ApiCategory; translations: ApiCategoryTranslation[] }>
        ) => {
            state.isCategoryDetailsLoading = false;
            state.category = action.payload.category;
            state.translations = action.payload.translations;
        },
        removeCategoryTranslation: (
            state: CategoryState,
            action: PayloadAction<{ locale: string; categoryId: number }>
        ) => {
            state.isCategoryDetailsLoading = true;
        },
        //
        unmountCategoryDetailsPage: (state: CategoryState) => {
            state.isCategoryDetailsLoading = true;
            state.category = null;
            state.translations = null;
        },
        unmountCategoryCreatePage: (state: CategoryState) => {
            state.isCategoryCreatePageLoading = true;
            state.categoryOptions = [];
        },
        unmountCategoryEditPage: (state: CategoryState) => {
            state.isCategoryEditPageLoading = true;
            state.categoryOptions = [];
        }
    },
    extraReducers: builder => {
        builder.addCase(postActions.unmountPostCreatePage, state => {
            state.categoryOptions = [];
        });
    },
    initialState: {
        categoryOptions: [] as CategoryOption[],
        category: null as null | ApiCategory,
        translations: null as null | ApiCategoryTranslation[],
        //
        isCategoryCreatePageLoading: true,
        isCategoryDetailsLoading: true,
        isCategoryEditPageLoading: true
    }
});

export const { actions: categoryActions, reducer: categoryReducer } = categorySlice;
