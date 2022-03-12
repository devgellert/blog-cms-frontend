import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
//
import { ApiUser } from "../../../../types/api";
import api from "../../../../api";
import { authActions } from "../../slice";

function* fetchAndSetUserSaga() {
    try {
        const { data: user }: AxiosResponse<ApiUser> = yield call(api.get, "/authenticated-user");

        yield put(authActions.setUser(user));
    } catch (e) {
        console.log(e);
    }
}

export default fetchAndSetUserSaga;
