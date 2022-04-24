import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
//
import loginSaga from "../loginSaga";
import api from "../../../../api";
import setTokenInStorageAndSetBearerHeader from "../helpers/setTokenInStorageAndSetBearerHeader";
import fetchAndSetUserSaga from "../helpers/fetchAndSetUserSaga";
import { authActions } from "../../slice";
import { LoginState } from "../../types";
import { uiActions } from "../../../ui/slice";

describe("Scenario 1: login successful", () => {
    const it = sagaHelper(
        loginSaga({
            payload: {
                username: "username",
                password: "password"
            },
            type: "login"
        }) as any
    );

    it("should call the api to log in", result => {
        expect(result).toEqual(
            call(api.post, "/login_check", {
                username: "username",
                password: "password"
            })
        );

        return {
            data: { token: "test-token" }
        };
    });

    it("should set the bearer token in storage and in header", result => {
        expect(result).toEqual(call(setTokenInStorageAndSetBearerHeader, "test-token"));
    });

    it("should fetch and hydrate user", result => {
        expect(result).toEqual(call(fetchAndSetUserSaga));
    });

    it("should set the login state to logged in", result => {
        expect(result).toEqual(put(authActions.setLoginState(LoginState.LOGGED_IN)));
    });

    it("should display success snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "success", text: "Successfully logged in." })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: login fail", () => {
    const it = sagaHelper(
        loginSaga({
            payload: {
                username: "username",
                password: "password"
            },
            type: "login"
        }) as any
    );

    it("should call the api to log in. And the api should fail", result => {
        expect(result).toEqual(
            call(api.post, "/login_check", {
                username: "username",
                password: "password"
            })
        );

        return new Error();
    });

    it("should set the login state to failed to login", result => {
        expect(result).toEqual(put(authActions.setLoginState(LoginState.FAILED_TO_LOGIN)));
    });

    it("should display an error snackbar", result => {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "error", text: "Username or password is incorrect. Try again." }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
