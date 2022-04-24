import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import { categoryActions } from "../../slice";
import api from "../../../../api";
import { ApiCategory, ApiCategoryTranslation } from "../../../../types/api";
import initCategoryEditPageSaga from "../initCategoryEditPageSaga";
import { uiActions } from "../../../ui/slice";
import initTranslationEditPageSaga from "../initTranslationEditPageSaga";
import mockCategoryTranslation from "../../../../mock/mockCategoryTranslation";

describe("Scenario 1: init category translation edit page successfully", () => {
    const it = sagaHelper(
        initTranslationEditPageSaga(
            categoryActions.initTranslationEditPageRequest({
                categoryId: 1,
                locale: "en",
                cb: {
                    setName: url => {},
                    setEnabled: url => {}
                }
            })
        ) as any
    );

    it("should get translation successfully", result => {
        expect(result).toEqual(call(api.get, `/categories/${1}/translations/en`));

        return {
            data: mockCategoryTranslation
        } as AxiosResponse<ApiCategoryTranslation>;
    });

    it("should dispatch success action", result => {
        expect(result).toEqual(
            put(categoryActions.initTranslationEditPageSuccess({ translation: mockCategoryTranslation }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: fail to init category translation edit page", () => {
    const it = sagaHelper(
        initTranslationEditPageSaga(
            categoryActions.initTranslationEditPageRequest({
                categoryId: 1,
                locale: "en",
                cb: {
                    setName: url => {},
                    setEnabled: url => {}
                }
            })
        ) as any
    );

    it("should fail to get translation", result => {
        expect(result).toEqual(call(api.get, `/categories/${1}/translations/en`));

        return new Error();
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
