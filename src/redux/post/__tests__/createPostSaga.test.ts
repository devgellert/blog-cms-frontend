import sagaHelper from "redux-saga-testing";
import { AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
//
import createPostSaga from "../sagas/createPostSaga";
import { postActions } from "../slice";
import api from "../../../api";
import { ApiPost } from "../../../types/api";
import { uiActions } from "../../ui/slice";

describe("Scenario 1: create post successfully", () => {
    const it = sagaHelper(
        createPostSaga(
            postActions.createPostRequest({
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

    it("should create post successfully", result => {
        expect(result).toEqual(
            call(api.post, "/posts", {
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
                ogImage: {
                    id: 1,
                    fileName: "file.jpeg"
                },
                author: {
                    id: 1,
                    username: "David"
                },
                category: {
                    id: 1,
                    name: "Category"
                },
                updatedAt: "",
                createdAt: ""
            }
        } as AxiosResponse<ApiPost>;
    });

    it("should dispatch post create success action", result => {
        expect(result).toEqual(put(postActions.createPostSuccess()));
    });

    it("should display success snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "success", text: "Successfully created post." })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});

describe("Scenario 2: create post fail", () => {
    const it = sagaHelper(
        createPostSaga(
            postActions.createPostRequest({
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

    it("should fail to create post successfully", result => {
        expect(result).toEqual(
            call(api.post, "/posts", {
                slug: "slug",
                enabled: false,
                ogImage: 1,
                author: 1,
                category: 1
            })
        );

        return new Error();
    });

    it("should dispatch post create error", result => {
        expect(result).toEqual(put(postActions.createPostError()));
    });

    it("should display error snackbar", result => {
        expect(result).toEqual(put(uiActions.displaySnackbar({ type: "error", text: "Failed to create post." })));
    });

    it("should terminate", result => {
        expect(result).toBeUndefined();
    });
});
