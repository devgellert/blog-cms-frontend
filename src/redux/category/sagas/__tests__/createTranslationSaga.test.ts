import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import createTranslationSaga from "../createTranslationSaga";
import { categoryActions } from "../../slice";
import api from "../../../../api";
import { ApiCategoryTranslation } from "../../../../types/api";
import { uiActions } from "../../../ui/slice";
import mockCategoryTranslation from "../../../../mock/mockCategoryTranslation";

describe("Scenario 1: create category translation successfully", () => {
    const it = sagaHelper(
        createTranslationSaga(
            categoryActions.createTranslationRequest({
                categoryId: 1,
                locale: "en",
                name: "string",
                enabled: false,
                cb: {
                    setNameError: url => {},
                    setLocaleError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should create category translation successfully", result => {
        expect(result).toEqual(
            call(api.post, `/categories/${1}/translations`, {
                locale: "en",
                name: "string",
                enabled: false
            })
        );

        return {
            data: mockCategoryTranslation
        } as AxiosResponse<ApiCategoryTranslation>;
    });

    it("should dispatch category translation create success action", result => {
        expect(result).toEqual(put(categoryActions.createTranslationSuccess()));
    });

    it("should display success snackbar", result => {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "success", text: "Successfully created translation." }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: create category translation fail", () => {
    const it = sagaHelper(
        createTranslationSaga(
            categoryActions.createTranslationRequest({
                categoryId: 1,
                locale: "en",
                name: "string",
                enabled: false,
                cb: {
                    setNameError: url => {},
                    setLocaleError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should fail to create category translation ", result => {
        expect(result).toEqual(
            call(api.post, `/categories/${1}/translations`, {
                locale: "en",
                name: "string",
                enabled: false
            })
        );

        return new Error();
    });

    it("should dispatch category translation create error", result => {
        expect(result).toEqual(put(categoryActions.createTranslationError()));
    });

    it("should display error snackbar", result => {
        expect(result).toEqual(
            put(
                uiActions.displaySnackbar({
                    type: "error",
                    text: "Failed to create translation."
                })
            )
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
