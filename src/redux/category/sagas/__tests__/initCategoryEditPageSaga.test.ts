import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
//
import { categoryActions } from "../../slice";
import api from "../../../../api";
import { ApiCategory } from "../../../../types/api";
import initCategoryEditPageSaga from "../initCategoryEditPageSaga";
import { uiActions } from "../../../ui/slice";
import mockCategoryOption from "../../../../mock/mockCategoryOption";
import mockCategory from "../../../../mock/mockCategory";

describe("Scenario 1: init category edit page successfully", () => {
    const it = sagaHelper(
        initCategoryEditPageSaga(
            categoryActions.initCategoryEditPageRequest({
                categoryId: 1,
                cb: {
                    setName: url => {},
                    setSlug: url => {},
                    setParent: url => {},
                    setEnabled: url => {}
                }
            })
        ) as any
    );

    it("should get category successfully", result => {
        expect(result).toEqual(call(api.get, `/categories/${1}`));

        return {
            data: mockCategory
        } as AxiosResponse<ApiCategory>;
    });

    it("should get category options successfully", result => {
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
                categoryActions.initCategoryEditPageSuccess({
                    categoryOptions: [
                        { value: 0, text: "-" },
                        { value: 1, text: "name" }
                    ],
                    category: mockCategory
                })
            )
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: fail to init category edit page", () => {
    const it = sagaHelper(
        initCategoryEditPageSaga(
            categoryActions.initCategoryEditPageRequest({
                categoryId: 1,
                cb: {
                    setName: url => {},
                    setSlug: url => {},
                    setParent: url => {},
                    setEnabled: url => {}
                }
            })
        ) as any
    );

    it("should fail to get category", result => {
        expect(result).toEqual(call(api.get, `/categories/${1}`));

        return new Error();
    });

    it("should dispatch error action", result => {
        expect(result).toEqual(put(categoryActions.initCategoryEditPageError()));
    });

    it("should display error snackbar", result => {
        expect(result).toEqual(
            put(
                uiActions.displaySnackbar({
                    type: "error",
                    text: "Something went wrong while initiating this page. Please try again."
                })
            )
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
