import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
//
import { postActions } from "../../slice";
import api from "../../../../api";
import { uiActions } from "../../../ui/slice";
import removePostTranslationSaga from "../removePostTranslationSaga";

describe("Scenario 1: remove translation successfully", () => {
    const it = sagaHelper(
        removePostTranslationSaga(
            postActions.removePostTranslationRequest({
                postId: 1,
                locale: "en",
                flow: "post-details-page"
            })
        ) as any
    );

    it("should call api successfully", function (result) {
        expect(result).toEqual(call(api.delete, `/posts/${1}/translations/en`));
    });

    it("should fetch and set post and translations", function (result) {
        expect(result).toEqual(put(postActions.fetchAndSetPostAndTranslations({ postId: 1 })));
    });

    it("should dispatch success action", function (result) {
        expect(result).toEqual(put(postActions.removePostTranslationSuccess({ flow: "post-details-page" })));
    });

    it("should display success snackbar", function (result) {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "success", text: "Successfully removed translation." }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: fail to remove translation", () => {
    const it = sagaHelper(
        removePostTranslationSaga(
            postActions.removePostTranslationRequest({
                postId: 1,
                locale: "en",
                flow: "post-details-page"
            })
        ) as any
    );

    it("should fail to call api", function (result) {
        expect(result).toEqual(call(api.delete, `/posts/${1}/translations/en`));

        return new Error();
    });

    it("should dispatch error action", function (result) {
        expect(result).toEqual(put(postActions.removePostTranslationError({ flow: "post-details-page" })));
    });

    it("should display error snackbar", function (result) {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "error", text: "Failed to remove translation." }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
