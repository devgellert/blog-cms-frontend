import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import loginSaga from "../redux/auth/sagas/loginSaga";
import { call } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import api from "../api";
import { authActions } from "../redux/auth/slice";
import { ApiLoginResponse, ApiUser } from "../types/api";
import setTokenInStorageAndSetBearerHeader from "../redux/auth/sagas/helpers/setTokenInStorageAndSetBearerHeader";
import mockApiUser from "../mock/mockApiUser";
import { LoginState } from "../redux/auth/types";
import { uiActions } from "../redux/ui/slice";

describe("login", () => {
    const username = "test-username";
    const password = "test-password";
    const token = "test-token";

    it("should login successfully", () => {
        return expectSaga(loginSaga, authActions.login({ username, password }))
            .provide([
                [
                    call(api.post, "/login_check", {
                        username,
                        password
                    }),
                    {
                        data: {
                            token: token
                        }
                    } as AxiosResponse<ApiLoginResponse>
                ],
                [call(api.get, "/authenticated-user"), { data: mockApiUser } as AxiosResponse<ApiUser>]
            ])
            .call(api.post, "/login_check", {
                username,
                password
            })
            .call(setTokenInStorageAndSetBearerHeader, token)
            .call(api.get, "/authenticated-user")
            .put(authActions.setUser(mockApiUser))
            .put(authActions.setLoginState(LoginState.LOGGED_IN))
            .put(uiActions.displaySnackbar({ type: "success", text: "Successfully logged in." }))
            .run();
    });

    it("should fail to login", () => {
        return expectSaga(loginSaga, authActions.login({ username, password }))
            .provide([
                [
                    call(api.post, "/login_check", {
                        username,
                        password
                    }),
                    throwError(new Error())
                ]
            ])
            .call(api.post, "/login_check", {
                username,
                password
            })
            .put(authActions.setLoginState(LoginState.FAILED_TO_LOGIN))
            .put(uiActions.displaySnackbar({ type: "error", text: "Username or password is incorrect. Try again." }))
            .run();
    });
});
