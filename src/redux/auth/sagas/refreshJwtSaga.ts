import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import { authActions } from "../slice";
import { LoginState } from "../types";
import { LocalStorageKeys } from "../../../types/localStorage";
import api from "../../../api";
import { ApiRefreshResponse } from "../../../types/api";
import setTokenInStorageAndSetBearerHeader from "./helpers/setTokenInStorageAndSetBearerHeader";
import fetchAndSetUserSaga from "./helpers/fetchAndSetUserSaga";

function* refreshJwtSaga() {
    try {
        const oldToken: string | null = yield call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN);

        if (!oldToken) {
            yield put(authActions.logout());
            return;
        }

        api.defaults.headers.common["Authorization"] = `Bearer ${oldToken}`;

        const {
            data: { token }
        }: AxiosResponse<ApiRefreshResponse> = yield call(api.get, "/refresh");

        yield call(setTokenInStorageAndSetBearerHeader, token);

        yield call(fetchAndSetUserSaga);

        yield put(authActions.setLoginState(LoginState.LOGGED_IN));
    } catch (e) {
        yield put(authActions.logout());
    }
}

export default refreshJwtSaga;
