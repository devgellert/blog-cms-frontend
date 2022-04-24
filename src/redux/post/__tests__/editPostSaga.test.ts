import sagaHelper from "redux-saga-testing";
import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
//
import editPostSaga from "../sagas/editPostSaga";
import { postActions } from "../slice";
import api from "../../../api";
import { ApiPost } from "../../../types/api";
import { uiActions } from "../../ui/slice";

describe("Scenario 1: edit post successfully", () => {
    const it = sagaHelper(
        editPostSaga(
            postActions.editPostRequest({
                postId: 1,
                slug: "slug",
                enabled: false,
                ogImage: {
                    id: 1,
                    fileName: "file.jpeg"
                },
                author: 1,
                category: 1,
                cb: {
                    setSlugError: url => {},
                    navigate: url => {},
                    setCategoryError: url => {}
                }
            })
        ) as any
    );

    it("should edit post successfully", result => {
        expect(result).toEqual(
            call(api.put, `/posts/${1}`, {
                slug: "slug",
                enabled: false,
                ogImage: 1,
                author: 1,
                category: 1
            })
        );

        return {
            data: {
                id: 1,
                slug: "slug",
                enabled: false,
                createdAt: "",
                updatedAt: "",
                ogImage: {
                    id: 1,
                    fileName: "file.png"
                },
                author: {
                    id: 1,
                    username: "David"
                },
                category: {
                    id: 1,
                    name: "Category"
                }
            }
        } as AxiosResponse<ApiPost>;
    });

    it("should dispatch post edit success action", result => {
        expect(result).toEqual(put(postActions.editPostSuccess()));
    });

    it("should display success snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "success", text: "Successfully edited post." })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: edit post fail", () => {
    const it = sagaHelper(
        editPostSaga(
            postActions.editPostRequest({
                postId: 1,
                slug: "slug",
                enabled: false,
                ogImage: {
                    id: 1,
                    fileName: "file.jpeg"
                },
                author: 1,
                category: 1,
                cb: {
                    setSlugError: url => {},
                    navigate: url => {},
                    setCategoryError: url => {}
                }
            })
        ) as any
    );

    it("should fail to edit post ", result => {
        expect(result).toEqual(
            call(api.put, `/posts/${1}`, {
                slug: "slug",
                enabled: false,
                ogImage: 1,
                author: 1,
                category: 1
            })
        );

        return new Error();
    });

    it("should dispatch post edit error", result => {
        expect(result).toEqual(put(postActions.editPostError()));
    });

    it("should display error snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "error", text: "Failed to edit post." })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
