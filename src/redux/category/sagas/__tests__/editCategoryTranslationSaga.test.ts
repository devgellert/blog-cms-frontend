import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import editCategoryTranslationSaga from "../editCategoryTranslationSaga";
import { categoryActions } from "../../slice";
import api from "../../../../api";
import { ApiCategoryTranslation } from "../../../../types/api";
import { uiActions } from "../../../ui/slice";

describe("Scenario 1: edit category translation successfully", () => {
    const it = sagaHelper(
        editCategoryTranslationSaga(
            categoryActions.editTranslationRequest({
                categoryId: 1,
                locale: "en",
                name: "string",
                enabled: false,
                cb: {
                    setNameError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should edit category translation successfully", result => {
        expect(result).toEqual(
            call(api.put, `/categories/${1}/translations/${"en"}`, {
                name: "string",
                enabled: false
            })
        );

        return {
            data: {
                id: 1,
                locale: "en",
                name: "string",
                enabled: false,
                category: 1
            }
        } as AxiosResponse<ApiCategoryTranslation>;
    });

    it("should dispatch category translation edit success action", result => {
        expect(result).toEqual(put(categoryActions.editTranslationSuccess()));
    });

    it("should display success snackbar", result => {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "success", text: "Successfully edited translation." }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: edit category translation fail", () => {
    const it = sagaHelper(
        editCategoryTranslationSaga(
            categoryActions.editTranslationRequest({
                categoryId: 1,
                locale: "en",
                name: "string",
                enabled: false,
                cb: {
                    setNameError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should fail to edit category translation", result => {
        expect(result).toEqual(
            call(api.put, `/categories/${1}/translations/${"en"}`, {
                name: "string",
                enabled: false
            })
        );

        return new Error();
    });

    it("should dispatch category translation edit error", result => {
        expect(result).toEqual(put(categoryActions.editTranslationError()));
    });

    it("should display error snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "error", text: "Failed to edit translation." })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
