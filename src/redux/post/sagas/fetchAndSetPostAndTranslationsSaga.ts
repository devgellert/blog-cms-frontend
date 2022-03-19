import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
//
import { ApiPost, ApiPostTranslation } from "../../../types/api";
import api from "../../../api";
import { postActions } from "../slice";

function* fetchAndSetPostAndTranslationsSaga(action: PayloadAction<{ postId: number }>) {
    const { postId } = action.payload;

    try {
        const { data: post }: AxiosResponse<ApiPost> = yield call(api.get, `/posts/${postId}`);

        const {
            data: { items: postTranslations }
        }: AxiosResponse<{ items: ApiPostTranslation[] }> = yield call(api.get, `/posts/${postId}/translations`);

        yield put(postActions.fetchAndSetPostAndTranslationsSuccess({ postTranslations, post }));
    } catch (e) {
        console.log(e);
    }
}

export default fetchAndSetPostAndTranslationsSaga;
