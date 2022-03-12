import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import { gridActions } from "../slice";
import api from "../../../api";

function* fetchRowsSaga(action: ReturnType<typeof gridActions.fetchRows>) {
    const { page, limit, transformer, apiEndpoint } = action.payload;

    try {
        const response: AxiosResponse<object[]> = yield call(api.get, `${apiEndpoint}?page=${page}&limit=${limit}`);

        const rows = response.data.map(transformer);

        yield put(gridActions.fetchRowsSuccess({ rows }));
    } catch (e) {
        console.log(e);
    }
}

export default fetchRowsSaga;
