import { all } from "redux-saga/effects";
//
import authSaga from "./auth/sagas";
import gridSaga from "./grid/sagas";

function* rootSaga() {
    yield all([authSaga(), gridSaga()]);
}

export default rootSaga;
