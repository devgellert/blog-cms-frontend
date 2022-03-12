import { takeLeading } from "redux-saga/effects";
//
import { authActions } from "../slice";
import loginSaga from "./loginSaga";
import refreshJwtSaga from "./refreshJwtSaga";
import logoutSaga from "./logoutSaga";

function* authSaga() {
    yield takeLeading(authActions.login as any, loginSaga); // TODO: any
    yield takeLeading(authActions.refreshJwt as any, refreshJwtSaga); // TODO: any
    yield takeLeading(authActions.logout as any, logoutSaga); // TODO: any
}

export default authSaga;
