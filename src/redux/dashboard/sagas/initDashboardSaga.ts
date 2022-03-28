import { call, put } from "redux-saga/effects";
//
import api from "../../../api";
import { ApiStatisticsResponse } from "../../../types/api";
import { dashboardActions } from "../slice";

function* initDashboardSaga() {
    try {
        const {
            data: { numbers, errors }
        }: ApiStatisticsResponse = yield call(api.get, "/statistics");

        yield put(dashboardActions.initDashboardSuccess({ numbers, errors }));
    } catch (e) {
        console.log(e);
        yield put(dashboardActions.initDashboardError());
    }
}

export default initDashboardSaga;
