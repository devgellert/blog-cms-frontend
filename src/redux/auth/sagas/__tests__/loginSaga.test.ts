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

    it("should have called the api", result => {
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

    it("should have called for setting the bearer token in storage and in header", result => {
        expect(result).toEqual(call(setTokenInStorageAndSetBearerHeader, "test-token"));
    });

    it("should have called for fetching and hydrating user", result => {
        expect(result).toEqual(call(fetchAndSetUserSaga));
    });

    it("should have dispatched action for setting login state", result => {
        expect(result).toEqual(put(authActions.setLoginState(LoginState.LOGGED_IN)));
    });

    it("should have dispatched action for displaying success snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "success", text: "Successfully logged in." })));
    });

    it("should have terminated", result => {
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

    it("should have called the api. And the api should have failed.", result => {
        expect(result).toEqual(
            call(api.post, "/login_check", {
                username: "username",
                password: "password"
            })
        );

        return new Error("Failed to fetch Data");
    });

    it("should have dispatched an action for setting the login state to failed login", result => {
        expect(result).toEqual(put(authActions.setLoginState(LoginState.FAILED_TO_LOGIN)));
    });

    it("should have dispatched an action for displaying error snackbar", result => {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "error", text: "Username or password is incorrect. Try again." }))
        );
    });

    it("should have terminated", result => {
        expect(result).toBeUndefined();
    });
});
