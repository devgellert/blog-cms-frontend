import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
import { CategoryOption, CategoryState } from "./types";
import { ApiCategory, ApiCategoryTranslation } from "../../types/api";
import { postActions } from "../post/slice";
import { Setter } from "../../types/common";

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
        initCategoryEditPageRequest: (
            state: CategoryState,
            actions: PayloadAction<{
                categoryId: number;
                cb: {
                    setName: Setter;
                    setSlug: Setter;
                    setParent: Setter<number | null>;
                };
            }>
        ) => {
            state.isCategoryEditPageLoading = true;
        },
        initCategoryEditPageSuccess: (
            state: CategoryState,
            action: PayloadAction<{ categoryOptions: CategoryOption[]; category: ApiCategory }>
        ) => {
            state.categoryOptions = action.payload.categoryOptions;
            state.category = action.payload.category;
            state.isCategoryEditPageLoading = false;
        },
        initCategoryEditPageError: (state: CategoryState) => {
            state.isCategoryEditPageLoading = false;
        },
        //
        editCategoryRequest: (
            state: CategoryState,
            action: PayloadAction<{
                categoryId: number;
                slug: string;
                parent: number | null;
                name: string;
                cb: {
                    setNameError: Setter;
                    setParentError: Setter;
                    setSlugError: Setter;
                    navigate: (url: string) => void;
                };
            }>
        ) => {
            state.isCategoryEditPageLoading = true;
        },
        editCategorySuccess: (state: CategoryState) => {
            state.isCategoryEditPageLoading = false;
        },
        editCategoryError: (state: CategoryState) => {
            state.isCategoryEditPageLoading = false;
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
            state.category = null;
            state.categoryOptions = [];
        }
    },
    extraReducers: builder => {
        builder.addCase(postActions.unmountPostCreatePage, state => {
            state.categoryOptions = [];
        });

        builder.addCase(postActions.unmountPostEditPage, (state, action) => {
            state.categoryOptions = [];
        });

        builder.addCase(postActions.initPostEditPageSuccess, (state, action) => {
            state.categoryOptions = action.payload.categoryOptions;
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
