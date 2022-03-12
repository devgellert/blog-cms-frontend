import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import { authActions } from "../slice";
import { LoginState } from "../types";
import { LocalStorageKeys } from "../../../types/localStorage";
import api from "../../../api";
import { ApiRefreshResponse } from "../../../types/api";

function* refreshJwtSaga() {
    const oldToken = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);

    if (!oldToken) {
        yield put(authActions.setLoginState(LoginState.LOGGED_OUT));
        return;
    }

    api.defaults.headers.common["Authorization"] = `Bearer ${oldToken}`;

    const {
        data: { token }
    }: AxiosResponse<ApiRefreshResponse> = yield call(api.get, "/refresh");

    localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    yield put(authActions.setLoginState(LoginState.LOGGED_IN));
}

export default refreshJwtSaga;
