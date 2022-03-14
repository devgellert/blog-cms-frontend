import { call, put, select } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import { gridActions } from "../slice";
import api from "../../../api";
import { ApiGetCategoriesResponse } from "../../../types/api";
import GridSelectors from "../selector";

function* fetchRowsSaga(action: ReturnType<typeof gridActions.fetchRows>) {
    const { transformer, apiEndpoint } = action.payload;

    const { page, limit } = yield select(GridSelectors.getPagination);

    try {
        const {
            data: { items, pagination }
        }: AxiosResponse<ApiGetCategoriesResponse> = yield call(
            api.get,
            `${apiEndpoint}?page=${page + 1}&limit=${limit}`
        );

        const rows = items.map(transformer);

        yield put(gridActions.fetchRowsSuccess({ rows, pagination }));
    } catch (e) {
        console.log(e);
    }
}

export default fetchRowsSaga;
