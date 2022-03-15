import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { CategoryState, CreateNewCategoryPayload } from "./types";
import { ApiCategory, ApiCategoryTranslation } from "../../types/api";
import removeCategoryTranslationSaga from "./sagas/removeCategoryTranslationSaga";

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
        }
    },
    initialState: {
        isCategoryCreatePageLoading: true,
        parentCategories: null as null | ApiCategory[],
        category: null as null | ApiCategory,
        isCategoryDetailsLoading: true,
        translations: null as null | ApiCategoryTranslation[]
    }
});

export const { actions: categoryActions, reducer: categoryReducer } = categorySlice;
