import sagaHelper from "redux-saga-testing";
import removeCategoryTranslationSaga from "../removeCategoryTranslationSaga";
import { categoryActions } from "../../slice";
import { call, put } from "redux-saga/effects";
import api from "../../../../api";
import initCategoryOptionsSaga from "../initCategoryOptionsSaga";
import mockCategoryOption from "../../../../mock/mockCategoryOption";
import { AxiosResponse } from "axios";
import { ApiCategory } from "../../../../types/api";

describe("Scenario 1: init options successfully", () => {
    const it = sagaHelper(
        initCategoryOptionsSaga(
            categoryActions.initCategoryOptionsRequest({
                flow: "post-create-page"
            })
        ) as any
    );

    it("should call api successfully", function (result) {
        expect(result).toEqual(call(api.get, "/categories?page=1&limit=1000"));

        return {
            data: {
                items: [mockCategoryOption]
            }
        } as AxiosResponse<{ items: ApiCategory[] }>;
    });

    it("should dispatch success action", result => {
        expect(result).toEqual(
            put(
                categoryActions.initCategoryOptionsSuccess({
                    flow: "post-create-page",
                    options: [
                        { value: 0, text: "-" },
                        { value: 1, text: "name" }
                    ]
                })
            )
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: fail to init options", () => {
    const it = sagaHelper(
        initCategoryOptionsSaga(
            categoryActions.initCategoryOptionsRequest({
                flow: "post-create-page"
            })
        ) as any
    );

    it("should fail to call api", function (result) {
        expect(result).toEqual(call(api.get, "/categories?page=1&limit=1000"));

        return new Error();
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
