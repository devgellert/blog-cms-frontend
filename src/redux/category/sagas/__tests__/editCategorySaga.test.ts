import sagaHelper from "redux-saga-testing";
import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
//
import editCategorySaga from "../editCategorySaga";
import { categoryActions } from "../../slice";
import api from "../../../../api";
import { ApiCategory } from "../../../../types/api";
import { uiActions } from "../../../ui/slice";

describe("Scenario 1: edit category successfully", () => {
    const it = sagaHelper(
        editCategorySaga(
            categoryActions.editCategoryRequest({
                categoryId: 1,
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

    it("should edit category successfully", result => {
        expect(result).toEqual(
            call(api.put, `/categories/${1}`, {
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

    it("should dispatch category edit success action", result => {
        expect(result).toEqual(put(categoryActions.editCategorySuccess()));
    });

    it("should display success snackbar", result => {
        expect(result).toEqual(
            put(uiActions.displaySnackbar({ type: "success", text: "Successfully edited category." }))
        );
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: edit category fail", () => {
    const it = sagaHelper(
        editCategorySaga(
            categoryActions.editCategoryRequest({
                categoryId: 1,
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

    it("should fail to edit category successfully", result => {
        expect(result).toEqual(
            call(api.put, `/categories/${1}`, {
                name: "string",
                slug: "slug",
                enabled: false
            })
        );

        return new Error();
    });

    it("should dispatch category edit error", result => {
        expect(result).toEqual(put(categoryActions.editCategoryError()));
    });

    it("should display error snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "error", text: "Failed to edit category." })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
