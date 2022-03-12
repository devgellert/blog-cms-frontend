import { takeLeading } from "redux-saga/effects";
//
import { gridActions } from "../slice";
import fetchRowsSaga from "./fetchRowsSaga";

function* gridSaga() {
    yield takeLeading(gridActions.fetchRows, fetchRowsSaga);
}

export default gridSaga;
