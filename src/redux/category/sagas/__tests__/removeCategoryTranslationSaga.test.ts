import sagaHelper from "redux-saga-testing";
import { categoryActions } from "../../slice";
import removeCategoryTranslationSaga from "../removeCategoryTranslationSaga";
import { call, put } from "redux-saga/effects";
import api from "../../../../api";
import { uiActions } from "../../../ui/slice";

describe("Scenario 1: remove translation successfully", () => {
    const it = sagaHelper(
        removeCategoryTranslationSaga(
            categoryActions.removeCategoryTranslation({
                categoryId: 1,
                locale: "en"
            })
        ) as any
    );

    it("should call api successfully", function (result) {
        expect(result).toEqual(call(api.delete, `/categories/${1}/translations/en`));
    });

    it("should dispatch success action", function (result) {
        expect(result).toEqual(put(categoryActions.initializeCategoryDetailsPage({ id: 1 })));
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
        removeCategoryTranslationSaga(
            categoryActions.removeCategoryTranslation({
                categoryId: 1,
                locale: "en"
            })
        ) as any
    );

    it("should fail to call api", function (result) {
        expect(result).toEqual(call(api.delete, `/categories/${1}/translations/en`));

        return new Error();
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
