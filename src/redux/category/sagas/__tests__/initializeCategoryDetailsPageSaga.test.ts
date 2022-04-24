import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import { categoryActions } from "../../slice";
import api from "../../../../api";
import { ApiCategory, ApiCategoryTranslation } from "../../../../types/api";
import initializeCategoryDetailsPageSaga from "../initializeCategoryDetailsPageSaga";
import mockCategory from "../../../../mock/mockCategory";
import mockCategoryTranslation from "../../../../mock/mockCategoryTranslation";

describe("Scenario 1: init details page successfully", () => {
    const it = sagaHelper(
        initializeCategoryDetailsPageSaga(
            categoryActions.initializeCategoryDetailsPage({
                id: 1
            })
        ) as any
    );

    it("should get category successfully", result => {
        expect(result).toEqual(call(api.get, `/categories/${1}`));

        return {
            data: mockCategory
        } as AxiosResponse<ApiCategory>;
    });

    it("should get translations successfully", result => {
        expect(result).toEqual(call(api.get, `/categories/${1}/translations`));

        return {
            data: {
                items: [mockCategoryTranslation]
            }
        } as AxiosResponse<{ items: ApiCategoryTranslation[] }>;
    });

    it("should dispatch success action", result => {
        expect(result).toEqual(
            put(
                categoryActions.initializeCategoryDetailsPageSuccess({
                    category: mockCategory,
                    translations: [mockCategoryTranslation]
                })
            )
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: fail to init details page", () => {
    const it = sagaHelper(
        initializeCategoryDetailsPageSaga(
            categoryActions.initializeCategoryDetailsPage({
                id: 1
            })
        ) as any
    );

    it("should fail to get category", result => {
        expect(result).toEqual(call(api.get, `/categories/${1}`));

        return new Error();
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
