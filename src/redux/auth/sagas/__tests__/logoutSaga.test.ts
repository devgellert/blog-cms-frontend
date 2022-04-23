import sagaHelper from "redux-saga-testing";
import { put } from "redux-saga/effects";
//
import logoutSaga from "../logoutSaga";
import { uiActions } from "../../../ui/slice";

describe("logout successful", () => {
    const it = sagaHelper(logoutSaga());

    it("should have dispatched a success action", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "success", text: "Successfully logged out." })));
    });

    it("should have terminated", result => {
        expect(result).toBeUndefined();
    });
});
