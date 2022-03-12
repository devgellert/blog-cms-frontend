import { PayloadAction } from "@reduxjs/toolkit";
import { call } from "redux-saga/effects";
import api from "../../../api";

function* loginSaga({ payload: { username, password } }: PayloadAction<{ username: string; password: string }>) {
    console.log(username, password);

    // @ts-ignore
    const response: any = yield call(api.post, '/login', {
        username,
        password
    });

    console.log(response);
}

export default loginSaga;
