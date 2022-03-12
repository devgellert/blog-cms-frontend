import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import { gridActions } from "../slice";
import api from "../../../api";
import { ApiGetCategoriesResponse } from "../../../types/api";

function* fetchRowsSaga(action: ReturnType<typeof gridActions.fetchRows>) {
    const { page, limit, transformer, apiEndpoint } = action.payload;

    try {
        const {
            data: { items, pagination }
        }: AxiosResponse<ApiGetCategoriesResponse> = yield call(api.get, `${apiEndpoint}?page=${page}&limit=${limit}`);

        const rows = items.map(transformer);

        yield put(gridActions.fetchRowsSuccess({ rows, pagination }));
    } catch (e) {
        console.log(e);
    }
}

export default fetchRowsSaga;
