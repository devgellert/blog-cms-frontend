import { takeLeading } from "redux-saga/effects";
//
import { dashboardActions } from "../slice";
import initDashboardSaga from "./initDashboardSaga";

function* dashboardSaga() {
    yield takeLeading(dashboardActions.initDashboardRequest, initDashboardSaga);
}

export default dashboardSaga;
