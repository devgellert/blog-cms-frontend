import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
//
import fetchAndSetUserSaga from "../fetchAndSetUserSaga";
import api from "../../../../../api";
import { authActions } from "../../../slice";

const MOCK_USER = { username: "", id: 1, createdAt: "", updatedAt: "" };

describe("Scenario 1: successful user fetch", () => {
    const it = sagaHelper(fetchAndSetUserSaga() as any);

    it("should call endpoint", result => {
        expect(result).toEqual(call(api.get, "/authenticated-user"));

        return { data: MOCK_USER };
    });

    it("should set user in redux", result => {
        expect(result).toEqual(put(authActions.setUser(MOCK_USER)));
    });

    it("should have terminated", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: user fetch fails", () => {
    const it = sagaHelper(fetchAndSetUserSaga() as any);

    it("should call endpoint", result => {
        expect(result).toEqual(call(api.get, "/authenticated-user"));

        return new Error();
    });

    it("should have terminated", result => {
        expect(result).toBeUndefined();
    });
});
