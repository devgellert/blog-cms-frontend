import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
//
import api from "../../../api";
import { ApiLoginResponse } from "../../../types/api";
import { authActions } from "../slice";
import { LoginState } from "../types";
import fetchAndSetUserSaga from "./helpers/fetchAndSetUserSaga";
import setTokenInStorageAndSetBearerHeader from "./helpers/setTokenInStorageAndSetBearerHeader";
import { uiActions } from "../../ui/slice";

function* loginSaga({ payload: { username, password } }: PayloadAction<{ username: string; password: string }>) {
    try {
        const {
            data: { token }
        }: AxiosResponse<ApiLoginResponse> = yield call(api.post, "/login_check", {
            username,
            password
        });

        yield call(setTokenInStorageAndSetBearerHeader, token);

        yield call(fetchAndSetUserSaga);

        yield put(authActions.setLoginState(LoginState.LOGGED_IN));

        yield put(uiActions.displaySnackbar({ type: "success", text: "Successfully logged in." }));
    } catch (e) {
        yield put(authActions.setLoginState(LoginState.FAILED_TO_LOGIN));

        yield put(uiActions.displaySnackbar({ type: "error", text: "Username or password is incorrect. Try again." }));
    }
}

export default loginSaga;
