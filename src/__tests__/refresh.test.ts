import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import api from "../api";
import { authActions } from "../redux/auth/slice";
import { ApiRefreshResponse, ApiUser } from "../types/api";
import setTokenInStorageAndSetBearerHeader from "../redux/auth/sagas/helpers/setTokenInStorageAndSetBearerHeader";
import mockApiUser from "../mock/mockApiUser";
import { LoginState } from "../redux/auth/types";
import refreshJwtSaga from "../redux/auth/sagas/refreshJwtSaga";
import { LocalStorageKeys } from "../types/localStorage";

describe("refresh", () => {
    const token = "test-token";
    const oldToken = "test-old-token";

    it("should refresh successfully", () => {
        return expectSaga(refreshJwtSaga)
            .provide([
                [call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN), oldToken],
                [call(api.get, "/refresh"), { data: { token } } as AxiosResponse<ApiRefreshResponse>],
                [call(api.get, "/authenticated-user"), { data: mockApiUser } as AxiosResponse<ApiUser>]
            ])
            .call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN)
            .call(api.get, "/refresh")
            .call(setTokenInStorageAndSetBearerHeader, token)
            .call(api.get, "/authenticated-user")
            .put(authActions.setUser(mockApiUser))
            .put(authActions.setLoginState(LoginState.LOGGED_IN))
            .run();
    });

    it("should fail to refresh", () => {
        return expectSaga(refreshJwtSaga)
            .provide([
                [call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN), oldToken],
                [call(api.get, "/refresh"), throwError(new Error())]
            ])
            .call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN)
            .call(api.get, "/refresh")
            .put(authActions.logout())
            .run();
    });

    it("should not find old token", () => {
        return expectSaga(refreshJwtSaga)
            .provide([[call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN), null]])
            .call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN)
            .put(authActions.logout())
            .run();
    });
});
