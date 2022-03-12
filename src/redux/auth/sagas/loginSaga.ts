import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
//
import api from "../../../api";
import { ApiLoginResponse } from "../../../types/api";
import { authActions } from "../slice";
import { LoginState } from "../types";
import { LocalStorageKeys } from "../../../types/localStorage";

function* loginSaga({ payload: { username, password } }: PayloadAction<{ username: string; password: string }>) {
    try {
        const {
            data: { token }
        }: AxiosResponse<ApiLoginResponse> = yield call(api.post, "/login_check", {
            username,
            password
        });

        localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        yield put(authActions.setLoginState(LoginState.LOGGED_IN));
    } catch (e) {
        console.log(e);
    }
}

export default loginSaga;
