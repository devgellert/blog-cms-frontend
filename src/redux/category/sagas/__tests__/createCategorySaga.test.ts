import sagaHelper from "redux-saga-testing";
import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
//
import createCategorySaga from "../createCategorySaga";
import { categoryActions } from "../../slice";
import api from "../../../../api";
import { ApiCategory } from "../../../../types/api";
import { uiActions } from "../../../ui/slice";

describe("Scenario 1: create category successfully", () => {
    const it = sagaHelper(
        createCategorySaga(
            categoryActions.createCategoryRequest({
                slug: "slug",
                parent: null,
                name: "string",
                enabled: false,
                cb: {
                    setNameError: url => {},
                    setParentError: url => {},
                    setSlugError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should create category successfully", result => {
        expect(false).toEqual(true); // TODO remove.
        expect(result).toEqual(
            call(api.post, "/categories", {
                name: "string",
                slug: "slug",
                enabled: false
            })
        );

        return {
            data: {
                id: 1,
                name: "string",
                slug: "slug",
                enabled: false,
                createdAt: "",
                updatedAt: ""
            }
        } as AxiosResponse<ApiCategory>;
    });

    it("should dispatch category create success action", result => {
        expect(result).toEqual(put(categoryActions.createCategorySuccess()));
    });

    it("should display success snackbar", result => {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "success", text: "Successfully created category." }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: create category fail", () => {
    const it = sagaHelper(
        createCategorySaga(
            categoryActions.createCategoryRequest({
                slug: "slug",
                parent: null,
                name: "string",
                enabled: false,
                cb: {
                    setNameError: url => {},
                    setParentError: url => {},
                    setSlugError: url => {},
                    navigate: url => {}
                }
            })
        ) as any
    );

    it("should fail to create category successfully", result => {
        expect(result).toEqual(
            call(api.post, "/categories", {
                name: "string",
                slug: "slug",
                enabled: false
            })
        );

        return new Error();
    });

    it("should dispatch category create error", result => {
        expect(result).toEqual(put(categoryActions.createCategoryError()));
    });

    it("should display error snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "error", text: "Failed to create category." })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
