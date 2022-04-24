import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
//
import api from "../../../api";
import { ApiCategory, ApiCategoryTranslation } from "../../../types/api";
import { categoryActions } from "../slice";

function* initializeCategoryDetailsPageSaga(action: PayloadAction<{ id: number }>) {
    try {
        const category: AxiosResponse<ApiCategory> = yield call(api.get, `/categories/${action.payload.id}`);

        const {
            data: { items: translations }
        }: AxiosResponse<{ items: ApiCategoryTranslation[] }> = yield call(
            api.get,
            `/categories/${action.payload.id}/translations`
        );

        yield put(
            categoryActions.initializeCategoryDetailsPageSuccess({
                category: category.data,
                translations
            })
        );
    } catch (e) {
        console.log(e);
    }
}

export default initializeCategoryDetailsPageSaga;
