import api from "../../../api";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { ApiGetCategoriesResponse } from "../../../types/api";
import { categoryActions } from "../slice";

function* initializeCategoryCreatePageSaga() {
    try {
        const response: AxiosResponse<ApiGetCategoriesResponse> = yield call(api.get, "/categories?page=1&limit=1000");

        const categories = response.data.items;

        yield put(categoryActions.initializeCategoryCreatePageSuccess({ categories }));
    } catch (e) {
        console.log(e);
    }
}

export default initializeCategoryCreatePageSaga;
