import { takeLeading } from "redux-saga/effects";
import { authActions } from "../slice";
import loginSaga from "./loginSaga";

function* authSaga() {
    yield takeLeading(authActions.login as any, loginSaga); // TODO: any
}

export default authSaga;
