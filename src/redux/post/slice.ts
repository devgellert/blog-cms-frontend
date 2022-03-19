import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState } from "./types";
import fetchAndSetPostAndTranslationsSaga from "./sagas/fetchAndSetPostAndTranslationsSaga";
import { ApiPost, ApiPostTranslation } from "../../types/api";
import { Setter } from "../../types/common";
import { categoryActions, InitCategoryOptionsFlow } from "../category/slice";
import { CategoryOption } from "../category/types";

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
        createPostRequest: (
            state: PostState,
            action: PayloadAction<{
                category: null | number;
                author: number;
                slug: string;
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
        isPostDetailsPageLoading: true,
        isPostCreatePageLoading: true
    };
}

export const { actions: postActions, reducer: postReducer } = postSlice;
