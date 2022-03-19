import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { map } from "lodash";
//
import api from "../../../api";
import { ApiGetCategoriesResponse } from "../../../types/api";
import { categoryActions } from "../slice";

function* initCategoryOptionsSaga(action: ReturnType<typeof categoryActions.initCategoryOptionsRequest>) {
    try {
        const response: AxiosResponse<ApiGetCategoriesResponse> = yield call(api.get, "/categories?page=1&limit=1000");

        const categories = response.data.items;

        const options = map([{ id: 0, name: "-" }, ...categories], elem => ({
            value: elem.id,
            text: elem.name
        }));

        yield put(categoryActions.initCategoryOptionsSuccess({ options, flow: action.payload.flow }));
    } catch (e) {
        console.log(e);
    }
}

export default initCategoryOptionsSaga;
