import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState } from "./types";
import fetchAndSetPostAndTranslationsSaga from "./sagas/fetchAndSetPostAndTranslationsSaga";
import { ApiCategoryTranslation, ApiPost, ApiPostTranslation } from "../../types/api";
import { Setter } from "../../types/common";
import { categoryActions, InitCategoryOptionsFlow } from "../category/slice";
import { CategoryOption, CategoryState } from "../category/types";
import initPostEditPageSaga from "./sagas/initPostEditPageSaga";

export type RemovePostTranslationFlow = "post-details-page";

const postSlice = createSlice({
    name: "postSlice",
    reducers: {
        fetchAndSetPostAndTranslations: (state: PostState, action: PayloadAction<{ postId: number }>) => {
            state.isPostDetailsPageLoading = true;
        },
        fetchAndSetPostAndTranslationsSuccess: (
            state: PostState,
            action: PayloadAction<{ post: ApiPost; postTranslations: ApiPostTranslation[] }>
        ) => {
            state.post = action.payload.post;
            state.postTranslations = action.payload.postTranslations;
            state.isPostDetailsPageLoading = false;
        },
        removePostTranslationRequest: (
            state: PostState,
            action: PayloadAction<{ postId: number; locale: string; flow: RemovePostTranslationFlow }>
        ) => {
            if (action.payload.flow === "post-details-page") {
                state.isPostDetailsPageLoading = true;
            }
        },
        removePostTranslationSuccess: (
            state: PostState,
            action: PayloadAction<{ flow: RemovePostTranslationFlow }>
        ) => {
            if (action.payload.flow === "post-details-page") {
                state.isPostDetailsPageLoading = false;
            }
        },
        removePostTranslationError: (state: PostState, action: PayloadAction<{ flow: RemovePostTranslationFlow }>) => {
            if (action.payload.flow === "post-details-page") {
                state.isPostDetailsPageLoading = false;
            }
        },
        //
        createPostRequest: (
            state: PostState,
            action: PayloadAction<{
                category: null | number;
                author: number;
                slug: string;
                enabled: boolean;
                cb: {
                    setCategoryError: Setter;
                    setSlugError: Setter;
                    navigate: (url: string) => void;
                };
            }>
        ) => {
            state.isPostCreatePageLoading = true;
        },
        createPostSuccess: (state: PostState) => {
            state.isPostCreatePageLoading = false;
        },
        createPostError: (state: PostState) => {
            state.isPostCreatePageLoading = false;
        },
        //
        editPostRequest: (
            state: PostState,
            action: PayloadAction<{
                postId: number;
                category: null | number;
                author: number;
                slug: string;
                enabled: boolean;
                cb: {
                    setCategoryError: Setter;
                    setSlugError: Setter;
                    navigate: (url: string) => void;
                };
            }>
        ) => {
            state.isPostEditPageLoading = true;
        },
        editPostSuccess: (state: PostState) => {
            state.isPostEditPageLoading = false;
        },
        editPostError: (state: PostState) => {
            state.isPostEditPageLoading = false;
        },
        //
        createTranslationRequest: (
            state: PostState,
            action: PayloadAction<{
                postId: number;
                locale: string;
                title: string;
                metaTitle: string;
                metaDescription: string;
                ogTitle: string;
                ogDescription: string;
                content: string;
                cb: {
                    setTitleError: Setter;
                    setLocaleError: Setter;
                    setMTitleError: Setter;
                    setMDescError: Setter;
                    setOgTitleError: Setter;
                    setOgDescError: Setter;
                    navigate: (url: string) => void;
                };
            }>
        ) => {
            state.isPostTranslationCreatePageLoading = true;
        },
        createTranslationSuccess: (state: PostState) => {
            state.isPostTranslationCreatePageLoading = false;
        },
        createTranslationError: (state: PostState) => {
            state.isPostTranslationCreatePageLoading = false;
        },
        //
        editTranslationRequest: (
            state: PostState,
            action: PayloadAction<{
                postId: number;
                locale: string;
                title: string;
                metaTitle: string;
                metaDescription: string;
                ogTitle: string;
                ogDescription: string;
                content: string;
                cb: {
                    setTitleError: Setter;
                    setMTitleError: Setter;
                    setMDescError: Setter;
                    setOgTitleError: Setter;
                    setOgDescError: Setter;
                    navigate: (url: string) => void;
                };
            }>
        ) => {
            state.isPostTranslationEditPageLoading = true;
        },
        editTranslationSuccess: (state: PostState) => {
            state.isPostTranslationEditPageLoading = false;
        },
        editTranslationError: (state: PostState) => {
            state.isPostTranslationEditPageLoading = false;
        },
        //
        initPostEditPageRequest: (
            state: PostState,
            action: PayloadAction<{
                postId: number;
                cb: {
                    setSlug: Setter;
                    setCategory: Setter<number>;
                    setAuthor: Setter<number>;
                    setEnabled: Setter<boolean>;
                };
            }>
        ) => {
            state.isPostEditPageLoading = true;
        },
        initPostEditPageSuccess: (
            state: PostState,
            action: PayloadAction<{
                categoryOptions: CategoryOption[];
            }>
        ) => {
            state.isPostEditPageLoading = false;
        },
        //
        initTranslationEditPageRequest: (
            state: PostState,
            actions: PayloadAction<{
                postId: number;
                locale: string;
                cb: {
                    setTitle: Setter;
                    setMTitle: Setter;
                    setMDesc: Setter;
                    setOgTitle: Setter;
                    setOgDesc: Setter;
                    setContent: Setter;
                };
            }>
        ) => {
            state.isPostTranslationEditPageLoading = true;
        },
        initTranslationEditPageSuccess: (
            state: PostState,
            action: PayloadAction<{ translation: ApiPostTranslation }>
        ) => {
            state.postTranslation = action.payload.translation;
            state.isPostTranslationEditPageLoading = false;
        },
        initTranslationEditPageError: (state: PostState) => {
            state.isPostTranslationEditPageLoading = false;
        },

        //
        unmountPostDetailsPage: (state: PostState) => {
            state.post = null;
            state.postTranslations = null;
            state.isPostDetailsPageLoading = true;
        },
        unmountPostCreatePage: (state: PostState) => {
            state.isPostCreatePageLoading = true;
        },
        unmountPostEditPage: (state: PostState) => {
            state.isPostEditPageLoading = true;
        },
        unmountTranslationEditPage: (state: PostState) => {
            state.isPostTranslationEditPageLoading = true;
            state.postTranslation = null;
        }
    },
    initialState: getInitialState(),
    extraReducers: builder => {
        builder.addCase(categoryActions.initCategoryOptionsRequest, (state, action) => {
            if (action.payload.flow === "post-create-page") {
                state.isPostCreatePageLoading = true;
            }
        });

        builder.addCase(categoryActions.initCategoryOptionsSuccess, (state, action) => {
            if (action.payload.flow === "post-create-page") {
                state.isPostCreatePageLoading = false;
            }
        });
    }
});

function getInitialState(): PostState {
    return {
        post: null,
        postTranslations: null,
        postTranslation: null,
        //
        isPostDetailsPageLoading: true,
        isPostCreatePageLoading: true,
        isPostEditPageLoading: true,
        //
        isPostTranslationCreatePageLoading: false,
        isPostTranslationEditPageLoading: true
    };
}

export const { actions: postActions, reducer: postReducer } = postSlice;
