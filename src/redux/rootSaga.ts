import { all } from "redux-saga/effects";
//
import authSaga from "./auth/sagas";
import gridSaga from "./grid/sagas";
import categorySaga from "./category/sagas";
import postSaga from "./post/sagas";

function* rootSaga() {
    yield all([authSaga(), gridSaga(), categorySaga(), postSaga()]);
}

export default rootSaga;
