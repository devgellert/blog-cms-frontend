import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
//
import refreshJwtSaga from "../refreshJwtSaga";
import { uiActions } from "../../../ui/slice";
import { LocalStorageKeys } from "../../../../types/localStorage";
import { authActions } from "../../slice";
import api from "../../../../api";
import setTokenInStorageAndSetBearerHeader from "../helpers/setTokenInStorageAndSetBearerHeader";
import fetchAndSetUserSaga from "../helpers/fetchAndSetUserSaga";
import { LoginState } from "../../types";

describe("Scenario 1: logout", () => {
    const it = sagaHelper(refreshJwtSaga() as any);

    it("should have called for AUTH_TOKEN in local storage", result => {
        expect(result).toEqual(call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN));

        return null;
    });

    it("should log out", result => {
        expect(result).toEqual(put(authActions.logout()));
    });

    it("should have terminated", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: successful refresh", () => {
    const it = sagaHelper(refreshJwtSaga() as any);

    it("should have called for AUTH_TOKEN in local storage", result => {
        expect(result).toEqual(call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN));

        return "test-token";
    });

    it("should call api to refresh token", result => {
        expect(result).toEqual(call(api.get, "/refresh"));

        return { data: { token: "test-token-2" } };
    });

    it("should set bearer token in local storage and in header", result => {
        expect(result).toEqual(call(setTokenInStorageAndSetBearerHeader, "test-token-2"));
    });

    it("should fetch and set user", result => {
        expect(result).toEqual(call(fetchAndSetUserSaga));
    });

    it("should set login state to logged in", result => {
        expect(result).toEqual(put(authActions.setLoginState(LoginState.LOGGED_IN)));
    });

    it("should have terminated", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 3: failed to refresh", () => {
    const it = sagaHelper(refreshJwtSaga() as any);

    it("should have called for AUTH_TOKEN in local storage", result => {
        expect(result).toEqual(call(localStorage.getItem, LocalStorageKeys.AUTH_TOKEN));

        return "test-token";
    });

    it("should call api to refresh token. Api should fail", result => {
        expect(result).toEqual(call(api.get, "/refresh"));

        return new Error("Failed to refresh");
    });

    it("should log out", result => {
        expect(result).toEqual(put(authActions.logout()));
    });

    it("should have terminated", result => {
        expect(result).toBeUndefined();
    });
});
