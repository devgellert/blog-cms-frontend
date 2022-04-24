import sagaHelper from "redux-saga-testing";
import { put } from "redux-saga/effects";
//
import logoutSaga from "../logoutSaga";
import { uiActions } from "../../../ui/slice";

describe("logout successful", () => {
    const it = sagaHelper(logoutSaga());

    it("should display a success snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "success", text: "Successfully logged out." })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
