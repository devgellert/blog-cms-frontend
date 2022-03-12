import { put } from "redux-saga/effects";
import { authActions } from "../slice";
import { LoginState } from "../types";

function* refreshJwtSaga() {
    console.log("refresh");

    yield put(authActions.setLoginState(LoginState.LOGGED_OUT)); // TODO refresh auth
}

export default refreshJwtSaga;
